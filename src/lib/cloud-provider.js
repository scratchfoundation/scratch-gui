import log from './log.js';


class CloudProvider {
    constructor (cloudHost, vm, user, projectId) {
        this.vm = vm;
        this.username = user;
        this.projectId = projectId;

        // Open a websocket connection to the clouddata server
        this.openConnection(cloudHost);
    }

    /**
     * Open a new websocket connection to the clouddata server.
     * @param {string} cloudHost The cloud data server to connect to.
     */
    openConnection (cloudHost) {
        if (window.WebSocket === null) {
            log.warn('Websocket support is not available in this browser');
            this.connection = null;
            return;
        }

        this.connection = new WebSocket((location.protocol === 'http:' ? 'ws://' : 'wss://') + cloudHost);

        this.connection.onerror = e => {
            log.error(`Websocket connection error: ${JSON.stringify(e)}`);

            // TODO Add re-connection attempt logic here
        };

        this.connection.onmessage = event => {
            const messageString = event.data;
            log.info(`Received websocket message: ${messageString}`);
            const message = JSON.parse(messageString);
            if (message.method === 'set') {
                const varData = {
                    projectId: this.projectId,
                    varUpdate: {
                        projectId: message.project_id,
                        name: message.name,
                        value: message.value
                    }
                };
                this.vm.postIOData('cloud', varData);
            }
        };

        this.connection.onopen = () => {
            this.writeToServer('handshake');
            log.info(`Successfully connected to clouddata server.`);
        };

        this.connection.onclose = () => {
            log.info(`Closed connection to websocket`);
        };
    }

    /**
     * Format and send a message to the cloud data server.
     * @param {string} methodName The message method, indicating the action to perform.
     * @param {string} dataName The name of the cloud variable this message pertains to
     * @param {string | number} dataValue The value to set the cloud variable to
     * @param {number} dataIndex The index of the item to update (for cloud lists)
     * @param {string} dataNewName The new name for the cloud variable (if renaming)
     */
    writeToServer (methodName, dataName, dataValue, dataIndex, dataNewName) {
        const msg = {};
        msg.method = methodName;
        msg.user = this.username;
        msg.project_id = this.projectId;

        if (dataName) msg.name = dataName;
        if (dataValue) msg.value = dataValue;
        if (dataIndex) msg.index = dataIndex;
        if (dataNewName) msg.new_name = dataNewName;

        const dataToWrite = JSON.stringify(msg);
        this.sendCloudData(dataToWrite);
    }

    /**
     * Send a formatted message to the cloud data server.
     * @param {string} data The formatted message to send.
     */
    sendCloudData (data) {
        this.connection.send(`${data}\n`);
        log.info(`Sent message to clouddata server: ${data}`);
    }

    /**
     * Provides an API for the VM's cloud IO device to update
     * a cloud variable on the server.
     * @param {string} name The name of the variable to update
     * @param {string | number} value The new value for the variable
     */
    updateVariable (name, value) {
        this.writeToServer('set', name, value);
    }

}

export default CloudProvider;

import log from './log.js';
import throttle from 'lodash.throttle';


class CloudProvider {
    /**
     * A cloud data provider which creates and manages a web socket connection
     * to the Scratch cloud data server. This provider is responsible for
     * interfacing with the VM's cloud io device.
     * @param {string} cloudHost The url for the cloud data server
     * @param {VirtualMachine} vm The Scratch virtual machine to interface with
     * @param {string} username The username to associate cloud data updates with
     * @param {string} projectId The id associated with the project containing
     * cloud data.
     */
    constructor (cloudHost, vm, username, projectId) {
        this.vm = vm;
        this.username = username;
        this.projectId = projectId;
        this.cloudHost = cloudHost;

        this.connectionAttempts = 0;

        // A queue of messages to send which were received before the
        // connection was ready
        this.queuedData = [];

        this.openConnection();

        // Send a message to the cloud server at a rate of no more
        // than 10 messages/sec.
        this.sendCloudData = throttle(this._sendCloudData, 100);
    }

    /**
     * Open a new websocket connection to the clouddata server.
     * @param {string} cloudHost The cloud data server to connect to.
     */
    openConnection () {
        this.connectionAttempts += 1;

        try {
            this.connection = new WebSocket((location.protocol === 'http:' ? 'ws://' : 'wss://') + this.cloudHost);
        } catch (e) {
            log.warn('Websocket support is not available in this browser', e);
            this.connection = null;
            return;
        }

        this.connection.onerror = this.onError.bind(this);
        this.connection.onmessage = this.onMessage.bind(this);
        this.connection.onopen = this.onOpen.bind(this);
        this.connection.onclose = this.onClose.bind(this);
    }

    onError (event) {
        log.error(`Websocket connection error: ${JSON.stringify(event)}`);
        // Error is always followed by close, which handles reconnect logic.
    }

    onMessage (event) {
        const messageString = event.data;
        // Multiple commands can be received, newline separated
        messageString.split('\n').forEach(message => {
            if (message) { // .split can also contain '' in the array it returns
                const parsedData = this.parseMessage(JSON.parse(message));
                this.vm.postIOData('cloud', parsedData);
            }
        });
    }

    onOpen () {
        // Reset connection attempts to 1 to make sure any subsequent reconnects
        // use connectionAttempts=1 to calculate timeout
        this.connectionAttempts = 1;
        this.writeToServer('handshake');
        log.info(`Successfully connected to clouddata server.`);

        // Go through the queued data and send off messages that we weren't
        // ready to send before
        this.queuedData.forEach(data => {
            this.sendCloudData(data);
        });
        // Reset the queue
        this.queuedData = [];
    }

    onClose () {
        log.info(`Closed connection to websocket`);
        const randomizedTimeout = this.randomizeDuration(this.exponentialTimeout());
        this.setTimeout(this.openConnection.bind(this), randomizedTimeout);
    }

    exponentialTimeout () {
        return (Math.pow(2, Math.min(this.connectionAttempts, 5)) - 1) * 1000;
    }

    randomizeDuration (t) {
        return Math.random() * t;
    }

    setTimeout (fn, time) {
        log.info(`Reconnecting in ${(time / 1000).toFixed(1)}s, attempt ${this.connectionAttempts}`);
        this._connectionTimeout = window.setTimeout(fn, time);
    }

    parseMessage (message) {
        const varData = {};
        switch (message.method) {
        case 'set': {
            varData.varUpdate = {
                name: message.name,
                value: message.value
            };
            break;
        }
        }
        return varData;
    }

    /**
     * Format and send a message to the cloud data server.
     * @param {string} methodName The message method, indicating the action to perform.
     * @param {string} dataName The name of the cloud variable this message pertains to
     * @param {string | number} dataValue The value to set the cloud variable to
     * @param {string} dataNewName The new name for the cloud variable (if renaming)
     */
    writeToServer (methodName, dataName, dataValue, dataNewName) {
        const msg = {};
        msg.method = methodName;
        msg.user = this.username;
        msg.project_id = this.projectId;

        // Optional string params can use simple falsey undefined check
        if (dataName) msg.name = dataName;
        if (dataNewName) msg.new_name = dataNewName;

        // Optional number params need different undefined check
        if (typeof dataValue !== 'undefined' && dataValue !== null) msg.value = dataValue;

        const dataToWrite = JSON.stringify(msg);
        if (this.connection && this.connection.readyState === WebSocket.OPEN) {
            this.sendCloudData(dataToWrite);
        } else if (msg.method === 'create' || msg.method === 'delete' || msg.method === 'rename') {
            // Save data for sending when connection is open, iff the data
            // is a create, rename, or  delete
            this.queuedData.push(dataToWrite);
        }

    }

    /**
     * Send a formatted message to the cloud data server.
     * @param {string} data The formatted message to send.
     */
    _sendCloudData (data) {
        this.connection.send(`${data}\n`);
    }

    /**
     * Provides an API for the VM's cloud IO device to create
     * a new cloud variable on the server.
     * @param {string} name The name of the variable to create
     * @param {string | number} value The value of the new cloud variable.
     */
    createVariable (name, value) {
        this.writeToServer('create', name, value);
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

    /**
     * Provides an API for the VM's cloud IO device to rename
     * a cloud variable on the server.
     * @param {string} oldName The old name of the variable to rename
     * @param {string} newName The new name for the cloud variable.
     */
    renameVariable (oldName, newName) {
        this.writeToServer('rename', oldName, null, newName);
    }

    /**
     * Provides an API for the VM's cloud IO device to delete
     * a cloud variable on the server.
     * @param {string} name The name of the variable to delete
     */
    deleteVariable (name) {
        this.writeToServer('delete', name);
    }

    /**
     * Closes the connection to the web socket and clears the cloud
     * provider of references related to the cloud data project.
     */
    requestCloseConnection () {
        if (this.connection &&
            this.connection.readyState !== WebSocket.CLOSING &&
            this.connection.readyState !== WebSocket.CLOSED) {
            log.info('Request close cloud connection without reconnecting');
            // Remove listeners, after this point we do not want to react to connection updates
            this.connection.onclose = () => {};
            this.connection.onerror = () => {};
            this.connection.close();
        }
        this.clear();
    }

    /**
     * Clear this provider of references related to the project
     * and current state.
     */
    clear () {
        this.connection = null;
        this.vm = null;
        this.username = null;
        this.projectId = null;
        if (this._connectionTimeout) {
            clearTimeout(this._connectionTimeout);
            this._connectionTimeout = null;
        }
        this.connectionAttempts = 0;
    }

}

export default CloudProvider;

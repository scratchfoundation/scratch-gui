import xhr from 'xhr';

import log from './log';
import emptyProject from './empty-project.json';

class ProjectLoader {
    constructor () {
        this.DEFAULT_PROJECT_DATA = ProjectLoader.DEFAULT_PROJECT_DATA;
    }
    load (id, callback) {
        callback = callback || (err => log.error(err));
        xhr({
            uri: `https://projects.scratch.mit.edu/internalapi/project/${id}/get/`
        }, (err, res, body) => {
            if (err) return callback(err);
            callback(null, body);
        });
    }
}

ProjectLoader.DEFAULT_PROJECT_DATA = emptyProject;

export default new ProjectLoader();

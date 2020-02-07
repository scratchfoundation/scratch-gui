import queryString from 'query-string';
import xhr from 'xhr';
import storage from '../lib/storage';

/**
 * Save a project JSON to the project server.
 * This should eventually live in scratch-www.
 * 将项目 JSON 保存到服务器。
 * 这最终将存在于 scratch-www 中。
 * @param {number} projectId the ID of the project, null if a new project.   项目的ID，如果是新项目则为空
 * @param {object} vmState the JSON project representation.
 * @param {object} params the request params.
 * @property {?number} params.originalId the original project ID if a copy/remix.    原始projectID（copy/remix）
 * @property {?boolean} params.isCopy a flag indicating if this save is creating a copy.    是否在创建副本
 * @property {?boolean} params.isRemix a flag indicating if this save is creating a remix.    是否是 remix
 * @property {?string} params.title the title of the project.    项目的标题
 * @return {Promise} A promise that resolves when the network request resolves.  返回一个请求的 Promise
 */
export default function (projectId, vmState, params) {
    const opts = {
        body: vmState,
        // If we set json:true then the body is double-stringified, so don't
        // 不要设置 json:true，否则 body 会格式化两次。
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    };
    const creatingProject = projectId === null || typeof projectId === 'undefined';
    const queryParams = {};
    if (params.hasOwnProperty('originalId')) queryParams.original_id = params.originalId;
    if (params.hasOwnProperty('isCopy')) queryParams.is_copy = params.isCopy;
    if (params.hasOwnProperty('isRemix')) queryParams.is_remix = params.isRemix;
    if (params.hasOwnProperty('title')) queryParams.title = params.title;
    let qs = queryString.stringify(queryParams);
    if (qs) qs = `?${qs}`;
    if (creatingProject) {
        Object.assign(opts, {
            method: 'post',
            url: `${storage.projectHost}/${qs}`
        });
    } else {
        Object.assign(opts, {
            method: 'put',
            url: `${storage.projectHost}/${projectId}${qs}`
        });
    }
    return new Promise((resolve, reject) => {
        xhr(opts, (err, response) => {
            if (err) return reject(err);
            if (response.statusCode !== 200) return reject(response.statusCode);
            let body;
            try {
                // Since we didn't set json: true, we have to parse manually
                // 因为没有设置 json:true，所以需要手动解析
                body = JSON.parse(response.body);
            } catch (e) {
                return reject(e);
            }
            body.id = projectId;
            if (creatingProject) {
                body.id = body['content-name'];
            }
            resolve(body);
        });
    });
}

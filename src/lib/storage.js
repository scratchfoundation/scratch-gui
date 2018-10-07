import ScratchStorage from 'scratch-storage';

import defaultProject from './default-project';

/**
 * Wrapper for ScratchStorage which adds default web sources.
 * @todo make this more configurable
 */
class Storage extends ScratchStorage {
    constructor () {
        super();
        this.cacheDefaultProject();
        this.addWebStore(
            [this.AssetType.Project],
            this.getProjectGetConfig.bind(this),
            this.getProjectCreateConfig.bind(this),
            this.getProjectUpdateConfig.bind(this)
        );
        this.addWebStore(
            [this.AssetType.ImageVector, this.AssetType.ImageBitmap, this.AssetType.Sound],
            this.getAssetGetConfig.bind(this)
        );
        this.addWebStore(
            [this.AssetType.Sound],
            asset => `static/extension-assets/scratch3_music/${asset.assetId}.${asset.dataFormat}`
        );
    }
    setProjectHost (projectHost) {
        this.projectHost = projectHost;
    }
    getProjectGetConfig (projectAsset) {
        return `${this.projectHost}/internalapi/project/${projectAsset.assetId}/get/`;
    }
    getProjectCreateConfig () {
        return {
            url: `${this.projectHost}/`,
            // NOTE: using json: true here unexpectedly breaks saving
            // json: true,
            withCredentials: true
        };
    }
    getProjectUpdateConfig (projectAsset) {
        return {
            url: `${this.projectHost}/${projectAsset.assetId}`,
            // NOTE: using json: true here unexpectedly breaks saving
            // json: true,
            withCredentials: true
        };
    }
    setAssetHost (assetHost) {
        this.assetHost = assetHost;
    }
    getAssetGetConfig (asset) {
        return `${this.assetHost}/internalapi/asset/${asset.assetId}.${asset.dataFormat}/get/`;
    }
    setTranslatorFunction (translator) {
        this.translator = translator;
        this.cacheDefaultProject();
    }
    cacheDefaultProject () {
        const defaultProjectAssets = defaultProject(this.translator);
        defaultProjectAssets.forEach(asset => this.cache(
            this.AssetType[asset.assetType],
            this.DataFormat[asset.dataFormat],
            asset.data,
            asset.id
        ));
    }
}

const storage = new Storage();

export default storage;




// ===good===
// IncomingMessage {_readableState: ReadableState, readable: true, domain: null, _events: {…}, _eventsCount: 5, …}
// auth:
// cookie: "_ga=GA1.1.696823194.1531177281; __utmc=111872281; __utmz=111872281.1531504515.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); gsScrollPos-10179=; gsScrollPos-2817=; scratchlanguage=en; gsScrollPos-1635031678=0; scratchsessionsid=".eJxVj09PhDAQxb9Lz7vI0JbC3vSkF42bGN0Tmf4BKtBuoEii8bvbGi6bTJrJe_Omv_kh62Jmh5MhJyLnDYr_hxxIg2vom-Q2VkcTuMiZqOtoBbME5f1gU2jz82D0bUCiGoxLqaQZF6zCYL3LdmPJzuY67uLDPhz3-tgkDuCFLoGWHJBR0FJwzTi0DAFbqejpqMq-hk1NT-uiX-szfXnnX48fTbi8xTWj76w72muCFkUGVZZnkABHdN2KXaKO_xyI_oyCb4KdzLd3Sb6fzByx7p7N1lziYbdn9bj0cUjlhZAt1QVvlZFKY8U0MKRIa1MxziWNVYIgv3_9K3Di:1g4qyD:THRZJ-mFgkO-KtGMzS-sP3KX5JA"; scratchcsrftoken=NjVKLOxdSPWCrBZDaPf89oyNWwKvEoes; permissions=%7B%22admin%22%3Afalse%2C%22social%22%3Atrue%2C%22educator%22%3Afalse%2C%22educator_invitee%22%3Afalse%2C%22student%22%3Afalse%7D; __utma=111872281.696823194.1531177281.1537845990.1537895890.36; gsScrollPos-1635032454=; gsScrollPos-1635031685=; _gid=GA1.1.55047185.1538366069"
// scratchcsrftoken: "NjVKLOxdSPWCrBZDaPf89oyNWwKvEoes"
// __proto__: Object
// body:
// __proto__: Object
// client: Socket
// allowHalfOpen: true
// bytesRead: (...)
// bytesWritten: (...)
// connecting: false
// domain: null
// localAddress: (...)
// localPort: (...)
// on: ƒ socketOnWrap(ev, fn)
// parser: HTTPParser {0: ƒ, 1: ƒ, 2: ƒ, 3: ƒ, 4: ƒ, _headers: Array(0), _url: "", _consumed: true, socket: Socket, incoming: IncomingMessage, …}
// readable: true
// remoteAddress: (...)
// remoteFamily: (...)
// remotePort: (...)
// server: Server {domain: null, _events: {…}, _eventsCount: 9, _maxListeners: undefined, _connections: 2, …}
// writable: true
// Symbol(asyncId): 5525
// Symbol(asyncId): 5526
// Symbol(bytesRead): 0
// Symbol(triggerAsyncId): 5525
// _bytesDispatched: 0
// _destroyed: false
// _events: {end: Array(2), finish: ƒ, _socketEnd: ƒ, drain: Array(2), timeout: ƒ, …}
// _eventsCount: 10
// _hadError: false
// _handle: TCP {reading: true, owner: Socket, onread: ƒ, onconnection: null, writeQueueSize: 0, …}
// _host: null
// _httpMessage: ServerResponse {domain: null, _events: {…}, _eventsCount: 2, _maxListeners: undefined, output: Array(0), …}
// _idleNext: TimersList {_idleNext: Socket, _idlePrev: Socket, _timer: Timer, _unrefed: true, msecs: 120000, …}
// _idlePrev: TimersList {_idleNext: Socket, _idlePrev: Socket, _timer: Timer, _unrefed: true, msecs: 120000, …}
// _idleStart: 21353611
// _idleTimeout: 120000
// _maxListeners: undefined
// _parent: null
// _paused: false
// _peername: {address: "::ffff:172.19.0.1", family: "IPv6", port: 59242}
// _pendingData: null
// _pendingEncoding: ""
// _readableState: ReadableState {objectMode: false, highWaterMark: 16384, buffer: BufferList, length: 0, pipes: null, …}
// _server: Server {domain: null, _events: {…}, _eventsCount: 9, _maxListeners: undefined, _connections: 2, …}
// _sockname: null
// _writableState: WritableState {objectMode: false, highWaterMark: 16384, finalCalled: false, needDrain: false, ending: false, …}
// bufferSize: (...)
// destroyed: (...)
// readableHighWaterMark: (...)
// readyState: (...)
// writableHighWaterMark: (...)
// _connecting: (...)
// __proto__: Duplex
// complete: true
// connection: Socket
// allowHalfOpen: true
// bytesRead: (...)
// bytesWritten: (...)
// connecting: false
// domain: null
// localAddress: (...)
// localPort: (...)
// on: ƒ socketOnWrap(ev, fn)
// parser: HTTPParser {0: ƒ, 1: ƒ, 2: ƒ, 3: ƒ, 4: ƒ, _headers: Array(0), _url: "", _consumed: true, socket: Socket, incoming: IncomingMessage, …}
// readable: true
// remoteAddress: (...)
// remoteFamily: (...)
// remotePort: (...)
// server: Server {domain: null, _events: {…}, _eventsCount: 9, _maxListeners: undefined, _connections: 2, …}
// writable: true
// Symbol(asyncId): 5525
// Symbol(asyncId): 5526
// Symbol(bytesRead): 0
// Symbol(triggerAsyncId): 5525
// _bytesDispatched: 0
// _destroyed: false
// _events: {end: Array(2), finish: ƒ, _socketEnd: ƒ, drain: Array(2), timeout: ƒ, …}
// _eventsCount: 10
// _hadError: false
// _handle: TCP {reading: true, owner: Socket, onread: ƒ, onconnection: null, writeQueueSize: 0, …}
// _host: null
// _httpMessage: ServerResponse {domain: null, _events: {…}, _eventsCount: 2, _maxListeners: undefined, output: Array(0), …}
// _idleNext: TimersList {_idleNext: Socket, _idlePrev: Socket, _timer: Timer, _unrefed: true, msecs: 120000, …}
// _idlePrev: TimersList {_idleNext: Socket, _idlePrev: Socket, _timer: Timer, _unrefed: true, msecs: 120000, …}
// _idleStart: 21353611
// _idleTimeout: 120000
// _maxListeners: undefined
// _parent: null
// _paused: false
// _peername: {address: "::ffff:172.19.0.1", family: "IPv6", port: 59242}
// _pendingData: null
// _pendingEncoding: ""
// _readableState: ReadableState {objectMode: false, highWaterMark: 16384, buffer: BufferList, length: 0, pipes: null, …}
// _server: Server {domain: null, _events: {…}, _eventsCount: 9, _maxListeners: undefined, _connections: 2, …}
// _sockname: null
// _writableState: WritableState {objectMode: false, highWaterMark: 16384, finalCalled: false, needDrain: false, ending: false, …}
// bufferSize: (...)
// destroyed: (...)
// readableHighWaterMark: (...)
// readyState: (...)
// writableHighWaterMark: (...)
// _connecting: (...)
// __proto__: Duplex
// context:
// id: "2000000008"
// __proto__: Object
// cookies:
// gsScrollPos-2817: ""
// gsScrollPos-10179: ""
// gsScrollPos-1635031678: "0"
// gsScrollPos-1635031685: ""
// gsScrollPos-1635032454: ""
// permissions: "{"admin":false,"social":true,"educator":false,"educator_invitee":false,"student":false}"
// scratchcsrftoken: "NjVKLOxdSPWCrBZDaPf89oyNWwKvEoes"
// scratchlanguage: "en"
// scratchsessionsid: ".eJxVj09PhDAQxb9Lz7vI0JbC3vSkF42bGN0Tmf4BKtBuoEii8bvbGi6bTJrJe_Omv_kh62Jmh5MhJyLnDYr_hxxIg2vom-Q2VkcTuMiZqOtoBbME5f1gU2jz82D0bUCiGoxLqaQZF6zCYL3LdmPJzuY67uLDPhz3-tgkDuCFLoGWHJBR0FJwzTi0DAFbqejpqMq-hk1NT-uiX-szfXnnX48fTbi8xTWj76w72muCFkUGVZZnkABHdN2KXaKO_xyI_oyCb4KdzLd3Sb6fzByx7p7N1lziYbdn9bj0cUjlhZAt1QVvlZFKY8U0MKRIa1MxziWNVYIgv3_9K3Di:1g4qyD:THRZJ-mFgkO-KtGMzS-sP3KX5JA"
// __utma: "111872281.696823194.1531177281.1537845990.1537895890.36"
// __utmc: "111872281"
// __utmz: "111872281.1531504515.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)"
// _ga: "GA1.1.696823194.1531177281"
// _gid: "GA1.1.55047185.1538366069"
// __proto__: Object
// domain: null
// files:
// sb3_file: File {domain: null, _events: {…}, _eventsCount: 0, _maxListeners: undefined, size: 42823, …}
// __proto__: Object
// headers:
// accept: "*/*"
// accept-encoding: "gzip, deflate, br"
// accept-language: "en-US,en;q=0.9"
// connection: "keep-alive"
// content-length: "43014"
// content-type: "multipart/form-data; boundary=----WebKitFormBoundary6Ce60BrLnBVSYaaA"
// cookie: "_ga=GA1.1.696823194.1531177281; __utmc=111872281; __utmz=111872281.1531504515.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); gsScrollPos-10179=; gsScrollPos-2817=; scratchlanguage=en; gsScrollPos-1635031678=0; scratchsessionsid=".eJxVj09PhDAQxb9Lz7vI0JbC3vSkF42bGN0Tmf4BKtBuoEii8bvbGi6bTJrJe_Omv_kh62Jmh5MhJyLnDYr_hxxIg2vom-Q2VkcTuMiZqOtoBbME5f1gU2jz82D0bUCiGoxLqaQZF6zCYL3LdmPJzuY67uLDPhz3-tgkDuCFLoGWHJBR0FJwzTi0DAFbqejpqMq-hk1NT-uiX-szfXnnX48fTbi8xTWj76w72muCFkUGVZZnkABHdN2KXaKO_xyI_oyCb4KdzLd3Sb6fzByx7p7N1lziYbdn9bj0cUjlhZAt1QVvlZFKY8U0MKRIa1MxziWNVYIgv3_9K3Di:1g4qyD:THRZJ-mFgkO-KtGMzS-sP3KX5JA"; scratchcsrftoken=NjVKLOxdSPWCrBZDaPf89oyNWwKvEoes; permissions=%7B%22admin%22%3Afalse%2C%22social%22%3Atrue%2C%22educator%22%3Afalse%2C%22educator_invitee%22%3Afalse%2C%22student%22%3Afalse%7D; __utma=111872281.696823194.1531177281.1537845990.1537895890.36; gsScrollPos-1635032454=; gsScrollPos-1635031685=; _gid=GA1.1.55047185.1538366069"
// host: "localhost:8444"
// origin: "http://localhost:8333"
// referer: "http://localhost:8333/preview/2000000008/editor/"
// user-agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
// __proto__: Object
// httpVersion: "1.1"
// httpVersionMajor: 1
// httpVersionMinor: 1
// log: Logger {domain: null, _events: {…}, _eventsCount: 0, _maxListeners: undefined, _level: 30, …}
// method: "PUT"
// params:
// id: "2000000008"
// __proto__: Object
// query:
// __proto__: Object
// rawBody: undefined
// rawHeaders: Array(22)
// 0: "Host"
// 1: "localhost:8444"
// 2: "Connection"
// 3: "keep-alive"
// 4: "Content-Length"
// 5: "43014"
// 6: "Origin"
// 7: "http://localhost:8333"
// 8: "User-Agent"
// 9: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
// 10: "Content-Type"
// 11: "multipart/form-data; boundary=----WebKitFormBoundary6Ce60BrLnBVSYaaA"
// 12: "Accept"
// 13: "*/*"
// 14: "Referer"
// 15: "http://localhost:8333/preview/2000000008/editor/"
// 16: "Accept-Encoding"
// 17: "gzip, deflate, br"
// 18: "Accept-Language"
// 19: "en-US,en;q=0.9"
// 20: "Cookie"
// 21: "_ga=GA1.1.696823194.1531177281; __utmc=111872281; __utmz=111872281.1531504515.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); gsScrollPos-10179=; gsScrollPos-2817=; scratchlanguage=en; gsScrollPos-1635031678=0; scratchsessionsid=".eJxVj09PhDAQxb9Lz7vI0JbC3vSkF42bGN0Tmf4BKtBuoEii8bvbGi6bTJrJe_Omv_kh62Jmh5MhJyLnDYr_hxxIg2vom-Q2VkcTuMiZqOtoBbME5f1gU2jz82D0bUCiGoxLqaQZF6zCYL3LdmPJzuY67uLDPhz3-tgkDuCFLoGWHJBR0FJwzTi0DAFbqejpqMq-hk1NT-uiX-szfXnnX48fTbi8xTWj76w72muCFkUGVZZnkABHdN2KXaKO_xyI_oyCb4KdzLd3Sb6fzByx7p7N1lziYbdn9bj0cUjlhZAt1QVvlZFKY8U0MKRIa1MxziWNVYIgv3_9K3Di:1g4qyD:THRZJ-mFgkO-KtGMzS-sP3KX5JA"; scratchcsrftoken=NjVKLOxdSPWCrBZDaPf89oyNWwKvEoes; permissions=%7B%22admin%22%3Afalse%2C%22social%22%3Atrue%2C%22educator%22%3Afalse%2C%22educator_invitee%22%3Afalse%2C%22student%22%3Afalse%7D; __utma=111872281.696823194.1531177281.1537845990.1537895890.36; gsScrollPos-1635032454=; gsScrollPos-1635031685=; _gid=GA1.1.55047185.1538366069"
// length: 22
// __proto__: Array(0)
// rawTrailers: []
// read: ƒ (n)
// readable: true
// route:
// method: "PUT"
// name: "putid"
// path: "/:id"
// versions: []
// __proto__: Object
// serverName: "restify"
// socket: Socket {connecting: false, _hadError: false, _handle: TCP, _parent: null, _host: null, …}
// statusCode: null
// statusMessage: null
// timers: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// trailers: {}
// upgrade: false
// url: "/2000000008"
// _anonFuncCount: 5
// _body: undefined
// _cacheURL: "/2000000008"
// _clen: 43014
// _consuming: true
// _contentType: "multipart/form-data"
// _currentHandler: "handler-4"
// _currentRoute: "putid"
// _dtraceId: 231
// _dumped: false
// _events:
// aborted: (3) [ƒ, ƒ, ƒ]
// close: (2) [ƒ, ƒ]
// data: ƒ (buffer)
// end: ƒ ()
// error: ƒ (err)
// _eventsCount: 5
// _maxListeners: undefined
// _parsedBody: true
// _readBody: true
// _readableState: ReadableState {objectMode: false, highWaterMark: 16384, buffer: BufferList, length: 0, pipes: null, …}
// _time: (2) [138053, 50816556]
// _timerMap: {_sanitizePath: Array(2), handler-0: Array(2), handler-1: Array(2), parseCookies: Array(2), readBody: Array(2), …}
// _url: Url
// auth: null
// hash: null
// host: null
// hostname: null
// href: "/2000000008"
// path: "/2000000008"
// pathname: "/2000000008"
// port: null
// protocol: null
// query: null
// search: null
// slashes: null
// __proto__: Object
// _version: "*"
// destroyed: (...)
// readableHighWaterMark: (...)
// __proto__: Readable
//
//
// ===bad===
// IncomingMessage {_readableState: ReadableState, readable: false, domain: null, _events: {…}, _eventsCount: 4, …}
// auth:
// cookie: "_ga=GA1.1.696823194.1531177281; __utmc=111872281; __utmz=111872281.1531504515.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); gsScrollPos-10179=; gsScrollPos-2817=; scratchlanguage=en; gsScrollPos-1635031678=0; scratchsessionsid=".eJxVj09PhDAQxb9Lz7vI0JbC3vSkF42bGN0Tmf4BKtBuoEii8bvbGi6bTJrJe_Omv_kh62Jmh5MhJyLnDYr_hxxIg2vom-Q2VkcTuMiZqOtoBbME5f1gU2jz82D0bUCiGoxLqaQZF6zCYL3LdmPJzuY67uLDPhz3-tgkDuCFLoGWHJBR0FJwzTi0DAFbqejpqMq-hk1NT-uiX-szfXnnX48fTbi8xTWj76w72muCFkUGVZZnkABHdN2KXaKO_xyI_oyCb4KdzLd3Sb6fzByx7p7N1lziYbdn9bj0cUjlhZAt1QVvlZFKY8U0MKRIa1MxziWNVYIgv3_9K3Di:1g4qyD:THRZJ-mFgkO-KtGMzS-sP3KX5JA"; scratchcsrftoken=NjVKLOxdSPWCrBZDaPf89oyNWwKvEoes; permissions=%7B%22admin%22%3Afalse%2C%22social%22%3Atrue%2C%22educator%22%3Afalse%2C%22educator_invitee%22%3Afalse%2C%22student%22%3Afalse%7D; __utma=111872281.696823194.1531177281.1537845990.1537895890.36; gsScrollPos-1635032454=; gsScrollPos-1635031685=; _gid=GA1.1.55047185.1538366069"
// scratchcsrftoken: "NjVKLOxdSPWCrBZDaPf89oyNWwKvEoes"
// __proto__: Object
// body:
// __proto__: Object
// client: Socket
// allowHalfOpen: true
// bytesRead: (...)
// bytesWritten: (...)
// connecting: false
// domain: null
// localAddress: (...)
// localPort: (...)
// on: ƒ socketOnWrap(ev, fn)
// parser: HTTPParser {0: ƒ, 1: ƒ, 2: ƒ, 3: ƒ, 4: ƒ, _headers: Array(0), _url: "", _consumed: true, socket: Socket, incoming: IncomingMessage, …}
// readable: true
// remoteAddress: (...)
// remoteFamily: (...)
// remotePort: (...)
// server: Server {domain: null, _events: {…}, _eventsCount: 9, _maxListeners: undefined, _connections: 2, …}
// writable: true
// Symbol(asyncId): 5829
// Symbol(asyncId): 5830
// Symbol(bytesRead): 0
// Symbol(triggerAsyncId): 5829
// _bytesDispatched: 0
// _destroyed: false
// _events: {end: Array(2), finish: ƒ, _socketEnd: ƒ, drain: Array(2), timeout: ƒ, …}
// _eventsCount: 10
// _hadError: false
// _handle: TCP {reading: true, owner: Socket, onread: ƒ, onconnection: null, writeQueueSize: 0, …}
// _host: null
// _httpMessage: ServerResponse {domain: null, _events: {…}, _eventsCount: 2, _maxListeners: undefined, output: Array(0), …}
// _idleNext: TimersList {_idleNext: Socket, _idlePrev: Socket, _timer: Timer, _unrefed: true, msecs: 120000, …}
// _idlePrev: TimersList {_idleNext: Socket, _idlePrev: Socket, _timer: Timer, _unrefed: true, msecs: 120000, …}
// _idleStart: 21726357
// _idleTimeout: 120000
// _maxListeners: undefined
// _parent: null
// _paused: false
// _peername: {address: "::ffff:172.19.0.1", family: "IPv6", port: 37098}
// _pendingData: null
// _pendingEncoding: ""
// _readableState: ReadableState {objectMode: false, highWaterMark: 16384, buffer: BufferList, length: 0, pipes: null, …}
// _server: Server {domain: null, _events: {…}, _eventsCount: 9, _maxListeners: undefined, _connections: 2, …}
// _sockname: null
// _writableState: WritableState {objectMode: false, highWaterMark: 16384, finalCalled: false, needDrain: false, ending: false, …}
// bufferSize: (...)
// destroyed: (...)
// readableHighWaterMark: (...)
// readyState: (...)
// writableHighWaterMark: (...)
// _connecting: (...)
// __proto__: Duplex
// complete: true
// connection: Socket
// allowHalfOpen: true
// bytesRead: (...)
// bytesWritten: (...)
// connecting: false
// domain: null
// localAddress: (...)
// localPort: (...)
// on: ƒ socketOnWrap(ev, fn)
// parser: HTTPParser {0: ƒ, 1: ƒ, 2: ƒ, 3: ƒ, 4: ƒ, _headers: Array(0), _url: "", _consumed: true, socket: Socket, incoming: IncomingMessage, …}
// readable: true
// remoteAddress: (...)
// remoteFamily: (...)
// remotePort: (...)
// server: Server {domain: null, _events: {…}, _eventsCount: 9, _maxListeners: undefined, _connections: 2, …}
// writable: true
// Symbol(asyncId): 5829
// Symbol(asyncId): 5830
// Symbol(bytesRead): 0
// Symbol(triggerAsyncId): 5829
// _bytesDispatched: 0
// _destroyed: false
// _events: {end: Array(2), finish: ƒ, _socketEnd: ƒ, drain: Array(2), timeout: ƒ, …}
// _eventsCount: 10
// _hadError: false
// _handle: TCP {reading: true, owner: Socket, onread: ƒ, onconnection: null, writeQueueSize: 0, …}
// _host: null
// _httpMessage: ServerResponse {domain: null, _events: {…}, _eventsCount: 2, _maxListeners: undefined, output: Array(0), …}
// _idleNext: TimersList {_idleNext: Socket, _idlePrev: Socket, _timer: Timer, _unrefed: true, msecs: 120000, …}
// _idlePrev: TimersList {_idleNext: Socket, _idlePrev: Socket, _timer: Timer, _unrefed: true, msecs: 120000, …}
// _idleStart: 21726357
// _idleTimeout: 120000
// _maxListeners: undefined
// _parent: null
// _paused: false
// _peername: {address: "::ffff:172.19.0.1", family: "IPv6", port: 37098}
// _pendingData: null
// _pendingEncoding: ""
// _readableState: ReadableState {objectMode: false, highWaterMark: 16384, buffer: BufferList, length: 0, pipes: null, …}
// _server: Server {domain: null, _events: {…}, _eventsCount: 9, _maxListeners: undefined, _connections: 2, …}
// _sockname: null
// _writableState: WritableState {objectMode: false, highWaterMark: 16384, finalCalled: false, needDrain: false, ending: false, …}
// bufferSize: (...)
// destroyed: (...)
// readableHighWaterMark: (...)
// readyState: (...)
// writableHighWaterMark: (...)
// _connecting: (...)
// __proto__: Duplex
// context:
// id: "2000000008"
// __proto__: Object
// cookies:
// gsScrollPos-2817: ""
// gsScrollPos-10179: ""
// gsScrollPos-1635031678: "0"
// gsScrollPos-1635031685: ""
// gsScrollPos-1635032454: ""
// permissions: "{"admin":false,"social":true,"educator":false,"educator_invitee":false,"student":false}"
// scratchcsrftoken: "NjVKLOxdSPWCrBZDaPf89oyNWwKvEoes"
// scratchlanguage: "en"
// scratchsessionsid: ".eJxVj09PhDAQxb9Lz7vI0JbC3vSkF42bGN0Tmf4BKtBuoEii8bvbGi6bTJrJe_Omv_kh62Jmh5MhJyLnDYr_hxxIg2vom-Q2VkcTuMiZqOtoBbME5f1gU2jz82D0bUCiGoxLqaQZF6zCYL3LdmPJzuY67uLDPhz3-tgkDuCFLoGWHJBR0FJwzTi0DAFbqejpqMq-hk1NT-uiX-szfXnnX48fTbi8xTWj76w72muCFkUGVZZnkABHdN2KXaKO_xyI_oyCb4KdzLd3Sb6fzByx7p7N1lziYbdn9bj0cUjlhZAt1QVvlZFKY8U0MKRIa1MxziWNVYIgv3_9K3Di:1g4qyD:THRZJ-mFgkO-KtGMzS-sP3KX5JA"
// __utma: "111872281.696823194.1531177281.1537845990.1537895890.36"
// __utmc: "111872281"
// __utmz: "111872281.1531504515.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)"
// _ga: "GA1.1.696823194.1531177281"
// _gid: "GA1.1.55047185.1538366069"
// __proto__: Object
// domain: null
// headers:
// accept: "application/json"
// accept-encoding: "gzip, deflate, br"
// accept-language: "en-US,en;q=0.9"
// connection: "keep-alive"
// content-length: "2"
// content-type: "application/json"
// cookie: "_ga=GA1.1.696823194.1531177281; __utmc=111872281; __utmz=111872281.1531504515.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); gsScrollPos-10179=; gsScrollPos-2817=; scratchlanguage=en; gsScrollPos-1635031678=0; scratchsessionsid=".eJxVj09PhDAQxb9Lz7vI0JbC3vSkF42bGN0Tmf4BKtBuoEii8bvbGi6bTJrJe_Omv_kh62Jmh5MhJyLnDYr_hxxIg2vom-Q2VkcTuMiZqOtoBbME5f1gU2jz82D0bUCiGoxLqaQZF6zCYL3LdmPJzuY67uLDPhz3-tgkDuCFLoGWHJBR0FJwzTi0DAFbqejpqMq-hk1NT-uiX-szfXnnX48fTbi8xTWj76w72muCFkUGVZZnkABHdN2KXaKO_xyI_oyCb4KdzLd3Sb6fzByx7p7N1lziYbdn9bj0cUjlhZAt1QVvlZFKY8U0MKRIa1MxziWNVYIgv3_9K3Di:1g4qyD:THRZJ-mFgkO-KtGMzS-sP3KX5JA"; scratchcsrftoken=NjVKLOxdSPWCrBZDaPf89oyNWwKvEoes; permissions=%7B%22admin%22%3Afalse%2C%22social%22%3Atrue%2C%22educator%22%3Afalse%2C%22educator_invitee%22%3Afalse%2C%22student%22%3Afalse%7D; __utma=111872281.696823194.1531177281.1537845990.1537895890.36; gsScrollPos-1635032454=; gsScrollPos-1635031685=; _gid=GA1.1.55047185.1538366069"
// host: "localhost:8444"
// origin: "http://localhost:8333"
// referer: "http://localhost:8333/preview/2000000008/editor/"
// user-agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
// __proto__: Object
// httpVersion: "1.1"
// httpVersionMajor: 1
// httpVersionMinor: 1
// log: Logger {domain: null, _events: {…}, _eventsCount: 0, _maxListeners: undefined, _level: 30, …}
// method: "PUT"
// params:
// id: "2000000008"
// __proto__: Object
// query:
// __proto__: Object
// rawBody: "{}"
// rawHeaders: Array(22)
// 0: "Host"
// 1: "localhost:8444"
// 2: "Connection"
// 3: "keep-alive"
// 4: "Content-Length"
// 5: "2"
// 6: "Accept"
// 7: "application/json"
// 8: "Origin"
// 9: "http://localhost:8333"
// 10: "User-Agent"
// 11: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
// 12: "Content-Type"
// 13: "application/json"
// 14: "Referer"
// 15: "http://localhost:8333/preview/2000000008/editor/"
// 16: "Accept-Encoding"
// 17: "gzip, deflate, br"
// 18: "Accept-Language"
// 19: "en-US,en;q=0.9"
// 20: "Cookie"
// 21: "_ga=GA1.1.696823194.1531177281; __utmc=111872281; __utmz=111872281.1531504515.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); gsScrollPos-10179=; gsScrollPos-2817=; scratchlanguage=en; gsScrollPos-1635031678=0; scratchsessionsid=".eJxVj09PhDAQxb9Lz7vI0JbC3vSkF42bGN0Tmf4BKtBuoEii8bvbGi6bTJrJe_Omv_kh62Jmh5MhJyLnDYr_hxxIg2vom-Q2VkcTuMiZqOtoBbME5f1gU2jz82D0bUCiGoxLqaQZF6zCYL3LdmPJzuY67uLDPhz3-tgkDuCFLoGWHJBR0FJwzTi0DAFbqejpqMq-hk1NT-uiX-szfXnnX48fTbi8xTWj76w72muCFkUGVZZnkABHdN2KXaKO_xyI_oyCb4KdzLd3Sb6fzByx7p7N1lziYbdn9bj0cUjlhZAt1QVvlZFKY8U0MKRIa1MxziWNVYIgv3_9K3Di:1g4qyD:THRZJ-mFgkO-KtGMzS-sP3KX5JA"; scratchcsrftoken=NjVKLOxdSPWCrBZDaPf89oyNWwKvEoes; permissions=%7B%22admin%22%3Afalse%2C%22social%22%3Atrue%2C%22educator%22%3Afalse%2C%22educator_invitee%22%3Afalse%2C%22student%22%3Afalse%7D; __utma=111872281.696823194.1531177281.1537845990.1537895890.36; gsScrollPos-1635032454=; gsScrollPos-1635031685=; _gid=GA1.1.55047185.1538366069"
// length: 22
// __proto__: Array(0)
// rawTrailers: []
// read: ƒ (n)
// arguments: (...)
// caller: (...)
// length: 1
// name: ""
// prototype: {constructor: ƒ}
// __proto__: ƒ ()
// [[FunctionLocation]]: _stream_readable.js:365
// [[Scopes]]: Scopes[2]
// readable: false
// route:
// method: "PUT"
// name: "putid"
// path: "/:id"
// versions: []
// __proto__: Object
// sb3:
// project: null
// tmpPath: null
// zipData: null
// __proto__: Object
// serverName: "restify"
// socket: Socket
// allowHalfOpen: true
// bytesRead: (...)
// bytesWritten: (...)
// connecting: false
// domain: null
// localAddress: (...)
// localPort: (...)
// on: ƒ socketOnWrap(ev, fn)
// parser: HTTPParser {0: ƒ, 1: ƒ, 2: ƒ, 3: ƒ, 4: ƒ, _headers: Array(0), _url: "", _consumed: true, socket: Socket, incoming: IncomingMessage, …}
// readable: true
// remoteAddress: (...)
// remoteFamily: (...)
// remotePort: (...)
// server: Server {domain: null, _events: {…}, _eventsCount: 9, _maxListeners: undefined, _connections: 2, …}
// writable: true
// Symbol(asyncId): 5829
// Symbol(asyncId): 5830
// Symbol(bytesRead): 0
// Symbol(triggerAsyncId): 5829
// _bytesDispatched: 0
// _destroyed: false
// _events: {end: Array(2), finish: ƒ, _socketEnd: ƒ, drain: Array(2), timeout: ƒ, …}
// _eventsCount: 10
// _hadError: false
// _handle: TCP {reading: true, owner: Socket, onread: ƒ, onconnection: null, writeQueueSize: 0, …}
// _host: null
// _httpMessage: ServerResponse {domain: null, _events: {…}, _eventsCount: 2, _maxListeners: undefined, output: Array(0), …}
// _idleNext: TimersList {_idleNext: Socket, _idlePrev: Socket, _timer: Timer, _unrefed: true, msecs: 120000, …}
// _idlePrev: TimersList {_idleNext: Socket, _idlePrev: Socket, _timer: Timer, _unrefed: true, msecs: 120000, …}
// _idleStart: 21726357
// _idleTimeout: 120000
// _maxListeners: undefined
// _parent: null
// _paused: false
// _peername: {address: "::ffff:172.19.0.1", family: "IPv6", port: 37098}
// _pendingData: null
// _pendingEncoding: ""
// _readableState: ReadableState {objectMode: false, highWaterMark: 16384, buffer: BufferList, length: 0, pipes: null, …}
// _server: Server {domain: null, _events: {…}, _eventsCount: 9, _maxListeners: undefined, _connections: 2, …}
// _sockname: null
// _writableState: WritableState {objectMode: false, highWaterMark: 16384, finalCalled: false, needDrain: false, ending: false, …}
// bufferSize: (...)
// destroyed: (...)
// readableHighWaterMark: (...)
// readyState: (...)
// writableHighWaterMark: (...)
// _connecting: (...)
// __proto__: Duplex
// statusCode: null
// statusMessage: null
// timers: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// trailers: {}
// upgrade: false
// url: "/2000000008"
// _anonFuncCount: 5
// _body: "{}"
// _cacheURL: "/2000000008"
// _clen: 2
// _consuming: true
// _contentType: "application/json"
// _currentHandler: "handler-4"
// _currentRoute: "putid"
// _dtraceId: 243
// _dumped: false
// _events:
// aborted: (3) [ƒ, ƒ, ƒ]
// close: (3) [ƒ, ƒ, ƒ]
// data: ƒ onRequestData(chunk)
// error: ƒ ()
// _eventsCount: 4
// _maxListeners: undefined
// _parsedBody: true
// _readBody: true
// _readableState: ReadableState {objectMode: false, highWaterMark: 16384, buffer: BufferList, length: 0, pipes: null, …}
// _time: (2) [138425, 796848456]
// _timerMap: {_sanitizePath: Array(2), handler-0: Array(2), handler-1: Array(2), parseCookies: Array(2), readBody: Array(2), …}
// _url: Url
// auth: null
// hash: null
// host: null
// hostname: null
// href: "/2000000008"
// path: "/2000000008"
// pathname: "/2000000008"
// port: null
// protocol: null
// query: null
// search: null
// slashes: null
// __proto__: Object
// _version: "*"
// destroyed: (...)
// readableHighWaterMark: (...)
// __proto__: Readable

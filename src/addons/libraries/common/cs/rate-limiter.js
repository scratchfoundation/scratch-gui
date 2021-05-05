export default class RateLimiter {
  constructor(wait) {
    this.timeout = null;
    this.callback = null;
    this.wait = wait;
  }

  abort(call = true) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      if (call) this.callback();
      this.timeout = this.callback = null;
    }
  }

  limit(callback) {
    this.abort(false);
    this.callback = callback;
    this.timeout = setTimeout(() => {
      this.timeout = this.callback = null;
      callback();
    }, this.wait);
  }
}

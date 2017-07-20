'use strict'
let redis = require('./RedisAdapter');
let memcached = require('./MemcachedAdapter');

class CacheClientFactory {
  /**
   * Creates a Cache Client Object on demand.
   * @param  {String} host   Host IP address
   * @param  {Integer} port  Port used by the cache server 
   * @param  {[type]} vendor 'redis' or 'memcached'
   * @return {Object}  A Redis or Memcached Adapter Object
   */
  constructor(host, port, vendor) {
    switch (vendor) {
      case 'redis':
        this.vendor = new redis(host, port);
        break;
      case 'memcached':
        this.vendor = new memcached(host, port);
        break;
      default:
        this.vendor = new redis(host, port);
        break;
    }
    return this.vendor;
  }
}

module.exports = CacheClientFactory;
'use strict'
let redis = require('./Estrategies/RedisAdapter');
let redisClient = require("redis");

let memcached = require('./Estrategies/MemcachedAdapter');

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
        var redisIstance = redisClient.createClient({
          "port": port,
          "host": host
        })
        this.vendor = new redis(host, port, redisIstance);
        break;
      case 'memcached':
        this.vendor = new memcached(host, port);
        break;
      default:
      var redisIstance = redis.createClient({
          "port": port,
          "host": host
        })
        this.vendor = new redis(host, port, redisIstance);
        break;
    }
    return this.vendor;
  }
}

module.exports = CacheClientFactory;
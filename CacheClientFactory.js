'use strict'
let redis = require('./RedisAdapter');
let memcached = require('./MemcachedAdapter');

class CacheClientFactory{
	constructor(host, port, vendor){
		switch(vendor){
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
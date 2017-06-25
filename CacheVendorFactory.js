'use strict'
let redis = require('/RedisAdapter');
let memcached = require('/MemcachedAdapter');

class CacheClientFactory{
	constructor(vendor, host, port){
		switch(vendor){
			case 'redis':
				this.vendor = new redis(host, port);
				break;
			case 'memcached':
				this.vendor = new memcached(host+':'+port);
				brek;
			default:
				this.vendor = new redis(host, port); 	
		}
		return this.vendor;	
	}
}

module.exports = CacheClientFactory;
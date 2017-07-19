'use strict'
let CacheClientFactory = require('./CacheClientFactory');
class Cache{
	constructor(host, port, vendor){
		this.client = new CacheClientFactory(host, port, vendor);
	}

	get(key){
		 return this.client.get(key); 
	}

	set(key, val){
		return this.client.set(key, val); 
	}


	getHash(key){
		return this.client.getHash(key);
	}

	setHash(key, object){
		return this.client.setHash(key, object);
	}

	delete(key){
		return this.client.delete(key);
	}

}

module.exports = Cache;
'use strict'
class MemcachedAdapter {
	constructor(host, port){
		this.client = new Memcached(host+":"+memcachedPort);
	}

	getHash(key){
		memcached.get(key, function (err, data) {
		  	if(err) return err;
		    if(data) return data;
		});
	}

	setHash(key, val){
		memcached.set(key, val, 10000, (err) => { if(err) return err;  });
	}
}

module.exports = MemcachedAdapter;
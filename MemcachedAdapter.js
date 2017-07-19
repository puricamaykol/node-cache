'use strict'
let Memcached = require('memcached');
class MemcachedAdapter {
	constructor(host, port){
		this.memcached = new Memcached(host+':'+port);
	}

	get(key){
		 return new Promise((resolve, reject) => {  
			this.memcached.get(key, (err, reply) => {
		   	 			if (reply) {
				      	resolve(reply);
					   }
					   else if(err){
					      reject(err);
					   }else{
					   	 reject("The provided key doesn't exist!");
					   }
		      			});
				});
	}

	set(key, val){
		return new Promise((resolve, reject) => {  
			this.memcached.set(key, val, 2592000, err => {
		   	 			if (err){
					      reject(err);
		   	 			}else{
		   	 				resolve("OK");
		   	 			}
					   }
		      			);
				});
	}


	getHash(key){
		return this.get(key);
	}

	setHash(key, object){
		return this.set(key, object);
	}

	delete(key){
		return new Promise((resolve, reject) => {
			this.memcached.del(key, function(err) {
				if (err) {
					      reject(err);
					   }else{
					   	resolve("OK");
					   }
        	});
        });
	}
}

module.exports = MemcachedAdapter;
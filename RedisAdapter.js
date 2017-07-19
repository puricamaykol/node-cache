'use strict'
let redis = require('redis');
class RedisAdapter {
	constructor(host, port){
		this.redis = redis.createClient({"port":port, "host":host});
	}

	get(key){
		 return new Promise((resolve, reject) => {  
			this.redis.get(key, (err, reply) => {
		   	 			if (reply) {
				      	resolve(reply);
					   }
					   else if(err){
					      reject(err);
					   } else {
					   		reject("The provided key doesn't exist!");
					   }
		      			});
				});
	}

	set(key, val){
		return new Promise((resolve, reject) => {  
			this.redis.set(key, val, (err, reply) => {
		   	 			if (reply) {
				      	resolve(reply);
					   }
					   else {
					      reject(err);
					   }
		      			});
				});
	}


	getHash(key){
		return new Promise((resolve, reject) => { 
			this.redis.hgetall(key, function (err, obj) {
			    if (obj) {
				      	resolve(obj);
					   }
					   else {
					      reject(err);
					   }
			});
	    });
	}

	setHash(key, object){
		let keyValueArray = [];
		for (var property in object) {
		    if (object.hasOwnProperty(property)) {
		         keyValueArray.push(property);
		         keyValueArray.push(object[property]);
		    }
		}
		return new Promise((resolve, reject) => { 
			this.redis.hmset(key, ...keyValueArray, function (err, reply) {
					if (reply) {
				      	resolve(reply);
					   }
					   else {
					      reject(err);
					   }
			});
		});
	}

	delete(key){
		return new Promise((resolve, reject) => {
			this.redis.del(key, function(err, reply) {
				if (reply) {
				      	resolve(reply);
					   }
					   else {
					      reject(err);
					   }
        	});
        });
	}
}

module.exports = RedisAdapter;
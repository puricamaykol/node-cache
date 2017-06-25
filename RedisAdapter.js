'use strict'
let redis = require('redis');
class RedisAdapter {
	constructor(host, port){
		this.client = redis.createClient(redisPort, host);
	}

	getHash(key){
		client.hgetall(key, (err, object) => {
		    if(err) return err;
		    if(object) return object;
		});
	}

	setHash(key, val){
		this.client.hmset(key, val, (err, res) => {
			if (err) return err;
			if(res) return res;
		});
	}
}

module.exports = RedisAdapter;
console.log("hello world");

let redisPort = 6379
let memcachedPort = 11211
let host = 'localhost'
let redis = require('redis');
let Memcached = require('memcached');
let client = redis.createClient(redisPort, host);
let frameworksObject = {
    'javascript': 'AngularJS',
    'css': 'Bootstrap',
    'node': 'Express'
	}
client.on('connect', function() {
    console.log('connected');
});


client.hmset('frameworks', frameworksObject, function (err, res) {});


client.exists('frameworks', function(err, reply) {
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});


client.hgetall('frameworks', function(err, object) {
    console.log(object);
});

let memcached = new Memcached(host+":"+memcachedPort);

memcached.set('frameworks', frameworksObject, 10000, function (err) { /* stuff */ });
memcached.get('frameworks', function (err, data) {
  	console.log(err, "err in memcached")
  	console.log(data, "in memcached")
});

Node Cache 
===================

[![Build Status](https://travis-ci.org/puricamaykol/node-cache.svg?branch=master)](https://travis-ci.org/puricamaykol/node-cache)  Integrated With Travis CI


Promise based cache Node module. It provides a single interface for Redis and Memcached basic methods.

----------

How to install
-------------

```bash
 npm install mpnode-cache --save
```

Methods
-------------

 - set
 - get
 - setHash (Stores a JSON Object)
 - getHash (Gets a JSON Object)
 - delete

API
-------------

    set([String] key, [String] val) : Promise

    get([String] key) : Promise

    setHash([String] key, [JSON] Object) : Promise

    getHash([String] key) : Promise

    delete([String] key): Promise

Example
-------------

```javascript

let cache = require('mpnode-cache');

console.log("memcached");

let client = new cache("127.0.0.1", 11211, "memcached");

client.set('TestKey', "TestValue")
		.then(rep => console.log(rep, "respuesta set"))
		.catch(err=>console.log(err, "error set"));

client.get('TestKey')
		.then(rep => console.log(rep, "respuesta get"))
		.catch(err=>console.log(err, "error get"));

let obj = {'att1':"val1"};

client.setHash("testHashKey", obj)
		.then(rep => console.log(rep, "respuesta setHashet"))
		.catch(err=>console.log(err, "error setHash"));

client.getHash("testHashKey")
		.then(rep => console.log(rep, "respuesta getHashet"))
		.catch(err=>console.log(err, "error getHash"));

client.delete("TestKey")
		.then(rep => console.log(rep, "respuesta delete"))
		.catch(err=>console.log(err, "error delete"));

client.get('TestKey')
		.then(rep => console.log(rep, "respuesta get"))
		.catch(err=>console.log(err, "error get"));

console.log("redis");

let second_client = new cache("127.0.0.1", 6379, "redis");

second_client.set('TestKey', "TestValue")
			 	.then(rep => console.log(rep, "respuesta set"))
			 	.catch(err=>console.log(err, "error set"));

second_client.get('TestKey')
			.then(rep => console.log(rep, "respuesta get"))
			.catch(err=>console.log(err, "error get"));

second_client.setHash("testHashKey", obj)
			.then(rep => console.log(rep, "respuesta setHashet"))
			.catch(err=>console.log(err, "error setHash"));

second_client.getHash("testHashKey")
			.then(rep => console.log(rep, "respuesta getHashet"))
			.catch(err=>console.log(err, "error getHash"));

second_client.delete("TestKey")
			.then(rep => console.log(rep, "respuesta delete"))
			.catch(err=>console.log(err, "error delete"));

second_client.get('TestKey')
			.then(rep => console.log(rep, "respuesta get"))
			.catch(err=>console.log(err, "error get"));

```



The road ahead
-------------

 - Implement auth support


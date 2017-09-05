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

API
-------------

    

 - `set([String] key, [String] val) : Promise`

   

 - `get([String] key) : Promise`

    

 - `setHash([String] key, [JSON] Object) : Promise`

    

 - `getHash([String] key) : Promise`

    

 - `delete([String] key): Promise`

    

 - `getOrFetch([String] key, [Function] callback(done)): Promise`

```javascript
client.getOrFetch('TestKeyGetFetchMC', done=>{
	setTimeout(function(){ done("This is the fetched value"); }, 3000);
         })
         .then(res=>console.log(res))
         .catch(err=>console.log(err));

```

Example
-------------

```javascript

let cache = require('mpnode-cache');

console.log("memcached");

let client = new cache("127.0.0.1", 6379, "redis");

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

client.getOrFetch('TestKeyGetFetchMC', (done)=>{
		setTimeout(function(){ done("This is the fetched value"); }, 3000);
}).then(res=>{
	client.get('TestKeyGetFetchMC')
		.then(rep => console.log(rep, "response TestKeyGetFetchMC"))
		.catch(err => console.log(err, "error TestKeyGetFetchMC"))
}).catch(err=>console.log(err));



```



The road ahead
-------------

 - Replace with Spyies or Stubs both redis clients methods in unit tests

 - Implement auth support



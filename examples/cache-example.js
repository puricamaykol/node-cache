let cache = require('../lib/Cache');
//let cache = require('mpnode-cache');

console.log("memcached");

let client = new cache("127.0.0.1", 11211, "memcached");

client.set('TestKey', "TestValue").then(rep => console.log(rep, "response set")).catch(err => console.log(err, "error set"));

client.get('TestKey').then(rep => console.log(rep, "response get")).catch(err => console.log(err, "error get"));

let obj = {
  'att1': "val1"
};

client.setHash("testHashKey", obj).then(rep => console.log(rep, "response setHashet")).catch(err => console.log(err, "error setHash"));

client.getHash("testHashKey").then(rep => console.log(rep, "response getHashet")).catch(err => console.log(err, "error getHash"));


client.delete("TestKey").then(rep => console.log(rep, "response delete")).catch(err => console.log(err, "error delete"));

client.get('TestKey').then(rep => console.log(rep, "response get")).catch(err => console.log(err, "error get"));

client.getOrFetch('TestKeyGetFetchMC', done=>{
		setTimeout(function(){ done("This is the fetched value"); }, 3000);
}).then(res=>{
	client.get('TestKeyGetFetchMC')
		.then(rep => console.log(rep, "response TestKeyGetFetchMC"))
		.catch(err => console.log(err, "error TestKeyGetFetchMC"))
}).catch(err=>console.log(err, "error al hacerle get"));


client.delete("TestKeyGetFetchMC").then(rep => console.log(rep, "response delete")).catch(err => console.log(err, "error delete"));


console.log("redis");

let second_client = new cache("127.0.0.1", 6379, "redis");

second_client.set('TestKey', "TestValue").then(rep => console.log(rep, "response set")).catch(err => console.log(err, "error set"));

second_client.get('TestKey').then(rep => console.log(rep, "response get")).catch(err => console.log(err, "error get"));


second_client.setHash("testHashKey", obj).then(rep => console.log(rep, "response setHashet")).catch(err => console.log(err, "error setHash"));

second_client.getHash("testHashKey").then(rep => console.log(rep, "response getHashet")).catch(err => console.log(err, "error getHash"));


second_client.delete("TestKey").then(rep => console.log(rep, "response delete")).catch(err => console.log(err, "error delete"));

second_client.get('TestKey').then(rep => console.log(rep, "response get")).catch(err => console.log(err, "error get"));

console.log(Object.getOwnPropertyNames(second_client));

second_client.getOrFetch('TestKeyGetFetch', done=>{
		setTimeout(function(){ done("This is the fetched value"); }, 3000);
}).then(res=>{
	second_client.get('TestKeyGetFetch')
		.then(rep => console.log(rep, "response TestKeyGetFetch"))
		.catch(err => console.log(err, "error TestKeyGetFetch"))
});


second_client.delete("TestKeyGetFetch").then(rep => console.log(rep, "response delete")).catch(err => console.log(err, "error delete"));

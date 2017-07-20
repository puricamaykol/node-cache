let redis = require('./RedisAdapter');

let client = new redis("127.0.0.1", 6379);

client.set('TestKey', "TestValue").then(rep => console.log(rep, "respuesta set")).catch(err => console.log(err, "error set"));

client.get('TestKey').then(rep => console.log(rep, "respuesta get")).catch(err => console.log(err, "error get"));


let obj = {
  'att1': "val1"
};
client.setHash("testHashKey", obj).then(rep => console.log(rep, "respuesta setHashet")).catch(err => console.log(err, "error setHash"));

client.getHash("testHashKey").then(rep => console.log(rep, "respuesta getHashet")).catch(err => console.log(err, "error getHash"));


client.delete("TestKey").then(rep => console.log(rep, "respuesta delete")).catch(err => console.log(err, "error delete"));

client.get('TestKey').then(rep => console.log(rep, "respuesta get")).catch(err => console.log(err, "error get"));

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

var memcached = require('../lib/Estrategies/MemcachedAdapter');
describe("#Memcached", function() {
	describe("#get( ) method", function() {
		it("Should get a value by given key if the key exists", function() {
			let client = new memcached("127.0.0.1", 11211);
			return client.set('TestMCGETKEY', "some_value").then(rep=>client.get('TestMCGETKEY').should.eventually.deep.equal("some_value"));

			
    	});
    	it("Should reject the promise if given key doesn't exist", function() {
			let client = new memcached("127.0.0.1", 11211);
			//client.delete('TestGETKEYNotCreated');

			return client.get('TestMCGETKEYNotCreated').should.be.rejectedWith("The provided key doesn't exist!"); 

    	});
	});
	describe("#set( ) method", function() {
		afterEach(function() {
        let setUpClient = new memcached("127.0.0.1", 11211);
			 setUpClient.delete('TestsetKEY');
    		
  		});
		it("Should return OK if succeeded", function() {
			let client = new memcached("127.0.0.1", 11211);
			return client.set('TestsetKEY', "some_value_set").should.eventually.deep.equal("OK");
    	});
    	it("Should store the value with the given key", function() {
			let client = new memcached("127.0.0.1", 11211);
			 client.set('TestsetKEY', "some_value_set_two");
			client.get('TestsetKEY').should.eventually.deep.equal("some_value_set_two");
    	});

	});
	describe("#getHash( ) method", function(){
			it("Should get a hash (as an Object literall) by given key if the key exists", function() {
			let client = new memcached("127.0.0.1", 11211);
			client.setHash('TestGETHASHKEY', {"attr1": "vl1", "atrr2":"val2"});

			return client.getHash('TestGETHASHKEY').should.eventually.deep.equal({"attr1": "vl1", "atrr2":"val2"});
    	});
	});
	describe("#setHash( ) method", function() {
		afterEach(function() {
        let setUpClient = new memcached("127.0.0.1", 11211);
			 setUpClient.delete('TestsetHashKEY');
    		
  		});
		it("Should return OK if succeeded", function() {
			let client = new memcached("127.0.0.1", 11211);
			return client.setHash('TestsetHashKEY', "some_value_set").should.eventually.deep.equal("OK");
    	});
    	it("Should store the object with the given key", function() {
			let client = new memcached("127.0.0.1", 11211);
			 client.setHash('TestsetHashKEY', {"attr1": "val1", "attr2":"val2"});
			 client.getHash('TestsetHashKEY').should.eventually.deep.equal({"attr1": "val1", "attr2":"val2"});
			 client.getHash('TestsetHashKEY').should.eventually.have.property("attr1", "val1");
			 client.getHash('TestsetHashKEY').should.eventually.have.property("attr2", "val2");
    	});

	});
	describe("#delete( ) method", function(){
		it("Should return OK if succeeded", function() {
			let client = new memcached("127.0.0.1", 11211);
			 client.set('testDelkey', "some_value_to_del");
			 client.delete('testDelkey').should.eventually.deep.equal("OK");
    	});
    	it("Should be rejected if KEY doesn't exist", function() {
			let client = new memcached("127.0.0.1", 11211);
			 client.delete('testDelkeyDE').should.be.rejectedWith("The provided key doesn't exist!"); 
    	});
	});

});
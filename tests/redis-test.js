var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

var redis = require('../lib/Estrategies/RedisAdapter');

describe("#Redis", function() {
  describe("#get( ) method", function() {
    it("Should get a value by given key if the key exists", function() {
      var redisThirdparty = {
        get: function(key, cb) {
          var cb = cb;
          cb(null, "some_value");
        }
      };
      let client = new redis("localhost", 6379, redisThirdparty);

      return client.get('TestGETKEY').should.eventually.deep.equal("some_value");
    });
    it("Should reject the promise if given key doesn't exist", function() {
      var redisThirdparty = {
        get: function(key, cb) {
          var cb = cb;
          cb("The provided key doesn't exist!", null);
        }
      };
      let client = new redis("localhost", 6379, redisThirdparty);

      return client.get('TestGETKEYNotCreated').should.be.rejectedWith("The provided key doesn't exist!");

    });
  });
  describe("#set( ) method", function() {

    it("Should store the value with the given key", function() {
      var redisThirdparty = {
        set: function(key, val, cb) {
          var cb = cb;
          cb(null, "OK");
        }
      };
      let client = new redis("localhost", 6379, redisThirdparty);
      return client.set('TestsetKEY', "some_value_set").should.eventually.deep.equal("OK");
    });
    it("Should reject the promise if an error occurs", function() {
      var redisThirdparty = {
        set: function(key, val, cb) {
          var cb = cb;
          cb("There was an error storing the key", null);
        }
      };
      let client = new redis("localhost", 6379, redisThirdparty);
      return client.set('TestsetKEY', "some_value_set").should.be.rejectedWith("There was an error storing the key");
    });

  });
  describe("#getHash( ) method", function() {
    it("Should get a hash (as an Object literall) by given key if the key exists", function() {
      var redisThirdparty = {
        hgetall: function(key, cb) {
          var cb = cb;
          cb(null, {
            "attr1": "vl1",
            "atrr2": "val2"
          });
        }
      };
      let client = new redis("localhost", 6379, redisThirdparty);
      return client.getHash('TestGETHASHKEY').should.eventually.deep.equal({
        "attr1": "vl1",
        "atrr2": "val2"
      });
    });
    it("Should reject the promise if error occurs", function() {
      var redisThirdparty = {
        hgetall: function(key, cb) {
          var cb = cb;
          cb("There was an error", null);
        }
      };
      let client = new redis("localhost", 6379, redisThirdparty);

      return client.getHash('TestGETKEYNotCreated').should.be.rejectedWith("There was an error");

    });
  });
  describe("#setHash( ) method", function() {
    it("Should store the object with the given key", function() {
      var redisThirdparty = {
        hmset: function(key, val, cb) {
          var cb = cb;
          cb(null, "OK");
        }
      };
      let client = new redis("localhost", 6379, redisThirdparty);
      return client.setHash('TestsetHashKEY', "some_value_set").should.eventually.deep.equal("OK");
    });
    
    it("Should reject the promise if an error occurs", function() {
      var redisThirdparty = {
        hmset: function(key, val, cb) {
          var cb = cb;
          cb("There was an error storing the key", null);
        }
      };
      let client = new redis("localhost", 6379, redisThirdparty);
      return client.setHash('TestsetHashKEY', "some_value_set").should.be.rejectedWith("There was an error storing the key");
    });

  });
  describe("#delete( ) method", function() {
    it("Should return OK if succeeded", function() {
      var redisThirdparty = {
        del: function(key, cb) {
          var cb = cb;
          cb(null, 1);
        }
      };
      let client = new redis("localhost", 6379, redisThirdparty);
      return client.delete('testDelkey').should.eventually.deep.equal("OK");
    });
    it("Should be rejected if KEY doesn't exist", function() {
      var redisThirdparty = {
        del: function(key, cb) {
          var cb = cb;
          cb(null, null);
        }
      };
      let client = new redis("localhost", 6379, redisThirdparty);
      return  client.delete('testDelkeyDE').should.be.rejectedWith("The provided key doesn't exist!");
    });
    it("Should reject the promise if an error occurs", function() {
      var redisThirdparty = {
        del: function(key, cb) {
          var cb = cb;
          cb("There was an error deleting", null);
        }
      };
      let client = new redis("localhost", 6379, redisThirdparty);
      return client.delete('TestsetHashKEY').should.be.rejectedWith("There was an error deleting");
    });
  });

});
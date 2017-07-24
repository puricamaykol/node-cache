'use strict'
let redis = require('redis');
class RedisAdapter {
  /**
   * @param  {String} host   Host IP address
   * @param  {Integer} port  Port used by the cache server 
   */
  constructor(host, port) {
    this.redis = redis.createClient({
      "port": port,
      "host": host
    });
  }
  /**
    * Gets a value by key
    * @param  {String} key A cache key
    * @return {Promise} A promise containing the value or an error
    */
  get(key) {
    return new Promise((resolve, reject) => {
      this.redis.get(key, (err, reply) => {
        if (reply) {
          resolve(reply);
        } else if (err) {
          reject(err);
        } else {
          reject("The provided key doesn't exist!");
        }
      });
    });
  }
  /**
   * Creates a Key and adds a value to it
   * @param {String} key 
   * @param {Promise} val A promise containing an OK message or en error
   */
  set(key, val) {
    return new Promise((resolve, reject) => {
      this.redis.set(key, val, (err, reply) => {
        if (reply) {
          resolve(reply);
        } else {
          reject(err);
        }
      });
    });
  }
  /**
   * Gets a hash as a JSON object
   * @param  {String} key 
   * @return {Promise}     A promise containing a JSON object or an error
   */
  getHash(key) {
    return new Promise((resolve, reject) => {
      this.redis.hgetall(key, function(err, obj) {
        if (obj) {
          resolve(obj);
        } else {
          reject(err);
        }
      });
    });
  }
  /**
   * Stores a JSON Object as a Hash
   * @param {String} key    
   * @param {JSON} object to be stored
   * @return {Promise} Promise containing an OK message or an error
   */
  setHash(key, object) {
    let keyValueArray = [];
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        keyValueArray.push(property);
        keyValueArray.push(object[property]);
      }
    }
    return new Promise((resolve, reject) => {
      this.redis.hmset(key, ...keyValueArray, function(err, reply) {
        if (reply) {
          resolve(reply);
        } else {
          reject(err);
        }
      });
    });
  }
  /**
   * Deletes a value by key
   * @param  {String} key 
   * @return {Promise}    Promise containing an OK message or an error 
   */
  delete(key) {
    return new Promise((resolve, reject) => {
      this.redis.del(key, function(err, reply) {
        if (reply) {
          if (reply === 1) resolve("OK");
        } else if (err) {
          reject(err);
        } else {
          reject("The provided key doesn't exist!");
        }
      });
    });
  }
  /**
   * [getOrFetch description]
   * @param  {[type]} key      [description]
   * @param  {[type]} callcack [description]
   * @return {[type]}          [description]
   */
  getOrFetch(key, callback) {
    let cb = callback;
    let k = key;
    return new Promise((resolve, reject) => {
      this.redis.get(key, (err, reply) => {
        if (reply) {
          resolve(reply);
        } else if (err) {
          reject(err);
        } else {
          cb((value) => {
            this.redis.set(k, value, (err, reply) => {
              if (reply) {
                resolve({
                  "response": reply,
                  "key": k,
                  "value": value
                });
              } else {
                reject(err);
              }
            })
          });
        }
      });
    });
  }

}

module.exports = RedisAdapter;
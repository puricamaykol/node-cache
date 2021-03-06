'use strict'
class MemcachedAdapter {
  /**
   * @param  {String} host   Host IP address
   * @param  {Integer} port  Port used by the cache server 
   */
  constructor(host, port, client) {
    this.memcached = client;
  }
  /**
   * Gets a value by key
   * @param  {String} key A cache key
   * @return {Promise} A promise containing the value or an error
   */
  get(key) {
    return new Promise((resolve, reject) => {
      this.memcached.get(key, (err, reply) => {
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
      this.memcached.set(key, val, 2592000, err => {
        if (err) {
          reject(err);
        } else {
          resolve("OK");
        }
      }
      );
    });
  }
  /**
   * Gets a hash as a JSON object
   * @param  {String} key 
   * @return {Promise}     A promise containing a JSON object or an error
   */
  getHash(key) {
    return this.get(key);
  }
  /**
   * Stores a JSON Object as a Hash
   * @param {String} key    
   * @param {JSON} object to be stored
   * @return {Promise} Promise containing an OK message or an error
   */
  setHash(key, object) {
    return this.set(key, object);
  }
  /**
   * Deletes a value by key
   * @param  {String} key 
   * @return {Promise}    Promise containing an OK message or an error 
   */
  delete(key) {
    return new Promise((resolve, reject) => {
     this.memcached.del(key, err => {
        if (err) {
          reject(err);
        } else {
          resolve("OK");
        }
      })

    });
  }
  /**
   * Gets a value by key. If it doesn't exist, executes the callback
   * in order to fetch and set the value 
   * @param  {String}   key      key to get or fetch
   * @param  {Function} callback A callback that fetches the value to be set
   * @return {Promise}           Promise containing the get or fetched value
   */
  getOrFetch(key, callback) {
    let cb = callback;
    let k = key;
    return new Promise((resolve, reject) => {
      this.memcached.get(key, (err, reply) => {
        if (reply) {
          resolve(reply);
        } else if (err) {
          reject(err);
        } else {
          cb(value => {
            this.memcached.set(key, value, 2592000, err => {
              if (err) {
                reject(err);
              } else {
                resolve({
                  "response": "OK",
                  "key": k,
                  "value": value
                });
              }
            });
          });
        }
      });
    });
  }
}

module.exports = MemcachedAdapter;
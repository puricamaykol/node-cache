'use strict'
let CacheClientFactory = require('./CacheClientFactory');
class Cache {
  /**
   * 
   * @param  {String} host   Host IP address
   * @param  {Integer} port  Port used by the cache server 
   * @param  {String} vendor 'redis' or 'memcached'
   */
  constructor(host, port, vendor) {
    this.client = new CacheClientFactory(host, port, vendor);
  }
  /**
   * Gets a value by key
   * @param  {String} key A cache key
   * @return {Promise} A promise containing the value or an error
   */
  get(key) {
    return this.client.get(key);
  }
  /**
   * Creates a Key and adds a value to it
   * @param {String} key 
   * @param {Promise} val A promise containing an OK message or en error
   */
  set(key, val) {
    return this.client.set(key, val);
  }
  /**
   * Gets a hash as a JSON object
   * @param  {String} key 
   * @return {Promise}     A promise containing a JSON object or an error
   */
  getHash(key) {
    return this.client.getHash(key);
  }
  /**
   * Stores a JSON Object as a Hash
   * @param {String} key    
   * @param {JSON} object to be stored
   * @return {Promise} Promise containing an OK message or an error
   */
  setHash(key, object) {
    return this.client.setHash(key, object);
  }
  /**
   * Deletes a value by key
   * @param  {String} key 
   * @return {Promise}    Promise containing an OK message or an error 
   */
  delete(key) {
    return this.client.delete(key);
  }
  /**
   * Gets a value by key. If it doesn't exist, executes the callback
   * in order to fetch and set the value 
   * @param  {String}   key      key to get or fetch
   * @param  {Function} callback A callback that fetches the value to be set
   * @return {Promise}           Promise containing the get or fetched value
   */
  getOrFetch(key, callback){
    return this.client.getOrFetch(key, callback);
  }

}

module.exports = Cache;
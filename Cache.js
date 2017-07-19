'use strict'
require('/CacheVendorFactory');
class Cache{
	constructor(vendor, host, port){
		this.client = CacheClientFactory(vendor, host, port);
	}

	get(){}

	set(){}

	getHash(){}

	setHash(){}

	delete(){}

}
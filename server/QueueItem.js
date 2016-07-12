"use strict"
class QueueItem{
	constructor(request, response, url, filePath){
		this.request    = request
		this.response 	= response
		this.url 		= url
		this.filePath   = filePath
	}
}

module.exports = QueueItem
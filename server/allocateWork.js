"use strict"
function allocateWork(cluster, requestQueue){
	return function(){
		for(let i in cluster.workers){
			let worker = cluster.workers[i]
			if(!worker.busy && requestQueue.length){
				let queueItem = requestQueue.pop()
				worker.busy = true
				worker.request = queueItem.request
				worker.response = queueItem.response
				worker.send({
					"url": queueItem.url, 
					"filePath": queueItem.filePath
				})
			}
		}
	}
}

module.exports = allocateWork
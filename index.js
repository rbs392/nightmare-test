"use strict"

const options 		= require("config")
const cluster 		= require("cluster")
const fork 			= require("./server/fork")
const worker 		= require("./worker/worker")
const server 		= require("./server/server")
const allocateWork 	= require("./server/allocateWork")

if(cluster.isMaster){
	const requestQueue  = []
	
	server(requestQueue)

	for(let i=0;i<options.workerCount;i++)
		fork(cluster)

	setInterval(allocateWork(cluster, requestQueue), 1000)
}
else
	worker(options.nightmare, options.maxWaitTime)
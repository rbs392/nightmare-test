"use strict"
function fork(cluster){
	let worker = cluster.fork()

	worker.busy = false

	worker.on("exit", ()=>{
		console.log("Worker exited")
	})

	worker.on("message", (data)=>{
		worker.busy = false
		worker.response.send(data)
		worker.response.end()
	})
}

module.exports = fork
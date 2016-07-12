"use strict"
const fs 			= require("fs")
const express 		= require("express")
const QueueItem 	= require("./QueueItem")
const app 			= express()

function server(requestQueue){
	app.get("/fetch", (request,response)=>{
		requestQueue.push(new QueueItem(request, response, request.query.url))
	})

	app.post("/render", (request, response)=>{
		let body = []
		request.on("data", (chunk)=>body.push(chunk))
		request.on("end", ()=>{
			let filePath = `${new Date().getTime()}.html`
			body = Buffer.concat(body).toString()
			fs.writeFile(`html/${filePath}`, body, {flag:'w'}, ()=>
				requestQueue.push(new QueueItem(request, response, request.query.url, filePath))
			)
		})
		
	})

	app.use(express.static('html'))

	app.listen(3000, ()=>console.log("App started at port 3000"))
}

module.exports = server
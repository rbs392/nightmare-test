"use strict"

const Nightmare = require("nightmare")
const maxWaitTime 	= require("config").maxWaitTime

function processQueue(options, url, filePath){
	const nightmare = Nightmare(Object.assign({}, options, {
		switches: {
			'proxy-server': url,
			'ignore-certificate-errors': true
		}
	}))
	if(filePath){
		console.log(`http://${filePath}`)
		nightmare.goto(`http://localhost:3000/test.html`)
				.wait(maxWaitTime)
				.evaluate(()=>document.documentElement.outerHTML)
				// .end()
				// .then((result)=>{
				// 	console.log("post result")
				// 	process.send(result)
				// })
	}
	else{
		nightmare.goto(url)
			.wait(maxWaitTime)
			.evaluate(()=>document.documentElement.outerHTML)
			.end()
			.then((result)=>{
				process.send(result)
			})
	}
}

function Worker(options){
	
	process.on("message", (data)=>{
		processQueue(options, data.url, data.filePath)
	})
}

module.exports =  Worker
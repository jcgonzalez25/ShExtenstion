const http = require('http');

let handleRequest = (data)=>{
    data = "<?xml version=\"1.0\"?><ShortHandXML><Elements><Element>"+data+"</Element></Elements></ShortHandXML>";
    let PostOptions = {
        hostname: '10.0.24.236',
        method:"GET",
        port: 8000,
        path: '/ShortHand',
        headers:{
                'Content-Type':'text/xml', 
                'Content-Length':Buffer.byteLength(data)
        } 
    };
    return new Promise((resolve,reject)=>{
        let handleResponse = (res)=>{
            res.setEncoding('utf8');
            res.on("data",data=>resolve(data));
        };
        let req = http.request(PostOptions,handleResponse);
        req.write(data);
        req.end();
    });
}

module.exports = {
    validate: (data)=>{
        let MINIMUM_SHORTHAND_SIZE = 23;

	    return new Promise((resolve,reject)=>{
		    if(data.length <= MINIMUM_SHORTHAND_SIZE){
			    reject("SHORTHAND:ERROR:Minimum Size Failure");
		    }
		    resolve(data);
	    })
        console.clear()
    },
    convert:async (data)=>{
        data = await handleRequest(data);
        console.log(data)
    }
}
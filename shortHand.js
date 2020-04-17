const http = require('http');

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
        this.convert();
    },
    convert:(data)=>{
        try{
            let PostOptions = {
                hostname: '10.0.24.236',
                method:"GET",
                port: 8000,
                path: '/ShortHand',
                headers:{
                        'Content-Type':'text/xml', 
                        'Content-Length':Buffer.byteLength(data)
                } 
            }
            let handleResponse = (res)=>{
                res.setEncoding('utf8');
                res.on("data",
                    function(data){
                        console.log(data);
                });
            };
            var req = http.request(PostOptions,handleResponse);
            req.write(data);
        }catch(err){
            console.error(err);
        }
    }
}
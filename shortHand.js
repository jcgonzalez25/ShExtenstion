module.exports = {
    validate: (data)=>{
        let MINIMUM_SHORTHAND_SIZE = 23;

	    return new Promise((resolve,reject)=>{
		    if(data.length <= MINIMUM_SHORTHAND_SIZE){
			    reject("SHORTHAND:ERROR:Minimum Size Failure");
		    }
		    resolve(data);
	    })
    }
}
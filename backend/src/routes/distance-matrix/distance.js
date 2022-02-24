/**
 I will create one route here which will call the cotroller from NodeJS-Distance-Matrix-wrapper
 overall work of this route will to give you distance between two locations
 You can also use this route for passing the array of locations but as for need we will limit this route to give
 distance between two locations


 */
 const router = require("express").Router();
 const Errors=require('../../toolbox/errors')
 const newDistances=require('../../wrappers/Nodejs-Distance-Matrix-Wrapper/index')
 let distance = require('distance-matrix-api');
 const config=require('../../config/index')
 distance.key(config.DistanceMatrixKey);
 const  { BootcampProjectCache, redisClient }=require('../../wrappers/bootcamp-project-cache/bootcampCache')

 distance.units('imperial');
 const {
    BadRequest, STATUS_CODES
 } = Errors;
 
 

 router.get('/:start/:end',async (req,res,next)=>{
     try{
            const startLocation=req.params.start;
            const endLocation=req.params.end;
            let key = startLocation.concat("_distance_", endLocation);
            const toBeSendFromCache=await BootcampProjectCache.getCacheByKey(key);
            console.log(toBeSendFromCache)
            if(toBeSendFromCache)
            {
                console.log("I am returning from cache")
                res.send(JSON.parse(toBeSendFromCache))
            }
            else{

                const newValue=newDistances(startLocation,endLocation)
                newValue.then((val)=>{
                  redisClient.set(key, JSON.stringify(val))
                  console.log("I am calling API ,but I will save for future need")
                    res.send(val)
                    
                })
                .catch((err)=>{
                    throw err;
                })
                
            }
           
            
           
       
     }
     catch(err){
        return next(err)
     }
     
    
 })
 
router.get('/multi/(:arr)*',async (req,res,next)=>{

    try{
            let params = [req.params.arr].concat(req.params[0].split('/').slice(1));
            params.shift();
            let startContainer=[];
            let endContainer=[];
            let i=0;
            let newkey="";
            for(i=0;i<params.length;i++)
            {
                if(params[i]=='end')
                {
                    break;
                }
                startContainer.push(params[i])
                newkey= newkey.concat(params[i]);
            }
            newkey= newkey.concat("_distance_");
            for(let j=i+1;j<params.length;j++){
                endContainer.push(params[j]);
                 newkey=newkey.concat(params[j]);
            }
           
            const toBeSendFromCache=await BootcampProjectCache.getCacheByKey(newkey);
            if(toBeSendFromCache)
            {
                console.log("I am returning from cache")
                res.send(JSON.parse(toBeSendFromCache))
            }else
            {


                distance.matrix(startContainer, endContainer,function (err, distances) {
                    if (err) {
                    console.log(err);

                    throw BadRequest('OOps ,something went wrong towards Distance matrix APIs',STATUS_CODES.INTERNAL_SERVER_ERROR)
                    }
                    if(!distances) {
                        console.log('no distances');
                        throw BadRequest('Check you ,have entered the startContainer and end locations correctl',STATUS_CODES.INTERNAL_SERVER_ERROR)
                    }
                    if (distances.status == 'OK') {
                        
                         redisClient.set(newkey, JSON.stringify(distances))
                        console.log("I am calling API ,but I will save for future need")
                        res.send(distances)
                    }
            });
            }
            
    }
    catch(err){
            return next(err)
    }
})
 module.exports = router;

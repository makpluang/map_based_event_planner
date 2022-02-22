/**
 I will create one route here which will call the cotroller from NodeJS-Distance-Matrix-wrapper
 overall work of this route will to give you distance between two locations
 You can also use this route for passing the array of locations but as for need we will limit this route to give
 distance between two locations


 */
 const router = require("express").Router();
 const Errors=require('../../toolbox/errors')
 const newDistances=require('../../wrappers/Nodejs-Distance-Matrix-Wrapper/index')
 var distance = require('distance-matrix-api');
 const config=require('../../config/index')
 distance.key(config.DistanceMatrixKey);
 distance.units('imperial');
 const {
    BadRequest, STATUS_CODES
 } = Errors;
 
 

 router.get('/:start/:end',async (req,res)=>{
     try{
         const startloc=req.params.start;
         const endloc=req.params.end;
         
         const newvalue=newDistances(startloc,endloc)
        newvalue.then((val)=>{
            res.send(val)
        }).catch((err)=>{
            throw err;
        })
     }
     catch(err){

        throw new BadRequest('server error!',STATUS_CODES.INTERNAL_SERVER_ERROR)
     }
     
    
 })
 
router.get('/multi/(:arr)*',(req,res)=>{

    try{
            var params = [req.params.arr].concat(req.params[0].split('/').slice(1));
            params.shift();
            var start=[];
            var endval=[];
            for(var i=0;i<params.length;i++)
            {
                if(params[i]=='end')
                {
                    break;
                }
                start.push(params[i])
            }
            for(var j=i+1;j<params.length;j++){
                endval.push(params[j]);
            }
        
            distance.matrix(start, endval,function (err, distances) {
                if (err) {
                console.log(err);

                    res.send('oops,something went wrong')
                }
                if(!distances) {
                    console.log('no distances');
                    res.send('Check you ,have entered the start and end locations correctly')
                }
                if (distances.status == 'OK') {
                    
                
                    res.send(distances)
                }
                
        
            });
            
      
    }
    catch(err){

       throw new BadRequest('server error!',STATUS_CODES.INTERNAL_SERVER_ERROR)
    }


   
})
 module.exports = router;
//http://localhost:3000/api/distance/multi/start/Delhi/Mumbai/end/Maharastra/UttarPradesh
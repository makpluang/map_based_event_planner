
const  { BootcampProjectCache, redisClient }=require('../src/wrappers/bootcamp-project-cache/bootcampCache')
//Playing with Redis
//write get logic
const newKey="d_sonbhadra";
const data={
    name:"kanhaiya lal",
    address:"dudhi"
}
const helper=async (key,val)=>{


   
    try{

        const ans=await BootcampProjectCache.getCacheByKey(key);
        if(ans){
    
           return ans;
        }
        else{
    
            console.log("Not found, I am setting it");
            await redisClient.set(key, JSON.stringify(val))
        }
            
    }
    catch{

        throw err;
    }
   
    
   

    
}
const ans1=helper(newKey,data);
ans1.then((val)=>{

       if(typeof(val)=== 'undefined')
       {

        console.log("I am setting it up")
       }else{
           console.log(val)
       }
    }).catch((err)=>{
        throw err;
    })
    



//playing with Redis
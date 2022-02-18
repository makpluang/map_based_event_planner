//******************************************************playing around the code *******************************************
const {User,Checkpoints,Path,Paths}=require('./toolbox/models/index')
const Mongo_Wrapper=require('./wrappers/Mongo-wrappers/base_Model')

//all about Users field 

const userObject=new Mongo_Wrapper(User)
const allUsers=userObject.findAll()
allUsers.then((val)=>{

    //console.log(val)
}).catch((err)=>{

    throw err
})
const id="620df95fef6e4237ae8f9e0e"
const particularUser=new Mongo_Wrapper(User,id).findOne();
particularUser.then((val)=>{

    console.log(val)
}).catch((err)=>{
    throw err
})


const newdata={
    'name':'shubham Kumar'
}
const updatedUser=new Mongo_Wrapper(User,id,newdata).update()
updatedUser.then((val)=>{

    console.log(val)
}).catch((err)=>{
    throw err
})


const deletedUser=new Mongo_Wrapper(User,id).delete()
deletedUser.then((val)=>{

    console.log(val)
}).catch((err)=>{
throw err
})


//all about Checkpoints
const checkpointsobject=new Mongo_Wrapper(Checkpoints)
const checkpointsdata=checkpointsobject.findAll()
checkpointsdata.then((val)=>{

    //console.log(val)
}).catch((err)=>{
    throw err
})

//all about created path by admin
const pathobject=new Mongo_Wrapper(Path);
const allCreatedPath=pathobject.findAll();
allCreatedPath.then((val)=>{

    //console.log(val)
}).catch((err)=>{
    throw err
})

//all about exposed paths
const pathsObject=new Mongo_Wrapper(Paths)
const allExposedPath=pathsObject.findAll()
allExposedPath.then((val)=>{

    //console.log(val)
}).catch((err)=>{
    throw err
})

//******************************************************playing around the code *******************************************
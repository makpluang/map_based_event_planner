/*
this is base model for mongoDb


*/

const Errors=require('../../toolbox/errors')
const {
   BadRequest, STATUS_CODES
} = Errors;


class BaseModel {
  constructor(model,criteria,select,populate,options) {
    this.model = model;
    this.criteria=criteria
    this.select=select
    this.populate=populate
    this.options=options
  }


  async findOne(){
      try{

        
       //i will have to write all the logics here 
       const user = await this.model.findById({ _id: this.criteria });
       if(!user || user.isdeleted){

        return "User do not exist"
       }
       else
       {

        return user
       }
        
      }
      catch(err){
          throw new BadRequest("server error !" ,STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
     
  }
  async findAll() {
      try{
  
        
        //i will have to write all the logics here 
        const allData=await this.model.find();
        return allData
      }
      catch(err){

        throw new BadRequest("server error !" ,STATUS_CODES.INTERNAL_SERVER_ERROR);

      }
    
  }
  async create() {
    try{
       


      const newData = new model(this.select);
      const datatoreturn = await newData.save();
      return datatoreturn
  
    }
    catch(err){

        throw new BadRequest("server error !" ,STATUS_CODES.INTERNAL_SERVER_ERROR);

    }
    
  }
  
  async update(){
    try{

   
     //i will have to write all the logics here 
     const user = await this.model.findById({ _id: this.criteria });
     if(!user || user.isdeleted)
     {


      return "User do not exist, SO you will not be able to update "
     }
     else
     {
        const updatedAdmin = await this.model.findByIdAndUpdate(
          this.criteria,
          {
            $set: this.select,
          },
          { new: true }
        );
        return updatedAdmin
     }
      
    }
    catch(err){
        throw new BadRequest("server error !" ,STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
   
}
   
  async delete() {
   
   

      try{

        const tobedeleted=await this.model.findById(this.criteria)
     
        if(tobedeleted.isdeleted)
        {
           return "data do not exists"
        }
        else
        {

         const deleteddata= await this.model.findByIdAndUpdate(
            this.criteria,
            {
              isdeleted: true,
            },
            { new: true }
          );
          return deleteddata
        }
      }
      catch(err){
        throw new BadRequest("server error !" ,STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
       
    
      }
    }
  


module.exports = BaseModel;


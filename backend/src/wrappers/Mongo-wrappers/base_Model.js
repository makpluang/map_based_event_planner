
class BaseModel {
  constructor(model,criteria,select,populate,options) {
    this.model = model;
    this.criteria=criteria
    this.select=select
    this.populate=populate
    this.options=options
  }
async findOne(){
       const user = await this.model.findById({ _id: this.criteria });
       if(!user || user.isdeleted){
          return "User do not exist"
       }
       else
       {
         return user
       }
        
}
  async findAll() {
        const allData=await this.model.find();
        return allData
}
  async create() {
      const newData = new model(this.select);
      const dataToReturn = await newData.save();
      return dataToReturn;
}
  
  async update(){
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
   
  async delete() {
        const toBeDeleted=await this.model.findById(this.criteria)
        if(toBeDeleted.isdeleted)
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
    }
  


module.exports = BaseModel;


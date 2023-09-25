import Joi from 'joi';


const userSchema = Joi.object({  

     first_name : Joi.string().required(), 
     last_name : Joi.string().required(),
     email : Joi.string().required(),
     password : Joi.string().required(), 
     number : Joi.string().required(),
 });


 export default userSchema;
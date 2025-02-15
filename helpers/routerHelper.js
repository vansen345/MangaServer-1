const Joi = require('@hapi/joi')


const validateBody = (schema,name)=>{
    return(req,res,next)=>{
        const validatorResult= schema.validate(req.body)

        if(validatorResult.error){
            return res.status(400).json(validatorResult.error)
        } else{
              
            if(!req.value) req.value ={}
            
            if(!req.value['params']) req.value.params ={}

           
            req.value.body = validatorResult.value
            next()
           
        }
    }

}
const validateParam =(schema,name)=>{
    return(req,res,next)=>{
        console.log('params',req.params[name]);
        const validatorResult = schema.validate({param: req.params[name]})
        console.log('result',validatorResult);

        if(validatorResult.error){
            return res.status(400).json(validatorResult.error)

        }else{
            
            if(!req.value) req.value ={}
            
            if(!req.value['params']) req.value.params ={}
           
            req.value.params[name]= req.params[name]
            console.log('req value',req.value);


            next()
        }
    }
}

const schemas={
    idSchema:Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    SignupSchema: Joi.object().keys({
        name:Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        phone:Joi.string().min(2).required(),
        password: Joi.string().min(6).required()

    }),
    SingninSchema:Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()

    }),
    userSchema:Joi.object().keys({
        name:Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        phone:Joi.string().min(2).required(),
        password: Joi.string().min(3).required()
    }),
    userUpdateSchema: Joi.object().keys({
        name:Joi.string().min(2),
        email: Joi.string().email(),
        phone:Joi.string().min(2),
        password: Joi.string().min(3)
    }),
    comicSchema:Joi.object().keys({
        name_comic:Joi.string().min(2).required(),
        status:Joi.string().min(2).required(),
        content:Joi.string().min(2).required(),
        rating:Joi.string().required(),
        image:Joi.string().min(2).required(),
        year:Joi.string().min(2).required(),
        name_author:Joi.string().min(2).required(),

    }),
    comicUpdateSchema: Joi.object().keys({
        name_comic:Joi.string().min(2),
        status: Joi.string().email(),
        image:Joi.string().min(2),
        year: Joi.string().min(3),
        name_author: Joi.string().min(3),
        
    })
}

module.exports={
    validateBody,
    validateParam,
    schemas
}
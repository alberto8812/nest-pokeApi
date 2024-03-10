import * as Joi from "joi";

//CREAMOS UN VALIDAOR DE SQUEMA

export const JoiValidationSchema=Joi.object({
  MONGODB:Joi.required(),
  PORT:Joi.number().default(3005),
  DEFAULT_LIMIT:Joi.number().default(6) ,
 
})
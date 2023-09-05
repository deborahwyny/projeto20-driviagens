import Joi from "joi"

export const passengersSchemma = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required()
    
})
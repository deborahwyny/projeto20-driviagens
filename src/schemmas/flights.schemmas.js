import Joi from "joi"

export const flightSchemma = Joi.object({
    origin: Joi.string().required(),
    destination: Joi.string().required(),
    date: Joi.required().date()
})

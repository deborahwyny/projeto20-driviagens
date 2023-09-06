import Joi from "joi";

export const flightSchema = Joi.object({
    origin: Joi.string().required(),
    destination: Joi.string().required(),
    date: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required()
})



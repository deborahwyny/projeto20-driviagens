import Joi from "joi"

export const citiesSchemma = Joi.object({
    name: Joi.string().required().min(2).max(500)
})
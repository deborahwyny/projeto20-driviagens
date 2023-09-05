import { Router } from "express"
import { validateSchemma } from "../middlewares/validation.middlewares.js"
import { citiesSchemma } from "../schemmas/cities.schemma.js"
import { postCities } from "../controllers/cities.controllers.js"


const citiesRoutes = Router()
citiesRoutes.post("/cities", validateSchemma(citiesSchemma), postCities)




export default citiesRoutes
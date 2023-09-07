import { Router } from "express"
import { validateSchemma } from "../middlewares/validation.middlewares.js"
import { flightSchema } from "../schemmas/flights.schemmas.js"
import { getFlightes, postFlights, postTravels } from "../controllers/flights.controllers.js"


const flightRoutes = Router()
flightRoutes.post("/flights", validateSchemma(flightSchema), postFlights)
flightRoutes.post("/travels", postTravels)
flightRoutes.get("/flights", getFlightes)


export default flightRoutes


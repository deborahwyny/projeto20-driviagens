import { Router } from "express"
import { validateSchemma } from "../middlewares/validation.middlewares.js"
import { passengersSchemma } from "../schemmas/passengers.schemma.js"
import { postPassengers } from "../controllers/passengers.controllers.js"




const passengerRoutes = Router()
passengerRoutes.post("/passengers", validateSchemma(passengersSchemma), postPassengers)




export default passengerRoutes
import { Router } from "express"
import passengerRoutes from "./passengers.routes.js"
import citiesRoutes from "./cities.routes.js"
import flightRoutes from "./flights.routes.js"


const router = Router()
router.use(passengerRoutes)
router.use(citiesRoutes)
router.use(flightRoutes)




export default router
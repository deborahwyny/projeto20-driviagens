import { Router } from "express"
import passengerRoutes from "./passengers.routes.js"
import citiesRoutes from "./cities.routes.js"


const router = Router()
router.use(passengerRoutes)
router.use(citiesRoutes)




export default router
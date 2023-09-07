import { db } from "../database/database.connection.js";
import { passenger } from "../repository/passenger. repository.js";
import { passengerService } from "../services/passenger.services.js";



export async function postPassengers(req, res) {

    const {firstName, lastName} = req.body


    try{
        const insertPassenger = await passengerService.passengerPostService(firstName, lastName)
        res.sendStatus(201)

    } catch(err){
        res.status(500).send(err.message)

    }
}



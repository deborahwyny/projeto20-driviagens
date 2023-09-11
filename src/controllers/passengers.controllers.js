import { db } from "../database/database.connection.js";
import { passenger } from "../repository/passenger. repository.js";
import { passengerService } from "../services/passenger.services.js";
import httpStatus from "http-status"; 



export async function postPassengers(req, res) {

    const {firstName, lastName} = req.body


    try{
        const insertPassenger = await passengerService.passengerPostService(firstName, lastName)
        res.sendStatus(httpStatus.CREATED);
    } catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
}



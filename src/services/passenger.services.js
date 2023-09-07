import { passenger } from "../repository/passenger. repository.js"

async function passengerPostService(firstName, lastName){

    

    if (!firstName || !lastName) throw {type: "Conflict", message: " "}
    // {return res.status(409)} tratamento erro


    try{
        const insertPassenger = await passenger(firstName, lastName);
        return insertPassenger;
    } catch(err){
        throw err; 
    }
}

export const passengerService = {passengerPostService}


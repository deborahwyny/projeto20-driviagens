import { passenger } from "../repository/passenger. repository.js"

async function passengerPostService(firstName, lastName){

    

    if (!firstName || !lastName) 
    throw { type: "Conflict", message: "Nomes obrigatorios " };

    try{
        const insertPassenger = await passenger(firstName, lastName);
        return insertPassenger;
    } catch(err){
        throw err; 
    }
}

export const passengerService = {passengerPostService}


import { flightExistRepository, insertFlightsRepository, insertTravelsRepository, postFlightsDestinationRepository, postFlightsRepository, postTravelRepository } from "../repository/flights.repository.js";
import dayjs from "dayjs"

async function postFlightsService(origin, destination, date){

    const dateFormat = 'DD-MM-YYYY';


    if(origin === destination) {return res.status(409)}

    const formattedDate = date.split('-').reverse().join('/');

    const currentDate = dayjs();
    
    const flightDate = dayjs(formattedDate, { format: dateFormat });
    
    if (!flightDate.isValid() || flightDate.isBefore(currentDate)) {
      return res.status(422).send("A data do voo deve ser maior que a data atual ou está em um formato inválido.");
    }

    
    try{

        const originCity = await postFlightsRepository(origin)
        const destinationCity = await postFlightsDestinationRepository(destination)

        if (originCity.rowCount === 0 || destinationCity.rowCount === 0) {return res.status(404).send("Origem ou destino não encontrados.")}

        const originId = originCity.rows[0].id
        const destinationId = destinationCity.rows[0].id

        const result= await insertFlightsRepository(originId,destinationId, flightDate)
        return result

    } catch(err){
        res.status(500).send(err.message)

    }
}

 async function postTravelservice(passengerId, flightId){


    try{

        const passengerExist = await postTravelRepository(passengerId)
        if(passengerExist.rowCount === 0) res.sendStatus(404)

        const flightExist = await flightExistRepository(flightId)
        if(flightExist.rowCount === 0) res.sendStatus(404)

        const insertTravels= await insertTravelsRepository(passengerId, flightId)
        return insertTravels


    } catch(err){
        res.status(500).send(err.message)

    }
}

export const flightsServices = {postFlightsService, postTravelservice}

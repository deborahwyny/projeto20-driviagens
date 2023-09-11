import { db } from "../database/database.connection.js"
import dayjs from "dayjs"
import { insertFlightsRepository, postFlightsDestinationRepository, postFlightsRepository } from "../repository/flights.repository.js";
import { flightsServices } from "../services/flights.services.js";
import httpStatus from "http-status"; 


export async function postFlights(req, res){

    const {origin, destination, date} = req.body
  
    try{

        const insertFlights= await flightsServices.postFlightsService(origin, destination, date)
        res.sendStatus(httpStatus.CREATED);

    } catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);

    }
}

export async function postTravels(req, res){

    const { passengerId, flightId} = req.body;

    try{

        const insertTravels= await flightsServices.postTravelservice(passengerId, flightId)
        res.sendStatus(httpStatus.CREATED);

    } catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);

    }
}
export async function getFlightes(req, res){
    const { origin, destination, biggerDate, smallerDate } = req.query;

    if (biggerDate && smallerDate && smallerDate > biggerDate) {
        return res.sendStatus(400); 
    }
    try{
        const flights = await flightRepository.getFlights({
            origin,
            destination,
            biggerDate,
            smallerDate,
        });

        const formattedFlights = flights.map(row => ({
            id: row.id,
            origin: row.origin,
            destination: row.destination,
            date: dayjs(row.date).format('DD-MM-YYYY'),
        }));

        res.send(flights);
    } catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
}


export async function getPassengersTravels(req, res){
    const { name } = req.query;

    try{

        let filterClause = '';

        if (name) {
            filterClause = `WHERE CONCAT(passengers.firstName, ' ', passengers.lastName) ILIKE '%${name}%'`;
        }

        const query = `
        SELECT
        passengers.id,
        CONCAT(passengers.firstName, ' ', passengers.lastName) AS passenger,
        COUNT(travels.id) AS travels
    FROM passengers
    LEFT JOIN travels ON passengers.id = travels.passengerId
    ${filterClause} 
    GROUP BY passengers.id
    ORDER BY travels DESC
    LIMIT 10;

    `;

    const result = await db.query(query);

    if (result.rows.length > 10) {
        res.status(500).send("Too many results");
    } else {
        const passengersTravels = result.rows.map(row => ({
            passenger: row.passenger,
            travels: parseInt(row.travels),
        }));
        res.send(passengersTravels);
    }
} catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
}
}
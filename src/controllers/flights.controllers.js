import { db } from "../database/database.connection.js"
import dayjs from "dayjs"
import { insertFlightsRepository, postFlightsDestinationRepository, postFlightsRepository } from "../repository/flights.repository.js";
import { flightsServices } from "../services/flights.services.js";

export async function postFlights(req, res){

    const {origin, destination, date} = req.body
  
    try{

        const insertFlights= await flightsServices.postFlightsService(origin, destination, date)
        res.sendStatus(201)

    } catch(err){
        res.status(500).send(err.message)

    }
}

export async function postTravels(req, res){

    const { passengerId, flightId} = req.body;

    try{

        const insertTravels= await flightsServices.postTravelservice(passengerId, flightId)
        res.sendStatus(201)

    } catch(err){
        res.status(500).send(err.message)

    }
}
export async function getFlightes(req, res){
    const { origin, destination, biggerDate, smallerDate } = req.query;

    if (biggerDate && smallerDate && smallerDate > biggerDate) {
        return res.sendStatus(400); 
    }
    try{
        let query = `
            SELECT
                flights.id,
                origin.name AS origin,
                destination.name AS destination,
                date 
            FROM flights
            INNER JOIN cities AS origin ON flights.origin = origin.id
            INNER JOIN cities AS destination ON flights.destination = destination.id
        `;

        const params = [];
        if (origin) {
            query += ' WHERE origin.name = $1'; 
            params.push(origin);
        }
        
        if (destination) {
            if (origin) {
                query += ' AND destination.name = $2'; 
            } else {
                query += ' WHERE destination.name = $1'; 
            }
            params.push(destination);
        }

        if (biggerDate && smallerDate) {
            if (origin || destination) {
                query += ' AND date BETWEEN $3 AND $4'; 
            } else {
                query += ' WHERE date BETWEEN $1 AND $2'; 
            }
            params.push(biggerDate, smallerDate);
        } else if (biggerDate) {
            if (origin || destination) {
                query += ' AND date >= $3'; 
            } else {
                query += ' WHERE date >= $1'; 
            }
            params.push(biggerDate);
        } else if (smallerDate) {
            if (origin || destination) {
                query += ' AND date <= $3'; 
            } else {
                query += ' WHERE date <= $1'; 
            }
            params.push(smallerDate);
        }

        query += ' ORDER BY date ASC'; 

        const getFlights = await db.query(query, params);


        const flights = getFlights.rows.map(row => ({
            id: row.id,
            origin: row.origin,
            destination: row.destination,
            date: dayjs(row.date).format('DD-MM-YYYY')
        }));

        res.send(flights);
    } catch(err){
        res.status(500).send(err.message);
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
    res.status(500).send(err.message);
}
}
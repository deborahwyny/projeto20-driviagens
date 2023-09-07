import { db } from "../database/database.connection.js"
import dayjs from "dayjs"

export async function postFlights(req, res){

    const {origin, destination, date} = req.body

    if(origin === destination) {return res.status(409)}

    const dateFormat = 'DD-MM-YYYY';

    const currentDate = dayjs();
    const flightDate = dayjs(date, { format: dateFormat });
    
    if (flightDate.isBefore(currentDate)) {
        return res.status(422).send("A data do voo deve ser maior que a data atual ou está em um formato inválido.");
    }

    try{

        const originCity = await db.query('SELECT id FROM cities WHERE name = $1;', [origin])
        const destinationCity = await db.query('SELECT id FROM cities WHERE name = $1;', [destination])

        if (originCity.rowCount === 0 || destinationCity.rowCount === 0) {return res.status(404).send("Origem ou destino não encontrados.")}

        const originId = originCity.rows[0].id
        const destinationId = destinationCity.rows[0].id

        const insertFlights= await db.query('INSERT INTO flights (origin, destination, date) VALUES ($1, $2,$3);',
        [originId,destinationId, flightDate])

        res.sendStatus(201)

    } catch(err){
        res.status(500).send(err.message)

    }
}

export async function postTravels(req, res){

    const { origin, destination, biggerDate, smallerDate } = req.query;

    try{

        const passengerExist = await db.query('SELECT * FROM passengers WHERE id = $1;', [passengerId])
        if(passengerExist.rowCount === 0) res.sendStatus(404)

        const flightExist = await db.query('SELECT * FROM flights WHERE id = $1;', [flightId])
        if(flightExist.rowCount === 0) res.sendStatus(404)

        const insertTravels= await db.query('INSERT INTO travels (passengerId, flightId) VALUES ($1, $2);',
        [passengerId, flightId])

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

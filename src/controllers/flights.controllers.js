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

    const {passengerId, flightId} = req.body

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
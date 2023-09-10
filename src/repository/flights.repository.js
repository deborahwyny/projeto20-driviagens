import { db } from "../database/database.connection.js"


export async function postFlightsRepository(origin){
    const result =  await db.query('SELECT id FROM cities WHERE name = $1;', [origin])
    return result }

export async function postFlightsDestinationRepository( destination){
    const result =  await db.query('SELECT id FROM cities WHERE name = $1;', [destination])
    return result }

export async function insertFlightsRepository(originId,destinationId, flightDate){
    const result =  await db.query('INSERT INTO flights (origin, destination, date) VALUES ($1, $2,$3);',
    [originId,destinationId, flightDate])
    return result }

export async function postTravelRepository(passengerId){
    const result = await db.query('SELECT * FROM passengers WHERE id = $1;', [passengerId])
    return result

}

export async function flightExistRepository(flightId){
    const result = await db.query('SELECT * FROM flights WHERE id = $1;', [flightId])
    return result
}

export async function insertTravelsRepository(passengerId, flightId){
    const result = db.query('INSERT INTO travels (passengerId, flightId) VALUES ($1, $2);',
    [passengerId, flightId])
}
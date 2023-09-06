import { db } from "../database/database.connection.js";



export async function postPassengers(req, res) {

    const {firstName, lastName} = req.body


    if (!firstName || !lastName) {return res.status(409)}


    try{

        const insertPassenger = await db.query('INSERT INTO passengers (firstName, lastName) VALUES ($1, $2);',
        [firstName, lastName])

        res.sendStatus(201)

    } catch(err){
        res.status(500).send(err.message)

    }
}


export async function getFlightes(req, res){

    try{

    } catch(err){
        res.status(500).send(err.message)

    }
}
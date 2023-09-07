import { db } from "../database/database.connection.js"
import { allCities, insertCities } from "../repository/cities.repository.js";

export async function postCities(req, res){

    const {name} = req.body

    try{

        const cities = await allCities(name)
        if (cities.rows.length !== 0) {
            return res.status(409).send("Nome de cidade já existente");
        }
        await insertCities(name)

        res.sendStatus(201)

    } catch(err){
        res.status(500).send(err.message)
    }
}
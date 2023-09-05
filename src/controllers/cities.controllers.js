import { db } from "../database/database.connection.js"

export async function postCities(req, res){

    const {name} = req.body

    try{

        const cities = await db.query('SELECT * FROM cities WHERE name=$1;', [name])
        if (cities.rows.length !== 0) {
            return res.status(409).send("Nome de cidade já existente");
        }
        await db.query('INSERT INTO cities (name) VALUES ($1);', [name])

        res.sendStatus(201)

    } catch(err){
        res.status(500).send(err.message)
    }
}
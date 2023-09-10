import { db } from "../database/database.connection.js"
import { allCities, insertCities } from "../repository/cities.repository.js";
import { citiesService } from "../services/cities.services.js";

export async function postCities(req, res){

    const {name} = req.body

    try{

        const cities = await citiesService.postCitiesService(name)
        res.sendStatus(201)

    } catch(err){
        res.status(500).send(err.message)
    }
}
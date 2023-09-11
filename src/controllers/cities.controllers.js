import { db } from "../database/database.connection.js"
import { allCities, insertCities } from "../repository/cities.repository.js";
import { citiesService } from "../services/cities.services.js";
import httpStatus from "http-status"; 

export async function postCities(req, res){

    const {name} = req.body

    try{

        const cities = await citiesService.postCitiesService(name)
        res.sendStatus(httpStatus.CREATED)
    } catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);    }
}
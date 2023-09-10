import { allCities, insertCities } from "../repository/cities.repository.js";

 async function postCitiesService(name){

    try{

        const cities = await allCities(name)
        if (cities.rows.length !== 0) {
            return res.status(409).send("Nome de cidade já existente");
        }
       const citieService = await insertCities(name)
       return citieService

    } catch(err){
        res.status(500).send(err.message)
    }
}

export const citiesService = {postCitiesService}

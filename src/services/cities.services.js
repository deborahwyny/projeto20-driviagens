import { allCities, insertCities } from "../repository/cities.repository.js";

 async function postCitiesService(name){

    try{

        const cities = await allCities(name)
        if (cities.rows.length !== 0) {
            throw new Error("Nome de cidade já existente");
        }
       const citieService = await insertCities(name)
       return citieService

    } catch(err){
        throw err;    }
}

export const citiesService = {postCitiesService}

import { db } from "../database/database.connection.js";

export async function allCities(name){
    const result = await db.query('SELECT * FROM cities WHERE name=$1;', [name])
    return result
}

export async function insertCities(name){
    const result = db.query('INSERT INTO cities (name) VALUES ($1);', [name])
    return result

}
import { db } from "../database/database.connection.js"

export async function passenger(firstName,lastName){
   const result = await db.query('INSERT INTO passengers (firstName, lastName) VALUES ($1, $2);',[firstName, lastName])
   return result
}
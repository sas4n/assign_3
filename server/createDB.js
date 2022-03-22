import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const createDb = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: process.env.HOST || 'localhost',
            user : process.env.USER,
            password : process.env.PASSWORD
        })
        const query = 'CREATE DATABASE IF NOT EXISTS movies;'
        connection.query(query, (err, result) => {
            if (err) {
               return reject(err)
            }
            console.log('database created')
            resolve('database is ready')   
            
        })
        connection.end()
    })
    
}

function createTables() {
    return new Promise((resolve, reject) =>{
        const connectionPool = mysql.createPool({
            host : process.env.HOST || 'localhost',
            user : process.env.USER,
            password : process.env.PASSWORD,
            database : process.env.DATABASE
        })
    })

}

export {createDb, createTables}
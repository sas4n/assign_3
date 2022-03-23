import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const databaseName = process.env['DATABASE']

const database = {}

database.createDatabase = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: process.env.HOST || 'localhost',
            user : process.env.USER,
            password : process.env.PASSWORD
        })
        const query = `CREATE DATABASE IF NOT EXISTS ${databaseName};`
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

const connectionPool = mysql.createPool({
    host : process.env.HOST || 'localhost',
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : databaseName,
    connectionLimit : 10
})

database.createUsersTable = () => {
    return new Promise((resolve, reject) =>{
        const createUserTableQuery = `CREATE TABLE IF NOT EXISTS user ( 
            person_nr int NOT NULL,
            first_name varchar(20) NOT NULL, 
            last_name varchar(20) NOT NULL,
            PRIMARY KEY (person_nr));`
        connectionPool.query(createUserTableQuery,(err, results) => {
            if(err) return reject(err)
            resolve('user table created')
        })

})
}

database.createMoviesTable = () => { 
    return new Promise((resolve, reject) => {
        const createMoviesTableQuery = `CREATE TABLE IF NOT EXISTS movie (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(20) NOT NULL,
            director varchar(40),
            owner_id int NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (owner_id) REFERENCES user(person_nr));`
        connectionPool.query(createMoviesTableQuery, (err, result) => {
            if (err) return reject(err)
            resolve('movie table created')
        })
    })
   
}

database.createMovieFormatTable = () => {
    return new Promise((resolve, reject) => {
        const createMovieFormatTableQuery = `CREATE TABLE IF NOT EXISTS movie_format (
            name varchar(20) NOT NULL,
            PRIMARY KEY (name)
        );`
        connectionPool.query(createMovieFormatTableQuery, (err, result) => {
            if (err) return reject(err)
            resolve('movie_format table created')
        })
    })
}

database.createBorrwingTable = () => {
    return new Promise((resolve, reject) => {
        const createBorrwingTableQuery = `CREATE TABLE IF NOT EXISTS borrowing_schedule (
            borrower_person_nr int NOT NULL,
            movie_id int NOT NULL,
            date_borrowed date,
            date_returned date,
            PRIMARY KEY (borrower_person_nr, movie_id),
            FOREIGN KEY (borrower_person_nr) REFERENCES user(person_nr),
            FOREIGN KEY (movie_id) REFERENCES movie(id));`
        connectionPool.query(createBorrwingTableQuery, (err, result) => {
            if(err) return reject(err)
            resolve('borrowing table created')
        })
    })
    }

database.createAvailabilityFormatTable = () => {
    return new Promise((resolve, reject) => {
        const createAvailabilityFormatTableQuery = `CREATE TABLE IF NOT EXISTS available_format (
            movie_id int NOT NULL,
            format_name varchar(20) NOT NULL,
            PRIMARY KEY (movie_id, format_name),
            FOREIGN KEY (movie_id) REFERENCES movie(id),
            FOREIGN KEY (format_name) REFERENCES movie_format(name));`
        connectionPool.query(createAvailabilityFormatTableQuery, (err, result) => {
            if (err) return reject(err)
            resolve('available_format created')
        })

    })
}



export default database 
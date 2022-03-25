import express from 'express'
import * as mysql from 'mysql'
import cors from 'cors'
import * as dotenv from 'dotenv'
import database from './database.js'

dotenv.config()

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended:false }))


app.get('/', async(req, res) => {
    const msg = await database.createDatabase()
    const createUser = await database.createUsersTable()
    const createMovie = await database.createMoviesTable()
    const createMovieFormat = await database.createMovieFormatTable()
    const createBorrowing = await database.createBorrwingTable()
    const createmovieFormatAvailableIn = await database.createAvailabilityFormatTable()
    const insertIntoUserTable = await database.inserDataIntoUsersTable()
    const insertIntoMovie = await database.inserDataIntoMoviesTable()
    const insertIntoMovieFormat = await database.inserDataIntoMovieFormatTable()
    const insertIntoBorrowing = await database.inserDataIntoBorrowingTable()
    const insertIntoAvailabilityFormat = await database.inserDataIntoMovieFormatAvailabilityTable()
    console.log(insertIntoUserTable)
    console.log(insertIntoMovie)
    console.log(insertIntoMovieFormat)
    console.log(insertIntoBorrowing)
    console.log(insertIntoAvailabilityFormat)
    console.log('msg from db: ' + msg)
    res.json({msg : 'hi'})
    /*createmovieFormatAvailableIn.then(msg => {
        console.log('msg from db1111: ' + msg)
        res.json({msg : msg})
    })*/
    //res.send('success')
})

//list of all movie and their owner or just the movies


//enter a movie name to see who is the owner_person_nr


//name of persons who didnt returned the movie yet



//name of the most availaboe format that



// name of the movie which is borrowed most(most favorite movie)



//write a movie name and see what format is available for that movie





app.listen(port, () => console.log(`server is running on port ${port}`))
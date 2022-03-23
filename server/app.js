import express from 'express'
import * as mysql from 'mysql'
import cors from 'cors'
import * as dotenv from 'dotenv'
import database from './createDB.js'

dotenv.config()

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended:false }))


app.get('/', async(req, res) => {
    console.log('it works')
    const msg = await database.createDatabase()
    const createUser = await database.createUsersTable()
    const createMovie = await database.createMoviesTable()
    const createMovieFormat = await database.createMovieFormatTable()
    const createBorrowing = await database.createBorrwingTable()
    const createmovieFormatAvailableIn = await database.createAvailabilityFormatTable()
    console.log(msg)
    console.log(createUser)
    console.log(createMovie)
    console.log(createMovieFormat)
    console.log(createBorrowing)
    console.log(createmovieFormatAvailableIn)
})


app.listen(port, () => console.log(`server is running on port ${port}`))
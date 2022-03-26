import express from 'express'
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
    console.log(insertIntoAvailabilityFormat)
    res.json({msg : 'Database created and all data inserted successfully'})
})

//list of all movie and their owner or just the movies
app.get('/getUsers', async(req, res) => {
    database.getUsers()
    .then(users => res.json({users : users}))
    
})

app.get('/getMovies', (req, res) =>{
    database.getMovies()
    .then(movies => res.json({movies : movies}))
})


//enter a movie name to see who is the owner
app.get('/getMoviesOwner/:movieName', (req, res) => {
    const {movieName} = req.params
    database.getMovieOwner(movieName)
    .then((owner) => {res.json(owner)})
})


//name of persons who didnt returned the movie yet
app.get('/get-borrower-name-not-returned-movie', (req, res) => {
    database.getBorrowerNameAndMovieNotReturnedBack()
    .then((data) => res.send(data))
})

// name of the movie which is borrowed most(most favorite movie)
app.get('/getMostFavoriteMovie', async(req, res) =>{
    await database.createView()
    database.getMostFavoriteMovie()
    .then((movieName) =>{res.json(movieName)})
})

//write a movie name and see what format is available for that movie
app.get('/getAvailableFormat/:movieName', (req, res) => {
    const {movieName} = req.params
    database.getAvailableFormat(movieName)
    .then((availableFormat) => {res.json(availableFormat)})
})

app.listen(port, () => console.log(`server is running on port ${port}`))
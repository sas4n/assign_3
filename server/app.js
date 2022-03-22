import express from 'express'
import * as mysql from 'mysql'
import cors from 'cors'
import * as dotenv from 'dotenv'
import {createDb, createTables} from './createDB.js'

dotenv.config()

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended:false }))


app.get('/', async(req, res) => {
    console.log('it works')
    const msg = await createDb()
    console.log(msg)
})


app.listen(port, () => console.log(`server is running on port ${port}`))
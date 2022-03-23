//import mysql from 'mysql'
/*sconst mysql= require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
})

const creatDatabase = connection.connect((err) =>{
    if(err) throw err
    const createDB = 'CREATE DATABASE movie;'
    connection.query(createDB, (err, result) =>{
        if (err) throw err
        console.log(result)
    })
    connection.end((err) =>{
        if(err) throw err
    })
})

export{connection, creatDatabase}*/
const hello = () => console.log('hiiiii')

export{hello}
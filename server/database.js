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
            owner_person_nr int NOT NULL,
            PRIMARY KEY (id),
            UNIQUE(name,owner_person_nr),
            FOREIGN KEY (owner_person_nr) REFERENCES user(person_nr));`
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

database.inserDataIntoUsersTable = () => {
    return new Promise((resolve, reject) => {
        const insertIntoUsersTableQuery = 'INSERT IGNORE INTO user (person_nr, first_name, last_name) VALUES ?'
        const values = [
            [12345, 'Sasan', 'Pormah'],
            [67890, 'Elinor', 'Johansson'],
            [12356, 'Sogol', 'Pormah'],
            [56789, 'Maxim', 'Markov'],
            [23456, 'Martin', 'larsson'],
            [78956, 'Sanel', 'Topic']
        ]
        connectionPool.query(insertIntoUsersTableQuery, [values], (err, result) => {
            if (err) return reject(err)
            resolve('data inserted into users table')
        })
    })
   
}

database.inserDataIntoMoviesTable = () => {
    return new Promise((resolve, reject) => {
        const insertIntoMoviesTableQuery = 'INSERT IGNORE INTO movie (name, director, owner_person_nr) VALUES ?'
        const values = [
            ['Life Is Beautiful', 'Roberto Benigni', 12345],
            ['City Of God', 'Fernando Meirelles', 67890],
            ['Saving Private Ryan', 'Steven Spielberg', 12356],
            ['The Silence Of The Lambs', ' Jonathan Demme', 56789],
            ["It's A Wonderful Life", 'Frank Capra', 12356],
            ['Se7en', 'David Fincher', 12345],
            ['Seven Samurai', 'Akira Kurosawa', 56789],
            ['One Flew Over The Cuckoos Nest', 'Miloš Forman', 67890],
            ['Goodfellas', 'Martin Scorsese', 78956],
            ['The Matrix', 'Wachowskis', 12356],
            ['Star Wars: Episode V', 'Irvin Kershne', 67890],
            ['The Lord Of The Rings: The Two Towers', 'Peter Jackson', 78956],
            ['Inception', 'Christopher Nolan', 23456],
            ['Forrest Gump', ' Robert Zemeckis', 12356],
            ['Fight Club', 'David Fincher', 56789],
            ['The Lord Of The Rings: The Fellowship Of The Rings', 'Peter Jackson', 67890],
            ['The Good, The Bad And The Ugly', 'Sergio Leone', 12345],
            ['Pulp Fiction', 'Quentin Tarantino', 23456],
            ['The Lord Of The Rings: The Return Of The King', 'Peter Jackson', 67890],
            ["Schindler's List", 'Steven Spielberg', 12356],
            ['12 Angry Men', 'Sidney Lumet', 67890],
            ['The Dark Knight', 'Christopher Nolan', 12345],
            ['The Godfather: Part II', 'Francis Ford Coppola', 56789],
            ['The Godfather', 'Francis Ford Coppola', 12345],
            ['The Shawshank Redemption', 'Frank Darabont', 12356]
        ]
        connectionPool.query(insertIntoMoviesTableQuery, [values], (err, result) => {
            if (err) return reject(err)
            resolve('data inserted into movies table')
        })
    })
   
}

database.inserDataIntoMovieFormatTable = () => {
    return new Promise((resolve, reject) => {
        const insertIntoMovieFormatQuery = 'INSERT IGNORE INTO movie_format (name) VALUES ?'
        const values = [
            ['MPEG_4'],
            ['AVI'],
            ['WMP'],
            ['FLV'],
            ['RMVB']
        ]
        connectionPool.query(insertIntoMovieFormatQuery, [values], (err, result) => {
            if (err) return reject(err)
            resolve('data inserted into movie_format table')
        })
    })
   
}
database.inserDataIntoBorrowingTable = () => {
    return new Promise((resolve, reject) => {
        const insertIntoBorrowingTableQuery = 'INSERT IGNORE INTO borrowing_schedule ( borrower_person_nr, movie_id, date_borrowed, date_returned) VALUES ?'
        const values = [
            [12345, '1', '2021-01-12', '2021-01-20'],
            [67890, '25', '2021-02-12', '2021-02-18'],
            [78956, '2', '2021-02-18', '2021-02-20'],
            [12356, '6', '2021-02-24', '2021-02-29'],
            [56789, '8', '2021-03-12', '2021-03-20'],
            [12345, '7', '2021-03-14', '2021-04-22'],
            [67890, '9', '2021-03-18', '2021-03-28'],
            [12356, '12', '2021-03-23', '2021-03-31'],
            [12345, '18', '2021-04-02', '2021-04-20'],
            [56789, '24', '2021-04-15', '2021-04-22'],
            [12356, '15', '2021-04-22', '2021-04-28'],
            [78956, '16', '2021-05-12', '2021-05-20'],
            [23456, '19', '2021-05-18', '2021-05-22'],
            [67890, '22', '2021-05-20', '2021-06-20'],
            [56789, '1', '2021-05-22', '2021-05-23'],
            [67890, '12', '2021-05-26', '2021-05-27'],
            [78956, '17', '2021-06-02', '2021-06-10'],
            [12356, '18', '2021-06-10', '2021-06-18'],
            [56789, '23', '2021-06-12', '2021-06-20'],
            [67890, '20', '2021-06-18', '2021-06-23'],
            [23456, '8', '2021-06-22', '2021-06-28'],
            [12345, '5', '2021-06-26', '2021-07-14'],
            [12356, '11', '2021-06-30', '2021-07-20'],
            [56789, '6', '2021-07-02', null],
            [67890, '10', '2021-07-12', '2021-07-20'],
            [23456, '14', '2021-07-18', '2021-07-24'],
            [12356, '17', '2021-07-22', '2021-07-28'],
            [12345, '13', '2021-07-28', '2021-07-29'],
            [12356, '19', '2021-07-30', '2021-08-10'],
            [67890, '22', '2021-08-02', '2021-08-14'],
            [12345, '11', '2021-08-12', '2021-08-18'],
            [56789, '4', '2021-08-18', '2021-08-22'],
            [23456, '3', '2021-08-22', '2021-10-20'],
            [67890, '2', '2021-08-28', '2021-08-30'],
            [78956, '5', '2021-09-02', '2021-09-20'],
            [12356, '18', '2021-09-12', '2021-09-22'],
            [78956, '13', '2021-09-18', '2021-09-24'],
            [12356, '22', '2021-09-22', '2021-12-20'],
            [56789, '21', '2021-09-28', '2021-10-24'],
            [12345, '4', '2021-10-02', '2021-11-22'],
            [67890, '7', '2021-10-12', null],
            [12356, '9', '2021-10-16', '2021-10-26'],
            [12345, '10', '2021-10-22', '2021-10-30'],
            [56789, '16', '2021-10-28', '2021-11-10'],
            [12356, '4', '2021-11-06', '2021-11-10'],
            [78956, '6', '2021-11-12', '2021-11-20'],
            [12356, '13', '2021-11-18', '2021-11-24'],
            [56789, '12', '2021-11-19', '2021-11-23'],
            [12345, '5', '2021-11-22', '2021-12-20'],
            [67890, '7', '2021-11-28', '2021-12-30'],
            [12356, '9', '2021-11-30', '2022-01-20'],
            [12345, '17', '2021-12-06', '2021-12-14'],
            [56789, '2', '2021-12-12', '2021-12-20'],
            [12356, '5', '2021-12-16', '2021-12-22'],
            [78956, '12', '2021-12-26', '2022-02-20'],
            [12356, '3', '2022-01-12', '2022-01-20'],
            [56789, '14', '2022-01-18', '2022-01-26'],
            [12345, '5', '2022-01-24', '2022-01-28'],
            [67890, '19', '2022-02-02', '2022-02-10'],
            [12356, '11', '2022-02-12', '2022-02-20'],
            [12345, '14', '2022-02-16', '2022-02-26'],
            [56789, '2', '2022-02-20', '2022-02-22'],
            [12356, '1', '2022-02-22', '2022-02-28'],
        ]
        connectionPool.query(insertIntoBorrowingTableQuery, [values], (err, result) => {
            if (err) return reject(err)
            resolve('data inserted into borrowing_schedule table')
        })
    })
   
}
database.inserDataIntoMovieFormatAvailabilityTable = () => {
    return new Promise((resolve, reject) => {
        const insertIntoMovieFormatAvailabilityTableQuery = 'INSERT IGNORE INTO available_format (movie_id, format_name) VALUES ?'
        const values = [
            [1, 'AVI'],
            [1, 'FLV'],
            [2, 'WMP'],
            [2, 'RMVB'],
            [2, 'MPEG_4'],
            [3, 'AVI'],
            [3, 'MPEG_4'],
            [3, 'WMP'],
            [3, 'FLV'],
            [4, 'MPEG_4'],
            [4, 'AVI'],
            [5, 'FLV'],
            [5, 'WMP'],
            [6, 'RMVB'],
            [6, 'MPEG_4'],
            [6, 'AVI'],
            [7, 'FLV'],
            [7, 'WMP'],
            [7, 'RMVB'],
            [8, 'MPEG_4'],
            [8, 'AVI'],
            [9, 'FLV'],
            [10, 'WMP'],
            [10, 'RMVB'],
            [11, 'MPEG_4'],
            [12, 'AVI'],
            [12, 'MPEG_4'],
            [13, 'WMP'],
            [14, 'FLV'],
            [15, 'MPEG_4'],
            [15, 'AVI'],
            [15, 'FLV'],
            [16, 'WMP'],
            [17, 'RMVB'],
            [17, 'MPEG_4'],
            [17, 'AVI'],
            [18, 'FLV'],
            [18, 'WMP'],
            [18, 'RMVB'],
            [18, 'AVI'],
            [19, 'FLV'],
            [19, 'WMP'],
            [20, 'RMVB'],
            [21, 'MPEG_4'],
            [22, 'AVI'],
            [22, 'MPEG_4'],
            [22, 'WMP'],
            [23, 'FLV'],
            [24, 'MPEG_4'],
            [24, 'AVI'],
            [25, 'FLV']
        ]
        connectionPool.query(insertIntoMovieFormatAvailabilityTableQuery, [values], (err, result) => {
            if (err) return reject(err)
            resolve('data inserted into available_format table')
        })
    })
   
}





export default database 
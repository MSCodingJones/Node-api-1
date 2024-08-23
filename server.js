/*Build a server */

//1. Import express and create port
const express = require ('express')
const server = express()
const PORT = process.env.PORT || 3000

//3. Create a connection
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'albumdb'
})

// 5. Root route
// .get(path, callback function)
server.get('/', (req, res)=> {
    res.json({
        'All Albums': `http://localhost:${PORT}/api/album`,
        'All Artist': `http://localhost:${PORT}/api/artist`,
        'All Bands': `http://localhost:${PORT}/api/band`,
        'All Labels': `http://localhost:${PORT}/api/label`,
        'All Genres': `http://localhost:${PORT}/api/genre`
        })
})

// 6. All route
server.get('/api/album', (req, res)=> {
    //con.query(sql squery, callback function)
    connection.query(
        'SELECT * FROM album;',
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
            } else {
                res.json(rows)
            }
            } else {
                console.log('ERROR', error)
            }
        }

    )
})
server.get('/api/artist', (req, res)=> {
    connection.query(
        'SELECT * FROM artist;',
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                }else {
                    res.json(rows)
                }
                }else {
                    console.log('ERROR', error)
                }
                }
    )
})
server.get('/api/band', (req, res)=> {
    connection.query(
        'SELECT * FROM band;',
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                    console.log('ERROR', error)
                }
                }
    )
})

server.get('/api/label', (req, res)=> {
    connection.query(
        'SELECT *FROM label;',
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }                
            } else {
                console.log('ERROR', error)
            }
        }
    )
})

server.get('/api/genre', (req, res) => {
    connection.query(
        'SELECT * FROM genre;',
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('ERROR', error)
            }
        }
    )
})
// 7. Single Route
server.get('/api/album/:id', (req, res)=> {
    // console.log(req.params.id)
    const id = req.params.id
    connection.query(
        `SELECT * FROM album WHERE album_id = ${id};`,
        (error, rows) => {
            if (!error) {
                if (rows.length ===1) {
                    res.json(...rows)
                }else {
                    res.json(rows)
                }
            } else {
                console.log('ERROR', error)
            }
        }
    )
})

server.get('/api/artist/:id/', (req, res) => {
    // console.log(req.params.id)
    const id = req.params.id
    connection.query(
        `SELECT * FROM artist WHERE album_id = ${id}`,
        (error, rows) => {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                } 
            } else {
                console.log('ERROR', error)
            }
        })
})

server.get('/api/label/:id/', (req, res) => {
    // console.log(reg.params.id)
    const id = req.params.id
    connection.query(
        `SELECT * FROM label WHERE label_id = ${id}`,
        (error, rows) => {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
                } else {
                    console.log('ERROR', error)
                }
            }
    )
})
server.get('/api/band/:id/', (req, res) => {
    // console.log(req.params.id)
    const id = req.params.id
    connection.query(
        `SELECT * FROM band WHERE band_id = ${id}`,
        (error, rows) => {
            if (!error) {
                if (rows.length === 1) {
                    res.json(rows)
                }
            } else {
                console.log('ERROR', error)
            }
        }
    )
})
server.get('/api/genre/:id', (req, res)=> {
    connection.query(
        `SELECT *FROM genre WHERE genre_id = ${id};`,
        (error, rows) => {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('ERROR', error)
            }
                }
    )
})
// 4. Connect to Database
connection.connect((error)=> {
if (!error) {
    console.log('Database is connected...')
} else {
    console.log('ERROR', error)
}
})

// 2. Listen for PORT
// .listen (PORT, call back function)
server.listen(PORT, ()=> console.log('Port ${PORT} is listening...'))
const express = require('express');
const app = express();
const mysql = require('mysql');
const connector = require('express-myconnection');
const cors = require('cors');

const routes = require('./router');

//settings and initializers
app.set('port', 9000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'abc123',
    database: 'yocontigodb'
};

//middleware
app.use(connector(mysql, dbOptions, 'single'));
app.use(express.json())
app.use(cors())

//routes
app.get('/', (request, response) => {
    response.send('Bienvenidos a la API');
})

app.use('/api', routes);

//main
app.listen(app.get('port'), () => {
    console.log('server running on port: ', app.get('port'));
})
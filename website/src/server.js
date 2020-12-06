require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

//Inicializaciones
const app = express();

//settings
app.set('port', process.env.PORT || 4000);


//Middlewares
app.use(morgan('dev'));

//Global var


//Routes
app.use(require('./routes'));

//start
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
}) 
app.use(express.static('src/public'));
app.listen(app.get('port'), () => console.log('App listening on port',app.get('port'),'! Go to http://localhost:4000'))


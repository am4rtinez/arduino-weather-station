const express = require('express')
var path = require('path');
const dotenv = require('dotenv')
const morgan = require('morgan')
// const requestLogger = require('./middlewares/requestLogger')

dotenv.config()

const app = express()
const PORT = 3001

const routes = require('./routes/index')		// Rutas para las vistas.
const apiRoutes = require('./routes/api')		// Rutas de la api.

const unknownEndpoint = (req, res) => {
	const error = { status: 404, message: 'Unknown endpoint' }
	// res.render('error.pug', { error });
	res.status(404).send({ error: 'unknown endpoint' })
}

// Settings
app.set('port', process.env.PORT || PORT)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
app.use(express.json())
app.use(morgan('dev'))
// app.use(requestLogger)

// Routes
app.use('/', routes)					// Rutas del site apuntaran a las vistas.
app.use('/api', apiRoutes)		// Rutas de la api

app.use(unknownEndpoint)

// Server initialization
app.listen(app.set('port'), () => {
	console.log(`Servidor ejecutandose en http://localhost:${app.set('port')}`)
})
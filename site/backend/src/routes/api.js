const { Router } = require('express')		// Importa el metodo router de express.
const router = Router()		// Ejecutamos el router.

router.get('/', (req, res) => {
	// res.render('api.pug', { title: 'API REST Gimnas', message: 'Hello there!', name: 'api' });
	res.send('Hola Mundo!')
})

const tempRoute = require('./temperature')
const humidityRoute = require('./humidity')
const pressureRoute = require('./pressure')
const brightnessRoute = require('./brightness')

router.use(tempRoute)
router.use(humidityRoute)
router.use(pressureRoute)
router.use(brightnessRoute)

module.exports = router
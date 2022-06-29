const { Router } = require('express')		// Importa el metodo router de express.
const router = Router()		// Ejecutamos el router.

const humidityController = require('../controllers/humidity');

// Devuelve la lista de clientes.
router.get('/humedad', humidityController.getHumidity)

// Devuelve el cliente a partir de su id.
router.get('/humedad/:date', humidityController.getHumidityDate)

module.exports = router
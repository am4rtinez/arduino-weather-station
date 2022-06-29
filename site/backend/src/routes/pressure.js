const { Router } = require('express')		// Importa el metodo router de express.
const router = Router()		// Ejecutamos el router.

const pressureController = require('../controllers/pressure');

// Devuelve la lista de clientes.
router.get('/presion', pressureController.getPressure)

// Devuelve el cliente a partir de su id.
router.get('/presion/:date', pressureController.getPressureDate)

module.exports = router
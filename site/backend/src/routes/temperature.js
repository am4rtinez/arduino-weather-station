const { Router } = require('express')		// Importa el metodo router de express.
const router = Router()		// Ejecutamos el router.

const tempController = require('../controllers/temperature');

// Devuelve la lista de clientes.
router.get('/temperaturas', tempController.getTemp)

// Devuelve el cliente a partir de su id.
router.get('/temperaturas/:date', tempController.getTempDate)

module.exports = router
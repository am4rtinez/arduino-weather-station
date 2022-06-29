const { Router } = require('express')		// Importa el metodo router de express.
const router = Router()		// Ejecutamos el router.

const brightnessController = require('../controllers/brightness');

// Devuelve la lista de clientes.
router.get('/temperaturas', brightnessController.getBrightness)

// Devuelve el cliente a partir de su id.
router.get('/temperaturas/:date', brightnessController.getBrightnessDate)

module.exports = router
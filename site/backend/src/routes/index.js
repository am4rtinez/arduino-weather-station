const { Router } = require('express')		// Importa el metodo router de express.
const router = Router()		// Ejecutamos el router.

// Generacion de las rutas.
router.get('/', (req, res) => {
	// res.render('index.pug', { title: 'Gimnas NODE JS', message: 'Hello there!', name: 'home'});
	res.send('Hola Mundo!')
})

module.exports = router
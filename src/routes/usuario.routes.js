
const router = require('express').Router();

const usuarioCtrl = require('../controllers/usuario.controller');

const authCtrl = require('../controllers/auth.controller');


router.get('/login/usuario', (req, res) => res.render('login/loginusuario'));


router.get('/registro/usuario', (req, res) => res.render('registro/signinusuario'));


router.post('/login/usuario', authCtrl.login)
  
router.post('/registro/usuario', usuarioCtrl.crearUsuario)

 

module.exports = router;
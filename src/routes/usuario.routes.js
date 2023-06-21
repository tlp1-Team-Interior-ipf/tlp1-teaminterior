
const router = require('express').Router();

const usuarioCtrl = require('../controllers/usuario.controller');

const { validarJWT } = require('../middlewares/validar_jwt');

router.get('/login/usuario', (req, res) => res.render('login/loginusuario'));


router.get('/registro/usuario', (req, res) => res.render('registro/signinusuario'));



router.get('/registro/usuario', (req, res) => {
    res.render('registro/signinusuario');
  });
  
router.post('/registro/usuario', usuarioCtrl)

 

module.exports = router;
const router = require('express').Router();

const {
    crearempresa
} = require('../controllers/empresa.controller');

const { validarJWT } = require('../middlewares/validar_jwt');


router.get('/registro/empresa', (req, res) => res.render('registro/signinempresa'));
router.get('/login/empresa', (req, res) => res.render('login/loginempresa'));

router.get('/registro/empresa', (req, res) => {
    res.render('registro/signinempresa');
  });
  
router.post('/registro/empresa', crearempresa)

module.exports = router;
const router = require('express').Router();


router.get('/empresa', (req, res) => res.render('empresa'));

router.get('/support', (req, res) => res.render('support'));

router.get('/login', (req, res) => res.render('login'));

router.get('/registro', (req, res) => res.render('registro'));

router.get('/login/usuario', (req, res) => res.render('login/loginusuario'));

router.get('/registro/usuario', (req, res) => res.render('registro/signinusuario'));

router.get('/registro/empresa', (req, res) => res.render('registro/signinempresa'));

router.get('/login/empresa', (req, res) => res.render('login/loginempresa'));

router.get('/', (req, res) => {
    res.render('index');
});



module.exports = router;
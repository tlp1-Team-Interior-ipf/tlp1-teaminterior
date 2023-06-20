const router = require('express').Router();


router.get('/empresa', (req, res) => res.render('empresa'));

router.get('/menu', (req, res) => res.render('menu'));

router.get('/menu/cruz-del-norte', (req, res) => res.render('cruz-del-norte'));

router.get('/menu/fontana', (req, res) => res.render('fontana'));

router.get('/menu/libertad', (req, res) => res.render('libertad'));

router.get('/menu/litur', (req, res) => res.render('litur'));

router.get('/menu/monte-carlo', (req, res) => res.render('monte-carlo'));

router.get('/menu/napoleon', (req, res) => res.render('napoleon'));

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
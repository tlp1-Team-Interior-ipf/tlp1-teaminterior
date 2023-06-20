const router = require('express').Router();
const usuario = require('../models/usuario');

router.get('/empresa', (req, res) => res.render('empresa'));

router.get('/support', (req, res) => res.render('support'));

router.get('/login', (req, res) => res.render('login'));

router.get('/registro', (req, res) => res.render('registro'));

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/usuario', (req, res) => {
    res.render('usuario');
  });
  
router.post('/usuario', (req, res) => {

  const { nombre, apellido, telefono, email, fecha_nac, contraseña } = req.body;


  usuario.create({
    nombre,
    apellido,
    telefono,
    email, 
    fecha_nac,
    contraseña
  })
    .then((usuario) => {
      console.log('Registro creado:', usuario.toJSON());
      res.redirect('/usuario'); 
    })
    .catch((error) => {
      console.error('Error al crear el registro:', error);

    });
});


module.exports = router;
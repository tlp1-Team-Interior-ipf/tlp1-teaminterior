const router = require('express').Router();
const empresa = require('../models/empresa');




router.get('/empresa', (req, res) => {
    res.render('empresa');
  });
  
router.post('/empresa', (req, res) => {

  const { nombre, CUIT, telefono, email, contraseña } = req.body;


  empresa.create({
    nombre,
    CUIT,
    telefono,
    email, 
    contraseña
  })
    .then((empresa) => {
      console.log('Registro creado:', empresa.toJSON());
      res.redirect('/empresa'); 
    })
    .catch((error) => {
      console.error('Error al crear el registro:', error);

    });
});

module.exports = router;
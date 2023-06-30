const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const authCtrl = {};

authCtrl.login = async (req, res) => {
    const { email, contraseña } = req.body;
  
    try {
      // Verificar si el email existe
      const existeUsuario = await Usuario.findOne({ where: { email } });
  
      if (!existeUsuario) {
        return res.status(400).json({
          message: 'El correo electrónico no está registrado',
        });
      }
  
      // Verificar la contraseña
      const contraseñaValida = await bcrypt.compare(contraseña, existeUsuario.contraseña);
  
      if (!contraseñaValida) {
        return res.status(400).json({
          message: 'La contraseña no es válida',
        });
      }
  
  
      res.json({
        message: 'Inicio de sesión correcto'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error al iniciar sesión',
      });
    }
  };
  






module.exports = authCtrl;
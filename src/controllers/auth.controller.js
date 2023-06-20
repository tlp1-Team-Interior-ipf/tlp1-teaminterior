const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../../helpers/generar_jwt');
const authCtrl = {};

authCtrl.login = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Verificar si el email existe
        const existeUsuario = await Usuario.findOne({ email });
        
        if(!existeUsuario) {
            return res.status(400).json({
                message: 'El email no existe',
            });
        }


        // Verificar la contraseña
        const contraseñaValido = bcrypt.compareSync(contraseña, existeUsuario.contraseña);

        if(!contraseñaValido) {
            return res.status(400).json({
                message: 'La contraseña no es válida',
            });
        }

        // Generar el JWT
        const token = await generarJWT(existeUsuario.id)

        res.json({
            message: 'Login correcto',
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al iniciar sesión',
        });
    }
}






module.exports = authCtrl;
const usuarioCtrl = {};
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

// Controlador para crear nuevo usuario
usuarioCtrl.crearUsuario = async (req, res) => {
    const { nombre, apellido, telefono, email, fecha_nac, contraseña } = req.body;

    try {
        // Se verifica si el usuario ya existe
        const existeUsuario = await Usuario.findOne({
            where: {
                email
            }
        });


        if (existeUsuario) {
            throw ({ // throw siempre debe ejecutarse dentro de un try catch
                status: 400,
                message: 'El usuario ya existe',
            })
        };

        const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            telefono,
            email,
            fecha_nac,
            contraseña,
        });

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        nuevoUsuario.contraseña = await bcrypt.hash(contraseña, salt);

        // Guardar usuario en la base de datos
        const usuarioCreado = await nuevoUsuario.save();

        if (!usuarioCreado) {
            throw ({
                message: 'Error al crear el usuario',
            })
        }

        // Se retorna la respuesta al cliente
        return res.status(201).json({
            message: 'Usuario creado exitosamente',
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al crear el usuario',
        });
    }
};



module.exports = usuarioCtrl;
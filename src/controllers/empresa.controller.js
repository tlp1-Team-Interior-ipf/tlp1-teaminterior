const empresaCtrl = {};
const bcrypt = require('bcrypt');
const empresa = require('../models/empresa');

// Controlador para crear nuevo empresa
empresaCtrl.crearempresa = async (req, res) => {
    const { nombre, CUIT, telefono, email, contraseña } = req.body;

    try {
        // Se verifica si el empresa ya existe
        const existeempresa = await empresa.findOne({
            where: {
                email
            }
        });


        if (existeempresa) {
            throw ({ // throw siempre debe ejecutarse dentro de un try catch
                status: 400,
                message: 'La empresa ya existe',
            })
        };

        const nuevaempresa = new empresa({
            nombre,
            CUIT,
            telefono,
            email,
            contraseña,
        });

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        nuevaempresa.contraseña = await bcrypt.hash(contraseña, salt);

        // Guardar empresa en la base de datos
        const empresaCreado = await nuevaempresa.save();

        if (!empresaCreado) {
            throw ({
                message: 'Error al crear la empresa',
            })
        }

        // Se retorna la respuesta al cliente
        return res.status(201).json({
            message: 'empresa creada exitosamente',
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al crear la empresa',
        });
    }
};



module.exports = empresaCtrl;
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();


const { sequelize } = require('./db');

const usuariosModel = require('./src/models/usuario');

sequelize.authenticate()
    .then(() => console.log('Conexión a base de datos exitosa'))
    .catch((error) => console.log('Error al conectar a base de datos', error));



const empresasModel = require('./src/models/empresa');

sequelize.authenticate()
    .then(() => console.log('Conexión a base de datos exitosa'))
    .catch((error) => console.log('Error al conectar a base de datos', error));


require('ejs');



const port = process.env.PORT || 6000;


const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');

usuariosModel.sync()
    .then(() => console.log('Tabla "usuarios" creada en la base de datos'))
    .catch((error) => console.log('Error al crear la tabla "usuarios"', error));


empresasModel.sync()
    .then(() => console.log('Tabla "empresas" creada en la base de datos'))
    .catch((error) => console.log('Error al crear la tabla "empresas"', error));


app.use(require('./src/routes/index.routes'))
app.use(require('./src/routes/empresa.routes'))
app.use(require('./src/routes/usuario.routes'))


app.use((req, res, next) => {
    res.write(`<div>
        <h1>404 - Ruta no encontrada</h1>
        <hr>
        <p>La pagina que intentas buscar no existe</p>
        <p>Redireccionando a la página de inicio...</p>
        <script>
        (
          () => setTimeout(() => {
            window.location.href='http://localhost:${port}/';
           }, 3000)           
        )();
        </script>
    </h1>`)
});


app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));
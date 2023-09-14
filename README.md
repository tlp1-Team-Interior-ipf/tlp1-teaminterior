# Team Interior
# Proyecto Final de TLP1: "tuRemo"

La problemática elegida fue la de la dificultad en el acceso a la información y la solicitud para taxis y/o remises en la ciudad de Formosa.
Ha pasado que los contactos obtenidos para los remises son antiguos, están ocupados o no se consiguen unidades circulando en las calles, representando una gran dificultad para el cliente consumidor del servicio.
Por ende se intentaría facilitar esta tarea mediante el desarrollo de un software que sirva de intermediario entre el cliente y al móvil a solicitar.




## Installation

To install the necessary dependencies, follow these steps:

Clone the repository using Git:

   ```bash
   git clone https://github.com/tlp1-Team-Interior-ipf/tlp1-teaminterior.git
   ```	

Navigate to the server folder:
```bash
cd server
```

Then, run the following command to install the dependencies:

```bash
npm install
```

## Configuration

Before running the server, make sure to configure the following environment variables in a `.env` file:

```bash
PORT=         # Port for the server to listen on
DB_NAME=      # Database name
DB_USER=      # Database username
DB_PASSWORD=  # Database password
DB_HOST=      # Database host
DB_PORT=      # Database port
DB_DIALECT=   # Database dialect (e.g., 'mysql', 'postgres', 'sqlite')
SECRET_KEY=   # confidential key
```

## Running the Server

To start the server, use the following command:

```bash
npm run start
```

## Running in Development Mode

For development purposes, you can run the server with auto-reloading using:

```bash
npm run dev
```
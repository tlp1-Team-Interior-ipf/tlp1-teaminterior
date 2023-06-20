
const formLogin = document.getElementById('formulario');

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const contraseña = document.getElementById('contraseña').value;

    const response = await fetch('http://localhost:3000/registro/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, contraseña }),
    });


    if (!response.ok) {
        const { message } = await response.json();
        return Swal.fire('Error', message, 'error');
    }

    const { message, token } = await response.json();
    Swal.fire('Correcto', message, 'success');

    // Se almacena el token en el local storage
    localStorage.setItem('token', token);

    // Redireccionar a la vista de tareas
    setTimeout(() => {
        window.location.href = '/menu';
    }, 2000);

});




const NuevoUsuario = document.querySelector('#formulario');

NuevoUsuario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const contraseña = document.querySelector('#contraseña').value;
    const confirmcontraseña = document.querySelector('#confirmcontraseña').value;
    const fecha_nac = document.querySelector('#fecha_nac').value;

    if (contraseña !== confirmcontraseña) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las contraseñas no coinciden',
        });
        return;
    }

    const response = await fetch('http://localhost:3000/registro/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre,
            apellido,
            email,
            telefono,
            contraseña,
            fecha_nac,
        }),
    });

    const respToJson = await response.json();
    
    if(response.status !== 201 && response.status !== 200) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: respToJson.message,
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Usuario creado',
        text: respToJson.message,
    });

    console.log(respToJson.message);

    formNuevoUsuario.reset();

    setTimeout(() => {
        window.location.href = '/login/usuario';
    }, 2000);

});
    
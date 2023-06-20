
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


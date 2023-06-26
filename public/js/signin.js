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

  try {
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

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const respToJson = await response.json();

    Swal.fire({
      icon: 'success',
      title: 'Usuario creado',
      text: respToJson.message,
    });

    console.log(respToJson.message);

    NuevoUsuario.reset();

    setTimeout(() => {
      window.location.href = '/login/usuario';
    }, 2000);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
  }
});

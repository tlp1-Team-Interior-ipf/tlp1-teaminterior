let botones = document.querySelectorAll(".btn-outline-secondary");

function mostrarInformacion(information) {
  Swal.fire({
    title: 'Información del chofer',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    html: `
      <div class="card-body">
        <h5>Información del chofer</h5>
        <p>${information.nombre}</p>
        <p>${information.apellido}</p>
        <p>${information.edad}</p>
        <p>${information.sexo}</p>
        <p>${information.ciudad}</p>
        <p>${information.direccion}</p>
      </div>
    `
  });
}

botones.forEach(function(boton) {
  boton.addEventListener("click", function() {
    const information = {
      nombre: "Juan",
      apellido: "Perez",
      edad: "22",
      sexo: "M",
      ciudad: "Madrid",
      direccion: "Calle 123",
    };

    mostrarInformacion(information);
  });
});

document.getElementById('registroForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const usuario = document.getElementById('usuario').value.trim();
  const email = document.getElementById('email').value.trim();
  const clave = document.getElementById('clave').value;
  const reclave = document.getElementById('reclave').value;
  const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);

  const errores = [];

  if (!nombre || !usuario || !email || !clave || !reclave || !fechaNacimiento) {
    errores.push("Todos los campos obligatorios deben estar completos.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errores.push("El correo electrónico no es válido.");
  }

  if (clave !== reclave) {
    errores.push("Las contraseñas no coinciden.");
  }

  if (clave.length < 6 || clave.length > 18 || !/[A-Z]/.test(clave) || !/\d/.test(clave)) {
    errores.push("La contraseña debe tener entre 6 y 18 caracteres, al menos una mayúscula y un número.");
  }

    if (!fechaNacimiento || isNaN(fechaNacimiento.getTime())) {
    errores.push("Debes ingresar una fecha de nacimiento válida.");
    } else {
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 13) {
        errores.push("Debes tener al menos 13 años para registrarte.");
    }
    }


    if (errores.length > 0) {
    alert(errores.join("\n"));
    } else {
    const usuario = document.getElementById('usuario').value.trim();
    localStorage.setItem('usuarioRegistrado', usuario);  
    alert("Registro exitoso");
    window.location.href = "index.html";  
    }

});

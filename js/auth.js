/* ==== CUENTA ADMIN PREDEFINIDA (hard-coded) ==== */
const ADMIN_CREDENTIALS = {
  usuario : 'admin',
  clave   : 'Admin123@',
  email   : 'admin@ludica.com'
};

(function () {
  /* Elementos del navbar */
  const liUser   = document.getElementById('nav-user');        // <li>
  const liAdmin  = document.getElementById('nav-admin');       // <li>
  const liLogin  = document.getElementById('nav-login');       // <li>
  const liLogout = document.getElementById('nav-logout');      // <li>
  const aUser    = document.getElementById('usuario-header');  // <a>

  /* Sesión guardada */
  const sesion = JSON.parse(localStorage.getItem('sesionActiva') || 'null');

  /* === Pintar navbar === */
  if (sesion) {
    // Ocultar "Iniciar sesión", mostrar "Salir" y nombre
    liLogin && liLogin.classList.add('d-none');
    liLogout && liLogout.classList.remove('d-none');
    liUser  && liUser .classList.remove('d-none');

    // Rellenar texto del enlace al perfil
    if (aUser) {
      aUser.innerHTML = `&#128100; ${sesion.usuario}`; // 👤 (unicode)
      // Si el HTML aún era <span>, lo convertimos a <a> al vuelo
      if (aUser.tagName !== 'A') {
        const link = document.createElement('a');
        link.className = 'nav-link';
        link.id   = 'usuario-header';
        link.href = 'profile.html';
        link.innerHTML = `&#128100; ${sesion.usuario}`;
        aUser.replaceWith(link);
      }
    }

    // Mostrar "Panel Admin" sólo si corresponde
    if (sesion.rol === 'admin' && liAdmin) {
      liAdmin.classList.remove('d-none');
    }
  }

  /* === API global === */
  window.cerrarSesion = () => {
    localStorage.removeItem('sesionActiva');
    location.href = 'index.html';
  };

  window.requiereAdmin = () => {
    if (!sesion || sesion.rol !== 'admin') location.href = 'index.html';
  };

  window.requiereLogin = () => {
    if (!sesion) location.href = 'login.html';
    return sesion;
  };
})();

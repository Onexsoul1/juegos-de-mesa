import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente del panel de administración.
 * Valida que el usuario tenga rol de administrador antes de permitir el acceso.
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(private router: Router) {}

  /**
   * Hook de inicialización.
   * Verifica que el usuario sea administrador al cargar la vista.
   */
  ngOnInit(): void {
    this.requiereAdmin();
  }

  /**
   * Verifica que exista una sesión activa y que el rol del usuario sea 'admin'.
   * Si no cumple, redirige automáticamente al login o al home.
   * También actualiza el nombre del usuario en el navbar.
   */
  requiereAdmin(): void {
    const sesionRaw = localStorage.getItem('sesion');
    if (!sesionRaw) {
      this.router.navigate(['/login']);
      return;
    }

    const sesion = JSON.parse(sesionRaw);
    if (sesion.rol !== 'admin') {
      this.router.navigate(['/']);
      return;
    }

    const usuarioHeader = document.getElementById('usuario-header');
    const navUser = document.getElementById('nav-user');

    if (usuarioHeader && navUser) {
      usuarioHeader.innerHTML = `👤 ${sesion.usuario}`;
      navUser.classList.remove('d-none');
    }
  }

  /**
   * Cierra la sesión eliminando los datos almacenados y redirige al login.
   */
  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.router.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/**
 * Componente de la vista de juegos cooperativos.
 * Gestiona el comportamiento dinámico del navbar según la sesión activa.
 */
@Component({
  selector: 'app-cooperativos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cooperativos.html',
  styleUrls: ['./cooperativos.css']
})
export class CooperativosComponent implements OnInit {

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento para navegación.
   */
  constructor(private router: Router) {}

  /**
   * Hook de inicialización.
   * Se ejecuta al cargar el componente y actualiza el navbar.
   */
  ngOnInit(): void {
    this.actualizarNavbar();
  }

  /**
   * Actualiza la visibilidad de los elementos del navbar según el estado de sesión almacenado en localStorage.
   * - Oculta/activa botones según si hay usuario logueado.
   * - Muestra el nombre del usuario conectado.
   * - Muestra acceso de administrador si corresponde.
   */
  actualizarNavbar(): void {
    const sesionRaw = localStorage.getItem('sesion');
    const navAdmin = document.getElementById('nav-admin');
    const navUser = document.getElementById('nav-user');
    const navLogin = document.getElementById('nav-login');
    const navLogout = document.getElementById('nav-logout');
    const usuarioHeader = document.getElementById('usuario-header');

    if (sesionRaw) {
      const sesion = JSON.parse(sesionRaw);
      if (navLogin) navLogin.classList.add('d-none');
      if (navLogout) navLogout.classList.remove('d-none');
      if (navUser && usuarioHeader) {
        navUser.classList.remove('d-none');
        usuarioHeader.textContent = `👤 ${sesion.usuario}`;
      }
      if (sesion.rol === 'admin' && navAdmin) {
        navAdmin.classList.remove('d-none');
      }
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/**
 * Componente de la vista de juegos familiares.
 * Gestiona el navbar dinámico según el estado de la sesión.
 */
@Component({
  selector: 'app-familiares',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './familiares.html',
  styleUrls: ['./familiares.css']
})
export class FamiliaresComponent implements OnInit {

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(private router: Router) {}

  /**
   * Hook de inicialización.
   * Llama a la actualización del navbar según la sesión almacenada.
   */
  ngOnInit(): void {
    this.actualizarNavbar();
  }

  /**
   * Actualiza los elementos del navbar dinámicamente:
   * - Muestra u oculta botones según el rol y si hay sesión activa.
   * - Muestra el nombre de usuario.
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
   * Cierra la sesión eliminando el registro en localStorage y redirige al login.
   */
  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.router.navigate(['/login']);
  }
}

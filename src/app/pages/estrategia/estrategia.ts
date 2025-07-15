import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/**
 * Componente de la vista de juegos de estrategia.
 * Controla el navbar dinámico según la sesión activa.
 */
@Component({
  selector: 'app-estrategia',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './estrategia.html',
  styleUrls: ['./estrategia.css']
})
export class EstrategiaComponent implements OnInit {

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(private router: Router) {}

  /**
   * Hook que se ejecuta al inicializar el componente.
   * Llama a la actualización del navbar según la sesión almacenada.
   */
  ngOnInit(): void {
    this.actualizarNavbar();
  }

  /**
   * Actualiza los elementos del navbar de acuerdo al estado de sesión:
   * - Oculta o muestra enlaces según si hay usuario autenticado.
   * - Muestra el nombre del usuario activo.
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
   * Elimina la sesión activa y redirige al login.
   */
  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.router.navigate(['/login']);
  }
}

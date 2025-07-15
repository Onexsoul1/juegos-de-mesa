import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/**
 * Componente de la vista de juegos infantiles.
 * Gestiona la actualización del estado de la barra de navegación según la sesión almacenada.
 */
@Component({
  selector: 'app-infantiles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './infantiles.html',
  styleUrls: ['./infantiles.css']
})
export class InfantilesComponent implements OnInit {

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento para navegar entre páginas.
   */
  constructor(private router: Router) {}

  /**
   * Método de inicialización que actualiza la barra de navegación
   * al cargar el componente.
   */
  ngOnInit(): void {
    this.actualizarNavbar();
  }

  /**
   * Actualiza dinámicamente la barra de navegación en base a la sesión activa en localStorage.
   * Muestra u oculta elementos según el rol del usuario.
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
   * Cierra la sesión activa eliminando los datos almacenados
   * y redirigiendo al usuario a la página de login.
   */
  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.router.navigate(['/login']);
  }
}

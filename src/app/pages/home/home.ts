// src/app/pages/home/home.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
/**
 * Componente principal de la página de inicio.
 * Muestra la navegación y controla la información del usuario autenticado.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  /**
   * Nombre del usuario autenticado. Nulo si no hay sesión activa.
   */
  usuario: string | null = null;

  /**
   * Indica si el usuario tiene rol de administrador.
   */
  esAdmin: boolean = false;

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento.
   */
  constructor(private router: Router,private productosService: ProductosService) {}
  productos: any[] = [];
  /**
   * Se ejecuta al inicializar el componente.
   * Recupera la sesión almacenada en localStorage y configura los datos de usuario.
   */
  ngOnInit(): void {
    const sesionRaw = localStorage.getItem('sesion');
    if (sesionRaw) {
      const sesion = JSON.parse(sesionRaw);
      this.usuario = sesion.usuario;
      this.esAdmin = sesion.rol === 'admin';
    }

    console.log('ngOnInit() de HomeComponent ejecutado');
    this.productosService.cargarDatos();

    this.productosService.productos$.subscribe(data => {
      console.log('PRODUCTOS:', data);
      this.productos = data;
    });
  }

  /**
   * Elimina la sesión activa y redirige al login.
   */
  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.router.navigate(['/login']);
  }
}

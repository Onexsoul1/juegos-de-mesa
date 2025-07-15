import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Componente responsable de gestionar el inicio de sesión de los usuarios.
 * Permite iniciar sesión como usuario estándar o como administrador (con credenciales fijas).
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  /**
   * Nombre de usuario ingresado en el formulario.
   */
  usuario: string = '';

  /**
   * Contraseña ingresada en el formulario.
   */
  clave: string = '';

  /**
   * Correo electrónico opcional ingresado por el usuario demo.
   */
  correoDemo: string = '';

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento para redirigir al usuario tras el login.
   */
  constructor(private router: Router) {}

  /**
   * Método de inicialización del componente.
   * Actualmente no contiene lógica, pero puede emplearse para limpiar sesiones anteriores.
   */
  ngOnInit(): void {
    // Nada por ahora
  }

  /**
   * Realiza el inicio de sesión validando credenciales.
   * Si el usuario es "admin" y la clave es "123", se asigna el rol de administrador.
   * En otro caso, se considera usuario estándar.
   * @param event Evento de envío de formulario para prevenir comportamiento por defecto.
   */
  iniciarSesion(event: Event): void {
    event.preventDefault();

    const user = this.usuario.trim();
    const pass = this.clave;

    const ADMIN_CREDENTIALS = {
      usuario: 'admin',
      clave: '123',
      email: 'admin@ludica.cl'
    };

    const esAdmin =
      user.toLowerCase() === ADMIN_CREDENTIALS.usuario &&
      pass === ADMIN_CREDENTIALS.clave;

    const sesion = {
      usuario: user,
      rol: esAdmin ? 'admin' : 'usuario',
      email: esAdmin ? ADMIN_CREDENTIALS.email : (this.correoDemo.trim() || '')
    };

    localStorage.setItem('sesion', JSON.stringify(sesion));
    this.router.navigate(['/']);
  }
}

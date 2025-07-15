import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  usuario: string = '';
  rol: string = '';
  email: string = '';
  nuevaClave: string = '';
  repClave: string = '';
  msgOk: boolean = false;
  esAdmin: boolean = false; 

  private regexClave = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const sesionRaw = localStorage.getItem('sesionActiva');
    if (!sesionRaw) {
      this.router.navigate(['/login']);
      return;
    }

    const sesion = JSON.parse(sesionRaw);
    this.usuario = sesion.usuario;
    this.rol = sesion.rol;
    this.email = sesion.email || '';
  }

  guardarClave(): void {
    if (!this.regexClave.test(this.nuevaClave)) {
      alert('Contraseña insegura. Usa 8-20 caracteres con may/min/número/símbolo.');
      return;
    }

    if (this.nuevaClave !== this.repClave) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const sesion = JSON.parse(localStorage.getItem('sesionActiva')!);
    sesion.clave = this.nuevaClave;
    localStorage.setItem('sesionActiva', JSON.stringify(sesion));
    this.msgOk = true;
    this.nuevaClave = '';
    this.repClave = '';
  }
  cerrarSesion(): void {
  localStorage.removeItem('sesion');
  this.router.navigate(['/login']);
  }
}

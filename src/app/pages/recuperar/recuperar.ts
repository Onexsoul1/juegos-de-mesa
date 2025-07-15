import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
/**
 * Componente de recuperación de contraseña.
 * Permite al usuario solicitar el envío simulado de un correo de recuperación.
 */
@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recuperar.html',
  styleUrls: ['./recuperar.css']
})
export class RecuperarComponent implements OnInit {
  formRecuperar!: FormGroup;
  enviado: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.formRecuperar = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviarRecuperacion(): void {
    if (this.formRecuperar.invalid) {
      this.formRecuperar.markAllAsTouched();
      return;
    }

    // Aquí solo se muestra un mensaje simulado
    this.enviado = true;

    // Si quieres, puedes redirigir después de unos segundos
    // setTimeout(() => this.router.navigate(['/login']), 3000);
  }
}

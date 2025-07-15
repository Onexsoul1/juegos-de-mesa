import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

/**
 * Componente de registro de usuarios.
 * Permite crear un usuario nuevo con validaciones de formulario.
 */
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent implements OnInit {
  /**
   * Indica si el registro fue exitoso y muestra el mensaje correspondiente.
   */
  msgOk: boolean = false;

  /**
   * Formulario reactivo para capturar los datos del registro.
   */
  formRegistro!: FormGroup;

  /**
   * Constructor que inyecta FormBuilder y Router.
   * @param fb FormBuilder para crear el formulario reactivo.
   * @param router Router para la navegación.
   */
  constructor(private fb: FormBuilder, private router: Router) {}

  /**
   * Inicializa el formulario con los campos y sus validaciones.
   */
  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/)
      ]],
      reclave: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: ['']
    });
  }

  /**
   * Procesa el registro del usuario validando los datos ingresados.
   * Si las contraseñas coinciden y el formulario es válido,
   * guarda el usuario en localStorage.
   */
  registrar(): void {
    if (this.formRegistro.invalid) {
      this.formRegistro.markAllAsTouched();
      return;
    }

    const clave = this.formRegistro.value.clave;
    const reclave = this.formRegistro.value.reclave;

    if (clave !== reclave) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario = {
      nombre: this.formRegistro.value.nombre,
      usuario: this.formRegistro.value.usuario,
      email: this.formRegistro.value.email,
      clave: clave,
      fechaNacimiento: this.formRegistro.value.fechaNacimiento,
      direccion: this.formRegistro.value.direccion,
      rol: 'usuario'
    };

    localStorage.setItem(`usuario_${nuevoUsuario.usuario}`, JSON.stringify(nuevoUsuario));

    this.msgOk = true;

    // Redirigir después de 1 segundo para que el usuario vea el mensaje
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }

  /**
   * Limpia el formulario y oculta el mensaje de éxito.
   */
  limpiar(): void {
    this.formRegistro.reset({
      nombre: '',
      usuario: '',
      email: '',
      clave: '',
      reclave: '',
      fechaNacimiento: '',
      direccion: ''
    });
    this.msgOk = false;
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro';
import { Router } from '@angular/router';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegistroComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con campos vacíos', () => {
    const form = component.formRegistro;
    expect(form).toBeTruthy();
    expect(form.get('nombre')?.value).toBe('');
    expect(form.get('usuario')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('clave')?.value).toBe('');
    expect(form.get('reclave')?.value).toBe('');
  });


  it('debe marcar el formulario inválido si falta información requerida', () => {
    component.formRegistro.patchValue({
      nombre: '',
      usuario: '',
      email: '',
      clave: '',
      reclave: '',
      fechaNacimiento: ''
    });
    expect(component.formRegistro.invalid).toBeTrue();
  });

  it('debe validar que el email sea incorrecto si tiene formato inválido', () => {
    const emailControl = component.formRegistro.get('email');
    emailControl?.setValue('correo_invalido');
    expect(emailControl?.invalid).toBeTrue();
  });

  it('debe validar que la contraseña cumpla con el patrón', () => {
    const claveControl = component.formRegistro.get('clave');
    claveControl?.setValue('simple');
    expect(claveControl?.invalid).toBeTrue();
    claveControl?.setValue('Compleja1!');
    expect(claveControl?.valid).toBeTrue();
  });

  it('debe mostrar alerta si las contraseñas no coinciden', () => {
    spyOn(window, 'alert');

    component.formRegistro.patchValue({
      nombre: 'Prueba',
      usuario: 'usuarioPrueba',
      email: 'prueba@mail.com',
      clave: 'Compleja1!',
      reclave: 'Distinta1!',
      fechaNacimiento: '2000-01-01'
    });

    component.registrar();

    expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');
  });

  it('debe registrar si el formulario es válido y contraseñas coinciden', () => {
    component.formRegistro.patchValue({
      nombre: 'Prueba',
      usuario: 'usuarioPrueba',
      email: 'prueba@mail.com',
      clave: 'Compleja1!',
      reclave: 'Compleja1!',
      fechaNacimiento: '2000-01-01'
    });

    component.registrar();

    expect(component.msgOk).toBeTrue();
    const stored = localStorage.getItem('usuario_usuarioPrueba');
    expect(stored).toBeTruthy();
  });

  it('debe limpiar el formulario al llamar limpiar()', () => {
    component.formRegistro.patchValue({
      nombre: 'Prueba',
      usuario: 'usuarioPrueba',
      email: 'prueba@mail.com',
      clave: 'Compleja1!',
      reclave: 'Compleja1!',
      fechaNacimiento: '2000-01-01'
    });
    component.msgOk = true;

    component.limpiar();

    expect(component.formRegistro.get('nombre')?.value).toBe('');
    expect(component.msgOk).toBeFalse();
  });

});

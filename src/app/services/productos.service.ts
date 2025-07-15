// src/app/services/productos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Define la interfaz del producto
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productosSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('HttpClient inyectado correctamente');
  }
    
  /**
   * Carga los datos desde el archivo JSON.
   */
    cargarDatos(): void {
    console.log('Llamando a cargarDatos()');
    this.http.get('assets/productos.json').subscribe({
        next: (data) => {
        console.log('PRODUCTOS DESDE JSON:', data);
        this.productosSubject.next(data as Producto[]);
        },
        error: (err) => {
        console.error('ERROR AL CARGAR JSON:', err);
        }
    });
    }


  /**
   * Devuelve los productos actuales como array.
   */
  getProductos(): Producto[] {
    return this.productosSubject.value;
  }

  /**
   * Agrega un nuevo producto.
   */
  agregarProducto(producto: Producto): void {
    const actual = this.getProductos();
    producto.id = this.generarId();
    this.productosSubject.next([...actual, producto]);
  }

  /**
   * Edita un producto existente.
   */
  editarProducto(productoEditado: Producto): void {
    const actual = this.getProductos().map(p =>
      p.id === productoEditado.id ? productoEditado : p
    );
    this.productosSubject.next(actual);
  }

  /**
   * Elimina un producto por id.
   */
  eliminarProducto(id: number): void {
    const actual = this.getProductos().filter(p => p.id !== id);
    this.productosSubject.next(actual);
  }

  /**
   * Genera un nuevo ID autoincremental.
   */
  private generarId(): number {
    const actual = this.getProductos();
    return actual.length > 0 ? Math.max(...actual.map(p => p.id)) + 1 : 1;
  }
}

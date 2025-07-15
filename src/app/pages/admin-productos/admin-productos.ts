import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService, Producto } from '../../services/productos.service';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-productos.html',
  styleUrls: ['./admin-productos.css']
})
export class AdminProductosComponent implements OnInit {
  productos: Producto[] = [];

  // Campos del formulario
  nuevoProducto: Partial<Producto> = {
    nombre: '',
    precio: 0,
    categoria: ''
  };

  editando: Producto | null = null;
  router: any;

  constructor(private productosService: ProductosService) {}
  sesion: any = null;
  ngOnInit(): void {
      const sesionRaw = localStorage.getItem('sesion');
      if (sesionRaw) {
        this.sesion = JSON.parse(sesionRaw);
      }

    this.productosService.productos$.subscribe(data => {
      this.productos = data;
    });
  }
  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.router.navigate(['/login']);
  }
  agregarProducto(): void {
    if (this.nuevoProducto.nombre && this.nuevoProducto.precio && this.nuevoProducto.categoria) {
      this.productosService.agregarProducto(this.nuevoProducto as Producto);
      this.nuevoProducto = { nombre: '', precio: 0, categoria: '' };
    }
  }

  editar(producto: Producto): void {
    this.editando = { ...producto };
  }

  guardarEdicion(): void {
    if (this.editando) {
      this.productosService.editarProducto(this.editando);
      this.editando = null;
    }
  }

  cancelarEdicion(): void {
    this.editando = null;
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productosService.eliminarProducto(id);
    }
  }
}

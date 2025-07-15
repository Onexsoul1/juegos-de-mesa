import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class IndexComponent implements OnInit {
  sesion: any = null;
  productos: any[] = [];

  constructor(private router: Router,private productosService: ProductosService) {}

  ngOnInit(): void {
    console.log('ngOnInit() de IndexComponent ejecutado');

    const sesionRaw = localStorage.getItem('sesion');
    if (sesionRaw) {
      this.sesion = JSON.parse(sesionRaw);
    }

    console.log('Invocando cargarDatos()...');
    this.productosService.cargarDatos();

    this.productosService.productos$.subscribe(data => {
      console.log('PRODUCTOS SUBSCRIBE:', data);
      this.productos = data;
    });
  }


  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.router.navigate(['/login']);
  }
}

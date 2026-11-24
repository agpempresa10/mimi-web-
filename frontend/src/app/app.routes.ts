import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'tienda', loadComponent: () => import('./pages/tienda/tienda').then(m => m.Tienda) },
  { path: 'producto/:id', loadComponent: () => import('./pages/producto/producto').then(m => m.ProductoPage) },
  { path: 'carrito', loadComponent: () => import('./pages/carrito/carrito').then(m => m.Carrito) },
  { path: '**', redirectTo: '' },
];

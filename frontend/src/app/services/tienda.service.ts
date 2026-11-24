import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Color { nombre: string; hex: string; }

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  precioAntes: number | null;
  descripcion: string;
  colores: Color[];
  tallas: string[];
  nuevo: boolean;
  destacado: boolean;
  tonoA: string;
  tonoB: string;
}

export interface TiendaInfo {
  nombre: string;
  lema: string;
  ciudad: string;
  email: string;
  telefono: string;
  envioGratisDesde: number;
  categorias: string[];
}

@Injectable({ providedIn: 'root' })
export class TiendaService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/api`;

  info(): Observable<TiendaInfo> {
    return this.http.get<TiendaInfo>(`${this.api}/tienda`);
  }

  productos(categoria?: string, destacados = false): Observable<Producto[]> {
    const params: Record<string, string> = {};
    if (categoria) params['categoria'] = categoria;
    if (destacados) params['destacados'] = 'true';
    return this.http.get<Producto[]>(`${this.api}/productos`, { params });
  }

  producto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.api}/productos/${id}`);
  }
}

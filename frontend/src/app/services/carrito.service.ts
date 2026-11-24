import { Injectable, computed, signal } from '@angular/core';

export interface LineaCarrito {
  productoId: number;
  nombre: string;
  precio: number;
  talla: string;
  color: string;
  colorHex: string;
  tonoA: string;
  tonoB: string;
  cantidad: number;
}

const CLAVE = 'myc-carrito';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  readonly lineas = signal<LineaCarrito[]>(this.cargar());
  readonly cantidad = computed(() => this.lineas().reduce((t, l) => t + l.cantidad, 0));
  readonly total = computed(() => this.lineas().reduce((t, l) => t + l.precio * l.cantidad, 0));

  anadir(nueva: Omit<LineaCarrito, 'cantidad'>) {
    this.lineas.update(ls => {
      const i = ls.findIndex(l => this.misma(l, nueva));
      if (i >= 0) return ls.map((l, j) => (j === i ? { ...l, cantidad: l.cantidad + 1 } : l));
      return [...ls, { ...nueva, cantidad: 1 }];
    });
    this.guardar();
  }

  cambiarCantidad(linea: LineaCarrito, delta: number) {
    this.lineas.update(ls =>
      ls.map(l => (this.misma(l, linea) ? { ...l, cantidad: Math.max(1, l.cantidad + delta) } : l)));
    this.guardar();
  }

  quitar(linea: LineaCarrito) {
    this.lineas.update(ls => ls.filter(l => !this.misma(l, linea)));
    this.guardar();
  }

  vaciar() {
    this.lineas.set([]);
    this.guardar();
  }

  private misma(a: LineaCarrito | Omit<LineaCarrito, 'cantidad'>, b: LineaCarrito | Omit<LineaCarrito, 'cantidad'>) {
    return a.productoId === b.productoId && a.talla === b.talla && a.color === b.color;
  }

  private cargar(): LineaCarrito[] {
    try {
      return JSON.parse(localStorage.getItem(CLAVE) ?? '[]');
    } catch {
      return [];
    }
  }

  private guardar() {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(this.lineas()));
    } catch { /* sin almacenamiento: el carrito vive solo en memoria */ }
  }
}

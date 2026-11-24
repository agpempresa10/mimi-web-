import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Producto, TiendaService } from '../../services/tienda.service';
import { ProductoCard } from '../../components/producto-card/producto-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductoCard],
  template: `
    <!-- Hero -->
    <section class="relative bg-stone overflow-hidden">
      <div class="max-w-7xl mx-auto px-5 grid md:grid-cols-2 items-center gap-8 min-h-[78vh] py-14">
        <div>
          <p class="uppercase tracking-[0.18em] sm:tracking-[0.3em] text-[11px] sm:text-xs text-ink-soft">Colección otoño · invierno</p>
          <h1 class="mt-5 text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
            Ropa para todos<br>los días, <em class="text-pine">hecha<br>para durar.</em>
          </h1>
          <p class="mt-6 max-w-md text-ink-soft">Básicos de calidad, cortes cómodos y tejidos que mejoran con el uso. Sin prisas, sin tendencias pasajeras.</p>
          <div class="mt-9 flex flex-wrap gap-4">
            <a routerLink="/tienda" class="btn btn-dark">Ver la tienda</a>
            <a routerLink="/tienda" [queryParams]="{ categoria: 'Vestidos' }" class="btn btn-outline">Vestidos</a>
          </div>
        </div>
        <div class="relative h-[420px] md:h-[560px]">
          <div class="absolute inset-0 md:left-10" style="background:linear-gradient(160deg,#b7c4a8,#6f8566)"></div>
          <div class="absolute -bottom-6 -left-2 md:left-0 w-44 h-56 border-8 border-stone" style="background:linear-gradient(160deg,#ecc9c4,#d9a29b)"></div>
          <span class="material-symbols-outlined absolute inset-0 md:left-10 grid place-items-center text-white/50"
                style="font-size:200px; font-variation-settings:'wght' 100">checkroom</span>
        </div>
      </div>
    </section>

    <!-- Categorías -->
    <section class="max-w-7xl mx-auto px-5 mt-20">
      <h2 class="text-3xl sm:text-4xl text-center">Compra por categoría</h2>
      <div class="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
        @for (c of categorias; track c.nombre) {
          <a routerLink="/tienda" [queryParams]="{ categoria: c.nombre }"
             class="group relative aspect-[4/3] overflow-hidden flex items-end p-5"
             [style.background]="'linear-gradient(160deg,' + c.a + ',' + c.b + ')'">
            <span class="material-symbols-outlined absolute right-4 top-4 text-white/60 transition-transform group-hover:scale-125" style="font-size:44px">{{ c.icono }}</span>
            <span class="font-display text-2xl text-white drop-shadow">{{ c.nombre }}</span>
          </a>
        }
      </div>
    </section>

    <!-- Destacados -->
    <section class="max-w-7xl mx-auto px-5 mt-24">
      <div class="flex items-end justify-between">
        <h2 class="text-3xl sm:text-4xl">Los favoritos</h2>
        <a routerLink="/tienda" class="text-sm uppercase tracking-widest underline underline-offset-4 hover:text-pine">Ver todo</a>
      </div>
      <div class="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
        @for (p of destacados(); track p.id) {
          <app-producto-card [producto]="p" />
        }
      </div>
      @if (error()) {
        <p class="text-center text-ink-soft mt-8">No se pudo cargar el catálogo. ¿Está arrancado el backend (puerto 8090)?</p>
      }
    </section>

    <!-- Valores -->
    <section class="max-w-7xl mx-auto px-5 mt-24 grid sm:grid-cols-3 gap-8 text-center">
      @for (v of valores; track v.titulo) {
        <div>
          <span class="material-symbols-outlined text-pine" style="font-size:40px">{{ v.icono }}</span>
          <h3 class="mt-3 text-xl">{{ v.titulo }}</h3>
          <p class="mt-2 text-sm text-ink-soft max-w-xs mx-auto">{{ v.texto }}</p>
        </div>
      }
    </section>
  `
})
export class Home implements OnInit {
  private tienda = inject(TiendaService);
  destacados = signal<Producto[]>([]);
  error = signal(false);

  categorias = [
    { nombre: 'Camisetas', icono: 'dry_cleaning', a: '#d6cdbb', b: '#b3a68a' },
    { nombre: 'Camisas', icono: 'checkroom', a: '#b3c4d6', b: '#8aa3bd' },
    { nombre: 'Pantalones', icono: 'straighten', a: '#c9b48f', b: '#a38c63' },
    { nombre: 'Sudaderas', icono: 'ac_unit', a: '#b9b9b3', b: '#8e8e87' },
    { nombre: 'Vestidos', icono: 'styler', a: '#a9b38d', b: '#7f8a64' },
    { nombre: 'Accesorios', icono: 'watch', a: '#b08a67', b: '#7d5c3f' },
  ];

  valores = [
    { icono: 'local_shipping', titulo: 'Envío gratis', texto: 'En pedidos a partir de 50 €. Entrega en 24-72 horas.' },
    { icono: 'autorenew', titulo: '30 días para cambiar', texto: 'Si no te encaja, lo cambias o te devolvemos el dinero.' },
    { icono: 'eco', titulo: 'Tejidos de calidad', texto: 'Algodón, lino y materiales pensados para durar años.' },
  ];

  ngOnInit() {
    this.tienda.productos(undefined, true).subscribe({
      next: p => this.destacados.set(p.slice(0, 4)),
      error: () => this.error.set(true),
    });
  }
}

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
      <div class="max-w-7xl mx-auto px-5 grid md:grid-cols-2 items-center gap-10 min-h-[76vh] py-14">
        <div>
          <p class="font-script text-3xl text-pine">MiMi &amp; MiMi Kids</p>
          <h1 class="mt-3 text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
            Moda para<br><em class="text-pine">todas las tallas</em>
          </h1>
          <p class="mt-6 max-w-md text-ink-soft">Ropa, calzado, bolsos y complementos para ti, y ropita para los peques. Te lo enviamos a casa en 24/48 horas.</p>
          <div class="mt-9 flex flex-wrap gap-4">
            <a routerLink="/tienda" class="btn btn-dark">Ver novedades</a>
            <a routerLink="/tienda" [queryParams]="{ categoria: 'MiMi Kids' }" class="btn btn-outline">MiMi Kids</a>
          </div>
        </div>
        <div class="relative h-[400px] md:h-[540px] grid place-items-center">
          <div class="absolute w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full border-2 border-pine/30"></div>
          <div class="absolute w-[300px] h-[300px] md:w-[410px] md:h-[410px] rounded-full overflow-hidden"
               style="background:linear-gradient(160deg,#f3cdd8,#d98fa7)">
            <span class="material-symbols-outlined absolute inset-0 grid place-items-center text-white/60"
                  style="font-size:180px; font-variation-settings:'wght' 100">checkroom</span>
          </div>
          @for (f of flores; track $index) {
            <span class="absolute text-pine/60" [style.left]="f.x" [style.top]="f.y" [style.font-size]="f.s">✿</span>
          }
        </div>
      </div>
    </section>

    <!-- Categorías -->
    <section class="max-w-7xl mx-auto px-5 mt-20">
      <p class="font-script text-2xl text-pine text-center">Encuentra lo tuyo</p>
      <h2 class="text-3xl sm:text-4xl text-center mt-1">Compra por categoría</h2>
      <div class="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
        @for (c of categorias; track c.nombre) {
          <a routerLink="/tienda" [queryParams]="{ categoria: c.nombre }"
             class="group relative aspect-[4/3] overflow-hidden rounded-2xl flex items-end p-5"
             [style.background]="'linear-gradient(160deg,' + c.a + ',' + c.b + ')'">
            <span class="material-symbols-outlined absolute right-4 top-4 text-white/70 transition-transform group-hover:scale-125" style="font-size:44px">{{ c.icono }}</span>
            <span class="font-display text-2xl text-white drop-shadow">{{ c.nombre }}</span>
          </a>
        }
      </div>
    </section>

    <!-- Destacados -->
    <section class="max-w-7xl mx-auto px-5 mt-24">
      <div class="flex items-end justify-between">
        <div>
          <p class="font-script text-2xl text-pine">Recién llegado a la tienda</p>
          <h2 class="text-3xl sm:text-4xl mt-1">Nuestros favoritos</h2>
        </div>
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

    <!-- MiMi Kids -->
    <section class="max-w-7xl mx-auto px-5 mt-24">
      <div class="rounded-3xl overflow-hidden grid md:grid-cols-2" style="background:linear-gradient(135deg,#e7efe0,#f6e6e6)">
        <div class="p-10 md:p-14">
          <p class="font-script text-3xl text-pine">MiMi Kids</p>
          <h2 class="text-3xl sm:text-4xl mt-2">Para los más peques de la casa</h2>
          <p class="mt-4 text-ink-soft max-w-md">Pijamas, sudaderas, conjuntos y zapatitos. Cómodos, bonitos y listos para jugar.</p>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'MiMi Kids' }" class="btn btn-dark mt-8">Ver MiMi Kids</a>
        </div>
        <div class="relative min-h-[240px] grid place-items-center">
          <span class="material-symbols-outlined text-sage/70" style="font-size:160px; font-variation-settings:'wght' 150">child_care</span>
        </div>
      </div>
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

    <!-- Instagram -->
    <section class="max-w-3xl mx-auto px-5 mt-24 text-center">
      <p class="font-script text-3xl text-pine">Síguenos</p>
      <h2 class="text-3xl sm:text-4xl mt-1">&#64;mimi_modaycomplementos</h2>
      <p class="mt-4 text-ink-soft">Cada semana subimos lo nuevo que llega a la tienda. Pregúntanos por privado tallas y disponibilidad.</p>
      <a href="https://www.instagram.com/mimi_modaycomplementos/" target="_blank" rel="noopener" class="btn btn-outline mt-8">Ir a Instagram</a>
    </section>
  `
})
export class Home implements OnInit {
  private tienda = inject(TiendaService);
  destacados = signal<Producto[]>([]);
  error = signal(false);

  flores = [
    { x: '8%', y: '14%', s: '34px' }, { x: '82%', y: '10%', s: '26px' },
    { x: '88%', y: '72%', s: '38px' }, { x: '6%', y: '78%', s: '24px' },
  ];

  categorias = [
    { nombre: 'Ropa', icono: 'checkroom', a: '#f3cdd8', b: '#d98fa7' },
    { nombre: 'Abrigos y chaquetas', icono: 'dry_cleaning', a: '#d9c3b5', b: '#a88470' },
    { nombre: 'Pijamas', icono: 'bedtime', a: '#e6d7ee', b: '#b89cc8' },
    { nombre: 'Calzado', icono: 'steps', a: '#ecd9c6', b: '#c9a37d' },
    { nombre: 'Bolsos', icono: 'shopping_bag', a: '#e9c2c2', b: '#c07f86' },
    { nombre: 'MiMi Kids', icono: 'child_care', a: '#d6e2cb', b: '#9cae8a' },
  ];

  valores = [
    { icono: 'local_shipping', titulo: 'Envíos 24/48 h', texto: 'A toda la península por solo 4,95 €.' },
    { icono: 'credit_card', titulo: 'Paga como quieras', texto: 'Tarjeta, Bizum o transferencia.' },
    { icono: 'favorite', titulo: 'Todas las tallas', texto: 'Moda pensada para todos los cuerpos, de la S a la 3XL.' },
  ];

  ngOnInit() {
    this.tienda.productos(undefined, true).subscribe({
      next: p => this.destacados.set(p.slice(0, 4)),
      error: () => this.error.set(true),
    });
  }
}

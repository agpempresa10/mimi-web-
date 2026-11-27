import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Color, Producto, TiendaService } from '../../services/tienda.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-producto-page',
  imports: [RouterLink, CurrencyPipe],
  template: `
    @if (producto(); as p) {
      <section class="max-w-7xl mx-auto px-5 pt-10">
        <a routerLink="/tienda" [queryParams]="{ categoria: p.categoria }" class="text-xs uppercase tracking-widest text-ink-soft hover:text-ink">
          ← {{ p.categoria }}
        </a>

        <div class="mt-6 grid md:grid-cols-2 gap-10 lg:gap-16">
          <div class="relative aspect-[3/4] overflow-hidden rounded-2xl"
               [style.background]="'linear-gradient(160deg,' + p.tonoA + ',' + p.tonoB + ')'">
            <span class="material-symbols-outlined absolute inset-0 grid place-items-center text-white/50"
                  style="font-size:180px; font-variation-settings:'wght' 100">checkroom</span>
          </div>

          <div class="md:py-6">
            @if (p.nuevo) { <p class="text-xs uppercase tracking-widest text-pine">Novedad</p> }
            <h1 class="text-4xl sm:text-5xl mt-1">{{ p.nombre }}</h1>
            <p class="mt-4 text-2xl">
              <span [class.text-clay]="p.precioAntes">{{ p.precio | currency: 'EUR' : 'symbol' : '1.2-2' }}</span>
              @if (p.precioAntes) {
                <span class="ml-3 text-base text-ink-soft line-through">{{ p.precioAntes | currency: 'EUR' : 'symbol' : '1.2-2' }}</span>
              }
            </p>
            <p class="mt-6 text-ink-soft max-w-lg">{{ p.descripcion }}</p>

            <p class="mt-8 text-xs uppercase tracking-widest">Color: <span class="text-ink-soft">{{ color()?.nombre }}</span></p>
            <div class="mt-3 flex gap-3">
              @for (c of p.colores; track c.nombre) {
                <button (click)="color.set(c)" [title]="c.nombre"
                        class="w-9 h-9 rounded-full border-2 transition"
                        [class]="color()?.nombre === c.nombre ? 'border-ink ring-2 ring-offset-2 ring-offset-paper ring-ink/20' : 'border-ink/20'"
                        [style.background]="c.hex"></button>
              }
            </div>

            <p class="mt-8 text-xs uppercase tracking-widest">Talla</p>
            <div class="mt-3 flex flex-wrap gap-2">
              @for (t of p.tallas; track t) {
                <button (click)="talla.set(t)" class="min-w-12 px-3 h-11 border text-sm transition"
                        [class]="talla() === t ? 'bg-pine text-white border-pine' : 'border-ink/30 hover:border-ink'">{{ t }}</button>
              }
            </div>
            @if (faltaTalla()) {
              <p class="mt-2 text-sm text-clay">Elige una talla para continuar.</p>
            }

            <button (click)="anadir(p)" class="btn btn-dark w-full mt-8">Añadir al carrito</button>
            @if (anadido()) {
              <p class="mt-3 text-sm text-pine">Añadido al carrito ·
                <a routerLink="/carrito" class="underline">Ver carrito</a></p>
            }

            <ul class="mt-10 text-sm text-ink-soft space-y-2 border-t border-stone pt-6">
              <li>• Envíos 24/48 h a península: 4,95 €</li>
              <li>• Pago con tarjeta, Bizum o transferencia</li>
              <li>• ¿Dudas con la talla? Escríbenos por <a href="https://www.instagram.com/mimi_modaycomplementos/" target="_blank" rel="noopener" class="underline">Instagram</a></li>
            </ul>
          </div>
        </div>
      </section>
    } @else if (noExiste()) {
      <p class="text-center py-32 text-ink-soft">Este producto no existe. <a routerLink="/tienda" class="underline">Volver a la tienda</a></p>
    }
  `
})
export class ProductoPage implements OnInit {
  private tienda = inject(TiendaService);
  private route = inject(ActivatedRoute);
  private carrito = inject(CarritoService);

  producto = signal<Producto | null>(null);
  noExiste = signal(false);
  color = signal<Color | null>(null);
  talla = signal<string | null>(null);
  faltaTalla = signal(false);
  anadido = signal(false);

  ngOnInit() {
    this.route.paramMap.subscribe(m => {
      this.producto.set(null);
      this.noExiste.set(false);
      this.talla.set(null);
      this.anadido.set(false);
      this.tienda.producto(Number(m.get('id'))).subscribe({
        next: p => {
          this.producto.set(p);
          this.color.set(p.colores[0] ?? null);
          if (p.tallas.length === 1) this.talla.set(p.tallas[0]);
        },
        error: () => this.noExiste.set(true),
      });
    });
  }

  anadir(p: Producto) {
    const talla = this.talla();
    const color = this.color();
    if (!talla || !color) {
      this.faltaTalla.set(true);
      return;
    }
    this.faltaTalla.set(false);
    this.carrito.anadir({
      productoId: p.id, nombre: p.nombre, precio: p.precio,
      talla, color: color.nombre, colorHex: color.hex, tonoA: p.tonoA, tonoB: p.tonoB,
    });
    this.anadido.set(true);
  }
}

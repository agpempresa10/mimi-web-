import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <section class="max-w-4xl mx-auto px-5 pt-12">
      <h1 class="text-4xl sm:text-5xl text-center">Tu carrito</h1>

      @if (carrito.lineas().length === 0) {
        <div class="text-center py-20">
          <span class="material-symbols-outlined text-ink-soft" style="font-size:56px">shopping_bag</span>
          <p class="mt-3 text-ink-soft">Tu carrito está vacío.</p>
          <a routerLink="/tienda" class="btn btn-dark mt-6">Ir a la tienda</a>
        </div>
      } @else {
        <div class="mt-10 divide-y divide-stone border-y border-stone">
          @for (l of carrito.lineas(); track l.productoId + l.talla + l.color) {
            <div class="flex gap-4 py-5 items-center">
              <a [routerLink]="['/producto', l.productoId]" class="w-20 h-28 shrink-0"
                 [style.background]="'linear-gradient(160deg,' + l.tonoA + ',' + l.tonoB + ')'"></a>
              <div class="flex-1 text-sm">
                <a [routerLink]="['/producto', l.productoId]" class="font-medium hover:underline">{{ l.nombre }}</a>
                <p class="text-ink-soft mt-1 flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full border border-ink/20" [style.background]="l.colorHex"></span>
                  {{ l.color }} · Talla {{ l.talla }}
                </p>
                <div class="mt-3 inline-flex items-center border border-ink/30">
                  <button class="w-8 h-8" (click)="carrito.cambiarCantidad(l, -1)" aria-label="Menos">−</button>
                  <span class="w-8 text-center">{{ l.cantidad }}</span>
                  <button class="w-8 h-8" (click)="carrito.cambiarCantidad(l, 1)" aria-label="Más">+</button>
                </div>
              </div>
              <div class="text-right text-sm">
                <p>{{ l.precio * l.cantidad | currency: 'EUR' : 'symbol' : '1.2-2' }}</p>
                <button class="mt-3 text-xs text-ink-soft underline hover:text-clay" (click)="carrito.quitar(l)">Quitar</button>
              </div>
            </div>
          }
        </div>

        <div class="mt-8 ml-auto max-w-sm">
          <div class="flex justify-between text-sm text-ink-soft"><span>Subtotal</span><span>{{ carrito.total() | currency: 'EUR' : 'symbol' : '1.2-2' }}</span></div>
          <div class="flex justify-between text-sm text-ink-soft mt-1"><span>Envío 24/48 h (península)</span><span>{{ envio | currency: 'EUR' : 'symbol' : '1.2-2' }}</span></div>
          <div class="flex justify-between text-lg mt-3 pt-3 border-t border-stone"><span>Total</span><span>{{ carrito.total() + envio | currency: 'EUR' : 'symbol' : '1.2-2' }}</span></div>
          <p class="text-xs text-ink-soft mt-1">Pago con tarjeta, Bizum o transferencia.</p>
          <button class="btn btn-dark w-full mt-6" (click)="pagar()">Finalizar compra</button>
          @if (aviso) {
            <p class="mt-3 text-sm text-ink-soft">El pago todavía no está conectado: esta pantalla es solo la maqueta.</p>
          }
          <button class="mt-4 w-full text-xs uppercase tracking-widest text-ink-soft hover:text-clay" (click)="carrito.vaciar()">Vaciar carrito</button>
        </div>
      }
    </section>
  `
})
export class Carrito {
  carrito = inject(CarritoService);
  aviso = false;
  envio = 4.95;

  pagar() {
    this.aviso = true;
  }
}

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Producto } from '../../services/tienda.service';

@Component({
  selector: 'app-producto-card',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <a [routerLink]="['/producto', producto().id]" class="group block">
      <div class="relative aspect-[3/4] overflow-hidden rounded-2xl"
           [style.background]="'linear-gradient(160deg,' + producto().tonoA + ',' + producto().tonoB + ')'">
        <span class="material-symbols-outlined absolute inset-0 grid place-items-center text-white/50 transition-transform duration-500 group-hover:scale-110"
              style="font-size:96px; font-variation-settings:'wght' 200">checkroom</span>
        @if (producto().nuevo) {
          <span class="absolute top-3 left-3 bg-white text-pine text-[10px] uppercase tracking-widest px-2 py-1 rounded-full">Novedad</span>
        }
        @if (producto().precioAntes) {
          <span class="absolute top-3 right-3 bg-clay text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded-full">Oferta</span>
        }
      </div>
      <div class="mt-3 flex justify-between gap-3 text-sm">
        <div>
          <p class="font-medium">{{ producto().nombre }}</p>
          <div class="flex gap-1 mt-2">
            @for (c of producto().colores; track c.nombre) {
              <span class="w-3 h-3 rounded-full border border-ink/20" [style.background]="c.hex" [title]="c.nombre"></span>
            }
          </div>
        </div>
        <div class="text-right whitespace-nowrap">
          <p [class.text-clay]="producto().precioAntes">{{ producto().precio | currency: 'EUR' : 'symbol' : '1.2-2' }}</p>
          @if (producto().precioAntes) {
            <p class="text-ink-soft line-through text-xs">{{ producto().precioAntes | currency: 'EUR' : 'symbol' : '1.2-2' }}</p>
          }
        </div>
      </div>
    </a>
  `
})
export class ProductoCard {
  producto = input.required<Producto>();
}

import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Logo],
  template: `
    <div class="bg-pine text-paper text-center text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase py-2 px-3">
      Envío gratis desde 50 €
    </div>
    <header class="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-stone">
      <div class="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <button class="md:hidden material-symbols-outlined" (click)="menuAbierto.set(!menuAbierto())" aria-label="Menú">
          {{ menuAbierto() ? 'close' : 'menu' }}
        </button>

        <nav class="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
          <a routerLink="/tienda" class="hover:text-pine">Todo</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Camisetas' }" class="hover:text-pine">Camisetas</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Camisas' }" class="hover:text-pine">Camisas</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Vestidos' }" class="hover:text-pine">Vestidos</a>
        </nav>

        <a routerLink="/" class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span class="xl:hidden"><app-logo /></span>
          <span class="hidden xl:inline"><app-logo [completo]="true" /></span>
        </a>

        <a routerLink="/carrito" class="relative flex items-center gap-1 text-sm uppercase tracking-widest hover:text-pine" aria-label="Carrito">
          <span class="hidden sm:inline">Carrito</span>
          <span class="material-symbols-outlined">shopping_bag</span>
          @if (carrito.cantidad() > 0) {
            <span class="absolute -top-1 -right-2 sm:static bg-ink text-paper text-[10px] rounded-full w-5 h-5 grid place-items-center">
              {{ carrito.cantidad() }}
            </span>
          }
        </a>
      </div>

      @if (menuAbierto()) {
        <nav class="md:hidden border-t border-stone px-5 py-4 flex flex-col gap-4 text-sm uppercase tracking-widest bg-paper">
          <a routerLink="/tienda">Todo</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Camisetas' }">Camisetas</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Camisas' }">Camisas</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Pantalones' }">Pantalones</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Sudaderas' }">Sudaderas</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Vestidos' }">Vestidos</a>
        </nav>
      }
    </header>
  `
})
export class Header {
  carrito = inject(CarritoService);
  menuAbierto = signal(false);

  constructor(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) this.menuAbierto.set(false);
    });
  }
}

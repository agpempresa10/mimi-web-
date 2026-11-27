import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Logo],
  template: `
    <div class="bg-pine text-white text-center text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase py-2 px-3">
      Envíos 24/48 h a península · 4,95 €
    </div>
    <header class="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-stone">
      <div class="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">
        <button class="md:hidden material-symbols-outlined" (click)="menuAbierto.set(!menuAbierto())" aria-label="Menú">
          {{ menuAbierto() ? 'close' : 'menu' }}
        </button>

        <nav class="hidden md:flex items-center gap-7 text-sm uppercase tracking-widest">
          <a routerLink="/tienda" class="hover:text-pine">Novedades</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Ropa' }" class="hover:text-pine">Ropa</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Calzado' }" class="hover:text-pine">Calzado</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'MiMi Kids' }" class="hover:text-pine">MiMi Kids</a>
        </nav>

        <a routerLink="/" class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span class="xl:hidden"><app-logo /></span>
          <span class="hidden xl:inline"><app-logo [completo]="true" /></span>
        </a>

        <div class="flex items-center gap-4">
          <a href="https://www.instagram.com/mimi_modaycomplementos/" target="_blank" rel="noopener"
             class="hidden sm:inline text-sm uppercase tracking-widest hover:text-pine">Instagram</a>
          <a routerLink="/carrito" class="relative flex items-center gap-1 hover:text-pine" aria-label="Carrito">
            <span class="material-symbols-outlined">shopping_bag</span>
            @if (carrito.cantidad() > 0) {
              <span class="absolute -top-1 -right-2 bg-pine text-white text-[10px] rounded-full w-5 h-5 grid place-items-center">
                {{ carrito.cantidad() }}
              </span>
            }
          </a>
        </div>
      </div>

      @if (menuAbierto()) {
        <nav class="md:hidden border-t border-stone px-5 py-4 flex flex-col gap-4 text-sm uppercase tracking-widest bg-paper">
          <a routerLink="/tienda">Todo</a>
          @for (c of categorias; track c) {
            <a routerLink="/tienda" [queryParams]="{ categoria: c }">{{ c }}</a>
          }
          <a href="https://www.instagram.com/mimi_modaycomplementos/" target="_blank" rel="noopener">Instagram</a>
        </nav>
      }
    </header>
  `
})
export class Header {
  carrito = inject(CarritoService);
  menuAbierto = signal(false);
  categorias = ['Ropa', 'Abrigos y chaquetas', 'Pijamas', 'Calzado', 'Bolsos', 'MiMi Kids'];

  constructor(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) this.menuAbierto.set(false);
    });
  }
}

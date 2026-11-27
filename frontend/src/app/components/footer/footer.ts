import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  template: `
    <footer class="bg-pine-dark text-white mt-24">
      <div class="max-w-7xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-4">
        <div class="md:col-span-2">
          <app-logo [completo]="true" [grande]="true" [claro]="true" />
          <p class="mt-4 text-white/75 max-w-sm text-sm">MiMi &amp; MiMi Kids. Moda para todas las tallas, calzado, bolsos y ropa para los peques.</p>
        </div>
        <div class="text-sm space-y-2">
          <p class="uppercase tracking-widest text-white/60 text-xs mb-3">Tienda</p>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Ropa' }" class="block hover:underline">Ropa</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Calzado' }" class="block hover:underline">Calzado</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Bolsos' }" class="block hover:underline">Bolsos</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'MiMi Kids' }" class="block hover:underline">MiMi Kids</a>
        </div>
        <div class="text-sm space-y-2">
          <p class="uppercase tracking-widest text-white/60 text-xs mb-3">Compra</p>
          <p>Envíos 24/48 h a península: 4,95 €</p>
          <p>Pago con tarjeta, Bizum o transferencia</p>
          <a href="https://www.instagram.com/mimi_modaycomplementos/" target="_blank" rel="noopener" class="block hover:underline">&#64;mimi_modaycomplementos</a>
        </div>
      </div>
      <div class="border-t border-white/15 text-center text-xs text-white/60 py-5">© 2026 MiMi moda y complementos</div>
    </footer>
  `
})
export class Footer {}

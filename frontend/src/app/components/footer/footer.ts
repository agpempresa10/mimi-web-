import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  template: `
    <footer class="bg-ink text-paper mt-24">
      <div class="max-w-7xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-4">
        <div class="md:col-span-2">
          <app-logo [completo]="true" [grande]="true" />
          <p class="mt-3 text-paper/70 max-w-sm text-sm">Ropa para todos los días, hecha para durar. Diseñada con cariño desde Córdoba.</p>
        </div>
        <div class="text-sm space-y-2">
          <p class="uppercase tracking-widest text-paper/50 text-xs mb-3">Tienda</p>
          <a routerLink="/tienda" class="block hover:underline">Todo</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Sudaderas' }" class="block hover:underline">Sudaderas</a>
          <a routerLink="/tienda" [queryParams]="{ categoria: 'Accesorios' }" class="block hover:underline">Accesorios</a>
        </div>
        <div class="text-sm space-y-2">
          <p class="uppercase tracking-widest text-paper/50 text-xs mb-3">Contacto</p>
          <p>hola&#64;mimimoda.es</p>
          <p>+34 600 000 000</p>
          <p>Córdoba, España</p>
        </div>
      </div>
      <div class="border-t border-paper/10 text-center text-xs text-paper/50 py-5">© 2026 MIMI moda y complementos. Todos los derechos reservados.</div>
    </footer>
  `
})
export class Footer {}

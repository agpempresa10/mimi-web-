import { Component, input } from '@angular/core';

/**
 * Logo de MIMI moda y complementos: percha + nombre.
 * Usa el color del texto que lo rodea (currentColor), así vale para fondo claro y oscuro.
 * - compacto: MIMI con "MYC" debajo (cuando no cabe el nombre completo)
 * - completo: MIMI con "moda y complementos" debajo
 */
@Component({
  selector: 'app-logo',
  template: `
    <span class="inline-flex items-center gap-2.5" aria-label="MIMI moda y complementos">
      <svg viewBox="0 0 24 24" class="shrink-0" [class]="grande() ? 'w-9 h-9' : 'w-6 h-6'"
           fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 8.2V7.4a2.1 2.1 0 1 0-2.1-2.1"/>
        <path d="M12 8.2 20.6 15a1.1 1.1 0 0 1-.7 1.95H4.1A1.1 1.1 0 0 1 3.4 15L12 8.2Z"/>
      </svg>
      <span class="leading-none text-center">
        <span class="block font-display tracking-[0.28em] pl-[0.28em]" [class]="grande() ? 'text-4xl' : 'text-2xl'">MIMI</span>
        <span class="block uppercase mt-1.5 opacity-60 tracking-[0.32em] pl-[0.32em]" [class]="grande() ? 'text-[11px]' : 'text-[9px]'">
          @if (completo()) { moda y complementos } @else { MYC }
        </span>
      </span>
    </span>
  `
})
export class Logo {
  completo = input(false);
  grande = input(false);
}

import { Component, input } from '@angular/core';

/**
 * Logo de MiMi moda y complementos (basado en el de Instagram: "MiMi" manuscrito con flores).
 * - compacto: MiMi con "MYC" debajo
 * - completo: MiMi con "moda y complementos" debajo
 * - claro: versión para fondos oscuros
 */
@Component({
  selector: 'app-logo',
  template: `
    <span class="inline-flex items-center gap-2" aria-label="MiMi moda y complementos">
      <span class="text-pine/70" [class.text-white]="claro()" [style.font-size]="grande() ? '22px' : '16px'" aria-hidden="true">✿</span>
      <span class="leading-none text-center">
        <span class="block font-script font-bold" [class]="(claro() ? 'text-white ' : 'text-pine ') + (grande() ? 'text-5xl' : 'text-3xl')">MiMi</span>
        <span class="block uppercase -mt-0.5 tracking-[0.3em] pl-[0.3em]"
              [class]="(claro() ? 'text-white/70 ' : 'text-ink-soft ') + (grande() ? 'text-[11px]' : 'text-[9px]')">
          @if (completo()) { moda y complementos } @else { MYC }
        </span>
      </span>
      <span class="text-pine/70" [class.text-white]="claro()" [style.font-size]="grande() ? '22px' : '16px'" aria-hidden="true">✿</span>
    </span>
  `
})
export class Logo {
  completo = input(false);
  grande = input(false);
  claro = input(false);
}

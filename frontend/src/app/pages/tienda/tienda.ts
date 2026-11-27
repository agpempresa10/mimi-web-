import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto, TiendaService } from '../../services/tienda.service';
import { ProductoCard } from '../../components/producto-card/producto-card';

@Component({
  selector: 'app-tienda',
  imports: [RouterLink, ProductoCard],
  template: `
    <section class="max-w-7xl mx-auto px-5 pt-12">
      <h1 class="text-4xl sm:text-5xl text-center">{{ categoria() || 'Toda la tienda' }}</h1>

      <div class="mt-8 flex flex-wrap justify-center gap-2">
        <a routerLink="/tienda" class="px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition"
           [class]="!categoria() ? 'bg-pine text-white border-pine' : 'border-ink/30 hover:border-ink'">Todo</a>
        @for (c of categorias; track c) {
          <a routerLink="/tienda" [queryParams]="{ categoria: c }" class="px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition"
             [class]="categoria() === c ? 'bg-pine text-white border-pine' : 'border-ink/30 hover:border-ink'">{{ c }}</a>
        }
      </div>

      <p class="mt-10 text-sm text-ink-soft">{{ productos().length }} productos</p>
      <div class="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
        @for (p of productos(); track p.id) {
          <app-producto-card [producto]="p" />
        }
      </div>
      @if (error()) {
        <p class="text-center text-ink-soft mt-8">No se pudo cargar el catálogo. ¿Está arrancado el backend (puerto 8090)?</p>
      }
    </section>
  `
})
export class Tienda implements OnInit {
  private tienda = inject(TiendaService);
  private route = inject(ActivatedRoute);

  categorias = ['Ropa', 'Abrigos y chaquetas', 'Pijamas', 'Calzado', 'Bolsos', 'MiMi Kids'];
  categoria = signal<string | null>(null);
  productos = signal<Producto[]>([]);
  error = signal(false);

  ngOnInit() {
    this.route.queryParamMap.subscribe(q => {
      const c = q.get('categoria');
      this.categoria.set(c);
      this.error.set(false);
      this.tienda.productos(c ?? undefined).subscribe({
        next: p => this.productos.set(p),
        error: () => this.error.set(true),
      });
    });
  }
}

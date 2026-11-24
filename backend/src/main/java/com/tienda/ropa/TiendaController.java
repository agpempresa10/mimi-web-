package com.tienda.ropa;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Datos de la tienda y catálogo. Sin base de datos de momento:
 * para cambiar nombre, textos o productos, edita este archivo.
 */
@RestController
@RequestMapping("/api")
public class TiendaController {

    private static final TiendaInfo TIENDA = new TiendaInfo(
            "MIMI moda y complementos",
            "Ropa para todos los días, hecha para durar",
            "Córdoba",
            "hola@mimimoda.es",
            "+34 600 000 000",
            50.0,
            List.of("Camisetas", "Camisas", "Pantalones", "Sudaderas", "Vestidos", "Accesorios"));

    private static final List<String> TALLAS = List.of("XS", "S", "M", "L", "XL");

    private static final List<Producto> PRODUCTOS = List.of(
            new Producto(1, "Camiseta básica algodón", "Camisetas", 19.90, null,
                    "Camiseta de algodón 100% peinado, corte regular y tacto suave. La que siempre acabas poniéndote.",
                    List.of(new Producto.Color("Blanco roto", "#f1ece2"), new Producto.Color("Negro", "#1f1f1f"), new Producto.Color("Arena", "#d8c7a6")),
                    TALLAS, false, true, "#e9e1d3", "#cfc3ad"),
            new Producto(2, "Camiseta oversize estampada", "Camisetas", 24.90, 29.90,
                    "Corte oversize, hombro caído y pequeño estampado en el pecho. Algodón grueso de 200 g.",
                    List.of(new Producto.Color("Verde salvia", "#9aab8c"), new Producto.Color("Crudo", "#efe8da")),
                    TALLAS, false, false, "#b7c4a8", "#8fa07f"),
            new Producto(3, "Camisa de lino", "Camisas", 44.90, null,
                    "Lino lavado que no pesa nada y mejora con cada lavado. Perfecta para el calor de Córdoba.",
                    List.of(new Producto.Color("Azul cielo", "#a9c0d6"), new Producto.Color("Blanco", "#f6f3ec"), new Producto.Color("Terracota", "#c98262")),
                    TALLAS, true, true, "#c3d3e2", "#9db6cc"),
            new Producto(4, "Camisa Oxford", "Camisas", 39.90, null,
                    "Oxford clásica con botones en el cuello. Del trabajo a la cena sin cambiarte.",
                    List.of(new Producto.Color("Azul", "#8aa6c4"), new Producto.Color("Blanco", "#f6f3ec")),
                    TALLAS, false, false, "#d6dfea", "#b3c4d8"),
            new Producto(5, "Pantalón chino slim", "Pantalones", 49.90, null,
                    "Chino de algodón elástico con corte slim. Cómodo todo el día.",
                    List.of(new Producto.Color("Beige", "#cdb99a"), new Producto.Color("Marino", "#27364d"), new Producto.Color("Oliva", "#6f7650")),
                    List.of("38", "40", "42", "44", "46"), false, true, "#d9c9ad", "#b9a37e"),
            new Producto(6, "Vaquero recto", "Pantalones", 59.90, 69.90,
                    "Vaquero de corte recto, tejido denim de 12 oz con lavado medio.",
                    List.of(new Producto.Color("Azul medio", "#5b7391"), new Producto.Color("Negro", "#252525")),
                    List.of("38", "40", "42", "44", "46"), false, false, "#8fa5bf", "#647c9b"),
            new Producto(7, "Sudadera con capucha", "Sudaderas", 44.90, null,
                    "Felpa suave por dentro, capucha doble y bolsillo canguro. Para las tardes de otoño.",
                    List.of(new Producto.Color("Gris jaspe", "#b5b5b0"), new Producto.Color("Burdeos", "#6e2f3a"), new Producto.Color("Negro", "#1f1f1f")),
                    TALLAS, true, true, "#c9c9c4", "#a0a09a"),
            new Producto(8, "Sudadera cuello redondo", "Sudaderas", 39.90, null,
                    "Cuello redondo y puños acanalados. Algodón orgánico con interior perchado.",
                    List.of(new Producto.Color("Crudo", "#efe8da"), new Producto.Color("Verde botella", "#2f4a3a")),
                    TALLAS, false, false, "#e6dccb", "#cdbfa6"),
            new Producto(9, "Vestido midi camisero", "Vestidos", 54.90, null,
                    "Vestido midi con botones y cinturón a la cintura. Tejido fluido que cae precioso.",
                    List.of(new Producto.Color("Verde oliva", "#7a8461"), new Producto.Color("Azul tinta", "#2c3e5c")),
                    TALLAS, true, true, "#a9b38d", "#7f8a64"),
            new Producto(10, "Vestido de verano estampado", "Vestidos", 49.90, 59.90,
                    "Vestido ligero con estampado floral y escote en V. Viscosa suave y fresquita.",
                    List.of(new Producto.Color("Flores rosa", "#e4b6b0"), new Producto.Color("Flores azul", "#a9c0d6")),
                    TALLAS, false, false, "#ecc9c4", "#d9a29b"),
            new Producto(11, "Gorra de algodón", "Accesorios", 17.90, null,
                    "Gorra de seis paneles con cierre ajustable. Bordado discreto en la parte frontal.",
                    List.of(new Producto.Color("Beige", "#cdb99a"), new Producto.Color("Negro", "#1f1f1f")),
                    List.of("Única"), false, false, "#ddd0b6", "#bda985"),
            new Producto(12, "Cinturón de cuero", "Accesorios", 29.90, null,
                    "Cinturón de piel con hebilla metálica mate. Dura años.",
                    List.of(new Producto.Color("Marrón", "#6b4a32"), new Producto.Color("Negro", "#1f1f1f")),
                    List.of("S", "M", "L"), false, true, "#a07956", "#6b4a32"));

    @GetMapping("/tienda")
    public TiendaInfo tienda() {
        return TIENDA;
    }

    @GetMapping("/productos")
    public List<Producto> productos(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) Boolean destacados) {
        return PRODUCTOS.stream()
                .filter(p -> categoria == null || categoria.isBlank() || p.categoria().equalsIgnoreCase(categoria))
                .filter(p -> destacados == null || !destacados || p.destacado())
                .toList();
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> producto(@PathVariable int id) {
        return PRODUCTOS.stream()
                .filter(p -> p.id() == id)
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

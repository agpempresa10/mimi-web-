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
            "MiMi moda y complementos",
            "Moda para todas las tallas",
            "",
            "@mimi_modaycomplementos",
            "",
            0,
            List.of("Ropa", "Abrigos y chaquetas", "Pijamas", "Calzado", "Bolsos", "MiMi Kids"));

    // "Moda para todas las tallas"
    private static final List<String> TALLAS = List.of("S", "M", "L", "XL", "XXL", "3XL");
    private static final List<String> CALZADO = List.of("36", "37", "38", "39", "40", "41");
    private static final List<String> KIDS = List.of("2", "4", "6", "8", "10", "12");
    private static final List<String> UNICA = List.of("Única");

    private static Producto.Color c(String nombre, String hex) {
        return new Producto.Color(nombre, hex);
    }

    // Productos de ejemplo inspirados en lo que publica la tienda en Instagram.
    // Precios orientativos: cámbialos por los reales.
    private static final List<Producto> PRODUCTOS = List.of(
            new Producto(1, "Chaqueta corazón bordado", "Abrigos y chaquetas", 49.90, null,
                    "Chaqueta oversize con corazón bordado en lentejuelas y estrellas. La prenda que todo el mundo nos pregunta.",
                    List.of(c("Kaki", "#8b8a6e"), c("Negro", "#2a2a2a")), TALLAS, true, true, "#b7b49a", "#8b8a6e"),
            new Producto(2, "Pantalón palazzo fluido", "Ropa", 32.90, null,
                    "Palazzo de tiro alto con cinturón, tejido fluido que cae precioso. Combina con todo.",
                    List.of(c("Verde salvia", "#9aa58a"), c("Beige", "#d9c7ad"), c("Negro", "#2a2a2a")), TALLAS, false, true, "#c3cbb4", "#9aa58a"),
            new Producto(3, "Cárdigan de punto", "Ropa", 29.90, null,
                    "Cárdigan de punto suave con botones, perfecto para entretiempo.",
                    List.of(c("Rosa empolvado", "#e3b5c0"), c("Crudo", "#efe6d8"), c("Granate", "#7c2e3f")), TALLAS, true, true, "#f0cfd8", "#d9a0b0"),
            new Producto(4, "Sudadera estrellas", "Ropa", 27.90, 34.90,
                    "Sudadera de felpa con estrellas, cómoda y calentita.",
                    List.of(c("Granate", "#7c2e3f"), c("Rosa", "#e3b5c0")), TALLAS, false, false, "#b46a7c", "#7c2e3f"),
            new Producto(5, "Vaquero estampado", "Ropa", 35.90, null,
                    "Vaquero recto con estampado, de los que alegran cualquier look.",
                    List.of(c("Azul", "#4a5a7a")), TALLAS, false, false, "#7d8aa6", "#4a5a7a"),
            new Producto(6, "Blusa fruncida", "Ropa", 22.90, null,
                    "Blusa de manga larga con fruncido lateral que favorece muchísimo.",
                    List.of(c("Chocolate", "#6b4a3a"), c("Negro", "#2a2a2a"), c("Blanco", "#f6f1ea")), TALLAS, false, true, "#a07e6c", "#6b4a3a"),
            new Producto(7, "Abrigo paño", "Abrigos y chaquetas", 59.90, null,
                    "Abrigo largo de paño con solapa, abriga sin pesar.",
                    List.of(c("Camel", "#b48a5f"), c("Gris", "#8a8784")), TALLAS, true, false, "#d2b08b", "#b48a5f"),
            new Producto(8, "Cazadora con tachuelas", "Abrigos y chaquetas", 44.90, 54.90,
                    "Cazadora efecto piel con tachuelas plateadas. Rockera y elegante a la vez.",
                    List.of(c("Negro", "#2a2a2a")), TALLAS, false, false, "#6b6b6b", "#2a2a2a"),
            new Producto(9, "Pijama tundosado", "Pijamas", 24.90, null,
                    "Pijama de dos piezas, suave por dentro, para las noches de invierno.",
                    List.of(c("Rosa", "#eab8c6"), c("Gris", "#b6b4b4")), TALLAS, true, true, "#f2cdd8", "#d99fb2"),
            new Producto(10, "Bailarinas de terciopelo", "Calzado", 25.90, null,
                    "Bailarinas de terciopelo con elástico y suela de yute. Comodísimas.",
                    List.of(c("Beige", "#cdb49b"), c("Verde", "#8c9a6a"), c("Burdeos", "#6e2f3a")), CALZADO, true, true, "#e0cdb9", "#cdb49b"),
            new Producto(11, "Bolso de mano", "Bolsos", 26.90, null,
                    "Bolso de mano con asa corta y bandolera desmontable.",
                    List.of(c("Rosa", "#d993a7"), c("Negro", "#2a2a2a"), c("Dorado", "#c8a95c")), UNICA, false, false, "#e7b2c1", "#c07f86"),
            new Producto(12, "Clutch de fiesta", "Bolsos", 19.90, null,
                    "Clutch con cadena para bodas, comuniones y cenas especiales.",
                    List.of(c("Plata", "#bfbfbf"), c("Dorado", "#c8a95c")), UNICA, false, false, "#e3d6b4", "#c8a95c"),
            new Producto(13, "Conjunto niña sudadera + legging", "MiMi Kids", 21.90, null,
                    "Conjunto cómodo para el cole y para jugar.",
                    List.of(c("Rosa", "#eab8c6"), c("Lila", "#c7b2d8")), KIDS, true, true, "#d6e2cb", "#9cae8a"),
            new Producto(14, "Pijama infantil", "MiMi Kids", 16.90, null,
                    "Pijama suave y calentito para los peques.",
                    List.of(c("Azul", "#a9c0d6"), c("Rosa", "#eab8c6")), KIDS, false, false, "#dbe5ef", "#a9c0d6"));

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

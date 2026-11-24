package com.tienda.ropa;

import java.util.List;

public record Producto(
        int id,
        String nombre,
        String categoria,
        double precio,
        Double precioAntes,
        String descripcion,
        List<Color> colores,
        List<String> tallas,
        boolean nuevo,
        boolean destacado,
        String tonoA,
        String tonoB) {

    public record Color(String nombre, String hex) {}
}

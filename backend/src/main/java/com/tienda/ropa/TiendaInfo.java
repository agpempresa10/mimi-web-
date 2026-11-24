package com.tienda.ropa;

import java.util.List;

public record TiendaInfo(
        String nombre,
        String lema,
        String ciudad,
        String email,
        String telefono,
        double envioGratisDesde,
        List<String> categorias) {}

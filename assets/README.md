# Assets - Presentación Balanza Comercial

## Logos incluidos

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| `logo-strtgy.png` | Logo de STRTGY AI | ✅ Incluido |
| `logo-vigia.avif` | Logo de Grupo Vigía (wordmark blanco) | ✅ Incluido |

## Formatos de logo

La presentación usa el elemento `<picture>` para soportar múltiples formatos:

```html
<picture>
    <source srcset="assets/logo-vigia.avif" type="image/avif">
    <source srcset="assets/logo-vigia.png" type="image/png">
    <img src="assets/logo-vigia.avif" alt="Grupo Vigía">
</picture>
```

### Si necesitas agregar versión PNG

1. Convierte `logo-vigia.avif` a PNG
2. Guárdalo como `logo-vigia.png` en esta carpeta
3. El navegador usará automáticamente el formato más eficiente

## Dónde aparecen los logos

| Ubicación | STRTGY | Grupo Vigía |
|-----------|--------|-------------|
| **Portada** | ✅ Grande, blanco | ✅ Grande, blanco |
| **Cierre** | ✅ Mediano, blanco | ✅ Mediano, blanco |
| **Watermark izq.** | ✅ Pequeño, sutil | — |
| **Watermark der.** | — | ✅ Pequeño, sutil |

---

## Estructura de archivos

```
assets/
├── logo-strtgy.png                    # Logo STRTGY AI
├── logo-vigia.avif                    # Logo Grupo Vigía (AVIF)
├── GV-Entregable_Wordmark A Whit.avif # Original Grupo Vigía
└── README.md                          # Este archivo
```

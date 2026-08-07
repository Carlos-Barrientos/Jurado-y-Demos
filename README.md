# PROSUR AI Demo Showcase — Innovation Hub

Sistema web unificado e interactivo para la exhibición, discusión y colaboración en proyectos de **Inteligencia Artificial** de **Grupo Prosur**, generado a partir de las plantillas HTML de Stitch y organizado bajo una estructura modular inspirada en la arquitectura limpia del repositorio [`AgriciDaniel/claude-obsidian`](https://github.com/AgriciDaniel/claude-obsidian).

---

## 📁 Estructura del Proyecto (Modular Architecture)

```
stitch_prosur_ai_demo_showcase/
├── index.html               # Shell HTML principal con tokens de diseño y fuentes
├── package.json             # Scripts de NPM y dependencias Vite
├── vite.config.js           # Configuración de compilación y servidor dev
├── DESIGN.md                # Sistema de diseño oficial (colores, tipografía Hanken Grotesk, componentes)
├── README.md                # Documentación del sistema y guía de arquitectura
│
└── src/
    ├── main.js              # Punto de entrada de la aplicación SPA
    │
    ├── assets/              # Logotipos e imágenes corporativas
    │
    ├── styles/
    │   └── main.css         # Utilidades CSS, glassmorphism y animaciones
    │
    ├── data/
    │   └── store.js         # Estado reactivo y base de datos simulada (Demos, Posts, Usuario)
    │
    ├── router/
    │   └── index.js         # Enrutador dinámico client-side basado en hash
    │
    ├── components/          # Componentes reutilizables de UI
    │   ├── Navbar.js        # Barra de navegación superior con buscador en tiempo real
    │   └── Footer.js        # Pie de página corporativo de Grupo Prosur
    │
    └── views/               # Vistas principales del sistema (Stitch HTML Mockups)
        ├── HomeView.js      # Galería de Demos (Filtros por unidad, categoría y búsqueda)
        ├── DetailView.js    # Detalle de Demo (Reproductor de video, specs, arquitectura y comentarios)
        ├── CommunityView.js # Feed de Comunidad (Publicación de preguntas, anuncios e interacción)
        └── ProfileView.js   # Perfil del Participante (Estadísticas, insignias y demos guardados)
```

---

## 🚀 Características Principales

1. **Galería de Demos Interactiva (`#home`)**:
   - Búsqueda en tiempo real por título, tecnología o autor.
   - Filtrado por unidades de negocio (*Food Ingredients*, *Biotech & Pharma*, *Logistics*, *Corporate*).
   - Tarjetas de demos con estadísticas de impacto (likes, vistas, rating) y botón para guardar en favoritos.

2. **Visualizador de Detalle de Proyecto (`#demo/:id`)**:
   - Reproductor de video integrado para demos tecnicos.
   - Pestañas dinámicas: *Descripción & Métricas*, *Arquitectura del Sistema*, y *Discusión*.
   - Sección de comentarios interactivos y valoración en estrellas.

3. **Feed de Comunidad (`#community`)**:
   - Foro de discusión para formular preguntas sobre modelos de IA y compartir actualizaciones.
   - Filtros por etiquetas tendencia (`#Llama3`, `#YOLOv8`, `#RAG`, `#Espectrometría`).
   - Botón de interacción para reaccionar con "Me gusta".

4. **Perfil del Participante (`#profile`)**:
   - Resumen del investigador con insignias de reconocimiento (*IA Pioneer 2026*, *Top Innovador*).
   - Tarjetas de métricas: Demos publicados, total de vistas, reacciones y colaboraciones.
   - Pestaña de demos propios y demos guardados en favoritos.

---

## 🛠️ Instalación y Ejecución Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abrir el navegador en `http://localhost:3000`.

3. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 🎨 Sistema de Diseño

- **Color Primario:** Rojo Prosur (`#9e001f` / `#c8102e`)
- **Tipografía:** Hanken Grotesk
- **Iconografía:** Material Symbols Outlined

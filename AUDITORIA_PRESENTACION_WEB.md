# Auditoría de la presentación web

## Propósito del documento

Este documento explica cómo está construida la presentación web, qué tecnologías utiliza, cómo funciona su sistema visual y qué decisiones conviene conservar o mejorar antes de reutilizarla con otro tema de exposición.

El análisis se realizó sobre los archivos actuales del proyecto:

- `index.html`: contenido, escenas, notas del presentador y referencias a librerías.
- `style.css`: sistema visual, composición, componentes, responsive y animaciones.
- `script.js`: inicialización de Reveal.js, partículas, métricas e interacciones.
- `TAREA 6.docx` y `TAREA 6.pdf`: documentos académicos adjuntos al proyecto.

## 1. Resumen ejecutivo

La presentación es una aplicación web estática de una sola página que usa Reveal.js como motor de diapositivas. Su propuesta visual es una keynote tecnológica de estética cyber/digital: fondo oscuro, acentos neón, tarjetas translúcidas, rejillas, partículas conectadas, código flotante, indicadores de progreso y transiciones cinematográficas.

La implementación no usa React, Vue, Angular, TypeScript, un bundler ni una base de datos. Todo el contenido vive en `index.html`, todo el diseño en `style.css` y la lógica de comportamiento en `script.js`. Esto permite abrir el archivo directamente, pero vuelve más costosa la evolución del proyecto: el HTML es monolítico, existen estilos y funciones heredadas que ya no tienen elementos asociados y las librerías se cargan desde CDN.

El mayor hallazgo de contexto es que los archivos no están alineados temáticamente:

- La web presenta Administración de la Calidad del Software, QA, testing, gestión, control y factores de calidad.
- `TAREA 6.docx` y `TAREA 6.pdf` presentan Mejores Prácticas con ITIL y Gestión de Incidentes.
- Algunas notas del HTML mencionan “el PDF” y ejemplos de Power BI/ETL, pero el PDF actual no trata Power BI/ETL; trata un incidente ficticio de caída de un sistema de inscripciones.

Antes de migrar el diseño a otro tema hay que decidir cuál es la fuente de verdad del contenido. El diseño puede conservarse casi completo, pero el guion, las notas, los nombres, los ejemplos y la secuencia narrativa deben pertenecer al mismo tema.

## 2. Inventario del proyecto

| Archivo | Estado | Función | Observaciones |
|---|---|---|---|
| `index.html` | Activo | Contiene la presentación completa | 53 escenas, 53 notas del presentador, contenido y estructura visual mezclados |
| `style.css` | Activo | Define la identidad gráfica y la composición | 2,464 líneas, 20 keyframes y 3 bloques responsive |
| `script.js` | Activo con deuda | Controla Reveal.js, Canvas, KPIs e interacciones | 230 líneas; contiene lógica para funcionalidades que no aparecen en el HTML actual |
| `TAREA 6.docx` | Referencia adjunta | Informe académico editable | 65 párrafos y 2 tablas; tema ITIL/gestión de incidentes |
| `TAREA 6.pdf` | Referencia adjunta | Exportación del informe | 7 páginas; visualmente coincide con el informe ITIL, no con el tema principal de la web |

No existe `package.json`, archivo de bloqueo, configuración de Vite/Webpack, carpeta `src`, carpeta `public`, README ni pruebas automatizadas. La presentación se comporta como un sitio estático servido desde un único HTML.

## 3. Arquitectura actual

### 3.1 Flujo general

```text
index.html
├── Carga fuentes y librerías externas
├── Crea capas visuales globales
│   ├── Canvas de partículas
│   ├── Rejilla tecnológica
│   ├── Scanline
│   └── Código flotante
├── Crea el contenedor Reveal.js
│   └── 53 <section>, una por escena
├── Incluye notas del presentador
└── Carga script.js
    ├── Inicializa partículas
    ├── Inicializa Reveal.js
    ├── Configura Mermaid
    ├── Activa métricas de la escena actual
    └── Conecta interacciones
```

### 3.2 Capas de responsabilidad

| Capa | Implementación actual | Responsabilidad |
|---|---|---|
| Contenido | HTML | Títulos, textos, ejemplos, integrantes y notas |
| Motor de presentación | Reveal.js 5 | Navegación, hash, controles, progreso, número de diapositiva, fragmentos y transiciones |
| Sistema visual | CSS | Colores, tipografía, grids, tarjetas, glassmorphism, responsive y animaciones |
| Escenas gráficas | CSS, SVG y HTML | PDCA/PHVA, pirámide de pruebas, timeline, consola, dashboard, videojuego, radar radial y comparaciones |
| Atmósfera | Canvas 2D y CSS | Partículas, conexiones, rejilla, scanline y código flotante |
| Comportamiento | JavaScript ES6 | Inicialización, animación de partículas, barras KPI e interacción puntual |
| Recursos | CDN | Reveal.js, Reveal Notes, Mermaid, Font Awesome y Google Fonts |

### 3.3 Estructura narrativa

| Escenas | Bloque | Contenido |
|---:|---|---|
| 1-3 | Apertura | Portada, importancia de la calidad y ruta de exposición |
| 4-14 | Marvin | Definición y administración de la calidad |
| 15-27 | Francisco | QA y tipos de pruebas |
| 28-39 | Luis | Gestión, métricas y mejora continua |
| 40-50 | David | Control y factores de calidad |
| 51-53 | Cierre | Resumen, ideas memorables y despedida |

Cada escena utiliza el mismo patrón general: etiqueta de contexto, título, subtítulo o texto principal, composición visual, elementos con `fragment` y una nota de exposición dentro de `<aside class="notes">`.

## 4. Tecnologías y dependencias

### Tecnologías activas

- HTML5 para el documento y la composición de las 53 escenas.
- CSS3 para layout, variables, gradientes, filtros, `backdrop-filter`, transiciones, keyframes y media queries.
- JavaScript ES6 sin framework, encapsulado en una IIFE llamada `QualityDeck`.
- Reveal.js 5 para el motor de presentación.
- Reveal Notes para las notas del presentador.
- Font Awesome 6.5.2 para iconos sólidos y de marcas.
- Google Fonts: Inter, Space Grotesk y JetBrains Mono.
- Canvas 2D para partículas y líneas dinámicas de conexión.
- SVG inline para el diagrama radial de factores de calidad.
- Web Animations API mediante `element.animate()` para el pulso de la interacción de problemas.

### Dependencias cargadas pero no demostradas como funcionalidad activa

Mermaid 10 se carga y se configura en `script.js`, además de tener estilos para `.mermaid` y `.mermaid-card`, pero el HTML actual no contiene ningún elemento con `class="mermaid"`. Por lo tanto, Mermaid está preparada pero no participa en la presentación visible actual.

### Ausencias relevantes

- No hay framework de componentes.
- No hay gestor de contenido ni datos externos.
- No hay build de producción.
- No hay minificación, bundling ni versionado local de dependencias.
- No hay pruebas de regresión de navegación, overflow o accesibilidad.

## 5. Sistema visual

### 5.1 Dirección de arte

La dirección visual puede describirse como “keynote tecnológica de alto contraste”. El objetivo no es simular una diapositiva tradicional, sino crear escenas de pantalla completa con una atmósfera de sistema digital:

- Fondo oscuro y profundo para favorecer la proyección.
- Acentos cian, verde, azul, amarillo y rojo para separar estados y bloques.
- Tarjetas tipo vidrio para agrupar conceptos sin romper el fondo.
- Líneas, nodos, barras, paneles de consola y métricas para comunicar proceso y tecnología.
- Animaciones lentas en el fondo y entradas controladas en primer plano.
- Uso de iconos como sustituto de imágenes para mantener el proyecto liviano y consistente.

### 5.2 Paleta de colores

| Token | Valor | Uso principal |
|---|---|---|
| `--bg` | `#05070d` | Fondo principal |
| `--bg-2` | `#0a1018` | Segundo tono oscuro; actualmente poco utilizado como token |
| `--white` | `#f8fbff` | Títulos, valores y texto prioritario |
| `--muted` | `#aebed2` | Texto secundario y descripciones |
| `--cyan` | `#2efcff` | Tecnología, foco, iconos, bordes y controles |
| `--blue` | `#2878ff` | Gradientes, rutas y estados de avance |
| `--green` | `#56ff8e` | Éxito, calidad, validación y mejora |
| `--red` | `#ff4d66` | Error, riesgo, defecto y advertencia crítica |
| `--yellow` | `#ffd166` | Gestión, datos, atención y estados preventivos |
| `--panel` | `rgba(255,255,255,.075)` | Superficies translúcidas |
| `--panel-strong` | `rgba(255,255,255,.12)` | Superficies de mayor énfasis |
| `--line` | `rgba(255,255,255,.16)` | Bordes neutros |
| `--radius` | `8px` | Radio global de tarjetas y controles |

Los bloques de cada expositor también tienen una codificación cromática: Marvin usa cian, Francisco verde, Luis amarillo y David rojo. Esta decisión ayuda a ubicar visualmente el bloque actual sin cambiar por completo el tema base.

### 5.3 Tipografía

- Inter se usa como fuente principal del cuerpo y los textos largos.
- Space Grotesk se usa en títulos, titulares, valores grandes y frases de cierre.
- JetBrains Mono se usa en código flotante, métricas, consola y elementos tipo HUD.

La jerarquía está orientada a proyección: `h1` alrededor de 4 rem, `h2` alrededor de 3 rem, textos de apoyo entre 1.05 y 1.35 rem y frases de cierre entre 2 y 4 rem. En resoluciones menores se reducen los tamaños mediante media queries.

### 5.4 Tarjetas y superficies

La mayoría de las tarjetas comparten una base visual común:

- Borde de 1 px semitransparente.
- Radio de 8 px.
- Fondo con gradiente blanco translúcido.
- Sombra amplia y profunda.
- `backdrop-filter: blur(16px)`.
- `overflow: hidden` para contener el brillo interno.
- Elevación al pasar el cursor mediante `translateY(-5px)`.
- Brillo diagonal que recorre la tarjeta en hover.

Las familias reutilizadas son `feature-card`, `stat-card`, `test-card`, `decision-card`, `dash-card`, `summary-card`, `glass-card`, `chart-card`, `phone-card`, `speed-card`, `compare-card` y `kpi-card`. Esto forma un sistema de componentes visuales, aunque todavía está definido directamente dentro de un único CSS.

### 5.5 Composición y layout

Reveal.js trabaja con un lienzo lógico de `1280 x 720`, equivalente a 16:9. La estructura utiliza principalmente CSS Grid y Flexbox:

- Grids de 2, 3, 4 y 5 columnas para tarjetas.
- Layouts divididos para texto más visual lateral.
- Timelines y pipelines con conectores entre etapas.
- Paneles de comparación para “bueno/malo”, “QA/QC” o “antes/después”.
- Elementos centrados para diagramas y escenas conceptuales.
- Padding amplio en portada, separadores de bloque y cierre.

El diseño de portada y cierre usa pseudo-elementos con un marco interior, líneas repetidas y brillo azul. Esto crea una identidad de “pantalla de sistema” sin depender de imágenes.

### 5.6 Iconos

Los iconos provienen de Font Awesome. Hay aproximadamente 162 instancias y cerca de 96 combinaciones de clases visuales. Predominan los iconos `fa-solid`; también se usan marcas como TikTok, WhatsApp y Google.

Los iconos cumplen tres funciones:

1. Identificar rápidamente un concepto dentro de una tarjeta.
2. Reforzar estados semánticos: escudo para seguridad, bug para defectos, check para validación, gráfico para métricas.
3. Construir escenas sin imágenes externas: cohete, videojuego, hospital, automóvil, consola y flujo ETL.

Para migrar el tema conviene conservar el estilo de iconos, pero sustituir los iconos ligados a ejemplos actuales por un conjunto semántico del nuevo tema.

### 5.7 Recursos gráficos sin imágenes

La presentación no usa etiquetas `<img>`. La mayoría de los visuales se dibuja con:

- CSS y pseudo-elementos.
- Iconos Font Awesome.
- Un Canvas global de partículas.
- Un SVG inline para el mapa radial.
- Elementos HTML con clases que representan gráficos, consolas, barras y dispositivos.

Esto reduce el peso y facilita la migración, pero hace que parte del significado visual dependa de nombres de clases específicos del tema actual.

## 6. Animaciones, transiciones e interacción

### 6.1 Navegación Reveal.js

`script.js` inicializa Reveal.js con:

- `hash: true`, para conservar la escena en la URL.
- Controles visibles.
- Barra de progreso.
- Número de diapositiva en formato actual/total.
- Lienzo lógico 1280x720.
- Escala mínima 0.25 y máxima 1.35.
- Transición global `convex` y transición de fondo `fade`.

Las 53 escenas tienen un `data-transition` explícito. Se usan `slide`, `fade`, `convex`, `zoom` y combinaciones `zoom-in fade-out`. Solo la portada y la introducción tienen `data-auto-animate`.

### 6.2 Fragmentos

Hay 167 usos de `fragment`. Los elementos aparecen gradualmente dentro de una escena, lo que permite que el expositor revele tarjetas, pasos, listas y partes del diagrama al ritmo de la explicación. El CSS añade una entrada `revealPop` con desplazamiento vertical y desenfoque breve.

### 6.3 Animación ambiental

El fondo permanece activo durante toda la presentación:

- Partículas que se desplazan en Canvas.
- Líneas que conectan partículas cercanas.
- Rejilla cian con máscara de desvanecimiento.
- Scanline que atraviesa la pantalla.
- Seis textos de código que flotan y desaparecen.

Esto crea continuidad entre escenas y evita que cada sección parezca una página aislada.

### 6.4 Animaciones semánticas

Las 20 animaciones CSS cubren diferentes metáforas visuales:

- Rotación: órbitas, ciclos PDCA y anillos radiales.
- Flotación: automóvil, cohete y nodos.
- Progreso: líneas, barras y carga.
- Riesgo: glitch, shake y pulso de bugs.
- Dibujo: líneas SVG y recorridos.
- Entrada: tarjetas y fragmentos.
- Juego: salto del personaje y bug en movimiento.

La animación no solo decora; intenta expresar el concepto de la escena. Esta es una de las decisiones más valiosas para conservar durante una migración.

### 6.5 Interacciones activas y código huérfano

Activas:

- Navegación con Reveal.js.
- Controles, progreso y número de escena.
- Animación de partículas.
- Activación de barras KPI al cambiar de escena.
- Fragmentos progresivos.

Preparadas pero no conectadas al HTML actual:

- `initInteractiveQuestion()` busca `#appInput`, `#addAppIssue` y `#issueTags`, pero esos elementos no existen en `index.html`.
- `pulsePainMap()` busca `.quality-pain-map .pain-row i`, pero no hay una escena que contenga esa estructura.
- Mermaid se configura y ejecuta, pero no existen bloques `.mermaid`.
- Hay CSS para `bug-hunt`, `org-chart`, `cloud-grid`, `analytics-layout`, `bar-chart`, `line-chart`, `risk-meter`, `mermaid-card` y otras familias que no aparecen en el HTML actual.

Esto indica que el proyecto conserva restos de conceptos anteriores o de una versión más amplia. No deben interpretarse como funcionalidades disponibles hasta que se conecten y prueben.

### 6.6 Movimiento reducido

Existe una regla `@media (prefers-reduced-motion: reduce)` que reduce animaciones y transiciones casi a cero. Es una buena base de accesibilidad. La mejora pendiente es revisar también el Canvas y pausar el ciclo `requestAnimationFrame` cuando el usuario tenga movimiento reducido o cuando la pestaña no esté visible.

## 7. Responsive y accesibilidad

### Estado actual verificado

Hay dos puntos de adaptación principales:

- Hasta 1100 px: se reducen títulos, se pasan varios grids a dos columnas y el pipeline cambia de forma.
- Hasta 820 px: la mayoría de los grids pasan a una columna, se reduce el padding, se adapta la portada y se reemplaza el ciclo circular PHVA por una lista vertical.

También existe una adaptación del pipeline ETL, del formulario, del mapa de dolor y de la pirámide de testing.

### Mejoras recomendadas

- Añadir `aria-hidden="true"` a iconos puramente decorativos.
- Convertir diagramas importantes en estructuras accesibles equivalentes, no solo en formas visuales.
- Añadir etiquetas y mensajes accesibles si se reactiva la interacción de preguntas.
- Verificar contraste real de texto muted, cyan y yellow sobre todos los fondos.
- Probar escenas con mucho contenido en 1280x720, 1366x768, 1920x1080, 1024x768 y móvil.
- Validar que ningún `min-height`, `font-size` o grid produzca clipping en escenas largas.
- Probar navegación por teclado, foco visible y uso con lector de pantalla.
- Mantener el comportamiento de `prefers-reduced-motion` también en JavaScript.

## 8. Problemas y deuda técnica

### Prioridad alta

1. **Fuentes de contenido desalineadas.** El HTML y `TAREA 6` representan exposiciones distintas. Hay que elegir el contenido oficial antes de reutilizar la presentación.
2. **Dependencias externas no fijadas localmente.** Reveal.js y Mermaid usan rangos mayores (`@5`, `@10`) y las fuentes/Font Awesome dependen de Internet. Una futura actualización del CDN puede cambiar el resultado visual.
3. **HTML monolítico.** Las 53 escenas y sus notas están en un archivo de más de mil líneas, lo que dificulta localizar, duplicar y revisar una escena.

### Prioridad media

4. **CSS monolítico.** Las 2,464 líneas mezclan tokens, layout global, componentes, escenas específicas, responsive y animaciones.
5. **Código huérfano.** Existen handlers, selectores y estilos sin correspondencia con el DOM actual.
6. **Tokens incompletos.** La paleta base está centralizada, pero todavía hay colores directos como rojo de Netflix, tonos de Power BI, fondos de consola y numerosas transparencias repetidas.
7. **Contenido y presentación acoplados.** Cambiar un tema requiere editar textos directamente dentro de estructuras visuales específicas.

### Prioridad baja pero conveniente

8. **No existe una verificación automatizada.** No hay prueba que confirme que todas las escenas cargan, que las transiciones funcionan o que no aparece overflow.
9. **El Canvas siempre anima.** La búsqueda de conexiones entre partículas es potencialmente costosa porque compara cada partícula con las siguientes.
10. **`securityLevel: "loose"` en Mermaid.** Aunque no hay diagramas activos, conviene usar una configuración más restrictiva si en el futuro se introducen contenidos dinámicos.

## 9. Mejoras propuestas

### Fase 1: coherencia del contenido

1. Declarar la fuente de verdad: la presentación web actual o `TAREA 6`.
2. Si el nuevo tema será ITIL, reemplazar títulos, textos, notas y escenas para que representen incidentes, impacto, diagnóstico, restauración, comunicación y lecciones aprendidas.
3. Si se conservará Administración de la Calidad del Software, marcar `TAREA 6` como documento independiente o sustituirlo por el material académico que realmente alimenta la web.
4. Unificar nombres completos, integrantes, institución, fecha y ejemplos.

### Fase 2: separar el diseño reutilizable del contenido

Estructura recomendada para una siguiente versión:

```text
presentacion/
├── index.html
├── src/
│   ├── app.js
│   ├── slides.js
│   ├── visual-scenes.js
│   └── interactions.js
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   ├── scenes.css
│   ├── reveal-overrides.css
│   └── responsive.css
├── assets/
└── package.json
```

El contenido de cada escena podría declararse como datos o plantillas, mientras que `tokens.css` y `components.css` conservarían la identidad visual. Así se podría cambiar el tema sin reescribir la estructura de las tarjetas.

### Fase 3: consolidar el sistema visual

- Convertir todos los colores repetidos en tokens semánticos: `--accent-primary`, `--accent-success`, `--accent-warning`, `--accent-danger`, `--surface`, `--text-muted`.
- Crear una clase base para tarjetas y variantes por estado, en lugar de repetir listas largas de selectores.
- Separar componentes genéricos de escenas específicas.
- Mantener una escala de espaciado, radios, sombras y tamaños tipográficos.
- Crear un catálogo de escenas reutilizables: portada, bloque, cards, comparación, timeline, pipeline, KPI, ciclo y cierre.

### Fase 4: dependencias y calidad de ejecución

- Añadir `package.json` y fijar versiones exactas.
- Preferir dependencias locales para una presentación que deba funcionar sin Internet.
- Añadir scripts de desarrollo, build y preview.
- Crear una verificación que recorra las 53 escenas, compruebe la ausencia de overflow y capture las vistas principales.
- Pausar partículas y animaciones innecesarias cuando la pestaña esté oculta.
- Limpiar código no utilizado o registrar explícitamente qué módulos son experimentales.

## 10. Guía para migrar a otro tema conservando el diseño

### Conservar

- El motor Reveal.js y su configuración de 16:9.
- La paleta oscura y sus tokens semánticos.
- La tipografía Inter/Space Grotesk/JetBrains Mono.
- La atmósfera de Canvas, rejilla, scanline y código flotante.
- La base de tarjetas glassmorphism.
- Las transiciones y el sistema de `fragment`.
- La estructura de notas del presentador.
- Las escenas genéricas: portada, bloque, comparación, pipeline, KPI, cierre y resumen.

### Reemplazar o abstraer

- `NASA`, `Netflix`, `No Man's Sky`, `Power BI`, videojuego, hospital, automóvil y ETL deben convertirse en escenas del nuevo tema o en plantillas neutrales.
- Los iconos deben mapearse a conceptos del nuevo contenido.
- Los colores por expositor deben convertirse en colores por módulo, etapa o estado si el nuevo guion no usa cuatro participantes.
- Las frases de los `<aside class="notes">` deben revisarse junto con cada escena, no solo cambiar el texto visible.
- Las métricas y porcentajes deben representar datos reales o declararse como ejemplos ilustrativos.

### Secuencia sugerida de migración

1. Escribir el nuevo guion y separar introducción, bloques, transiciones y cierre.
2. Clasificar cada escena como reutilizable, adaptable o descartable.
3. Cambiar primero títulos, textos y notas.
4. Sustituir iconos y metáforas visuales.
5. Ajustar solo las escenas que necesiten una composición nueva.
6. Revisar que cada fragmento aparezca en el orden correcto.
7. Probar navegación, transiciones, responsive, teclado, movimiento reducido y carga sin errores.
8. Eliminar estilos y funciones que ya no tengan correspondencia con el nuevo tema.

## 11. Checklist de continuidad

Antes de considerar terminada una migración, comprobar:

- [ ] El tema del HTML coincide con el documento académico fuente.
- [ ] El título, la descripción, los nombres y la fecha están actualizados.
- [ ] Cada bloque tiene una intención narrativa clara.
- [ ] Cada escena mantiene una sola idea principal.
- [ ] Las notas del presentador corresponden a lo que se ve.
- [ ] Todos los iconos representan el concepto correcto.
- [ ] Las tarjetas no repiten información innecesariamente.
- [ ] Las transiciones tienen intención y no distraen.
- [ ] `prefers-reduced-motion` funciona.
- [ ] La presentación se lee correctamente en proyección 16:9.
- [ ] No hay overflow ni elementos cortados en las vistas objetivo.
- [ ] No quedan selectores, handlers o librerías sin uso.
- [ ] La presentación puede abrirse con las dependencias disponibles y se conoce si requiere Internet.

## Conclusión

La base visual es fuerte y reutilizable. Su mayor valor está en la combinación de un sistema de tarjetas consistente, una paleta con estados semánticos, una atmósfera tecnológica permanente y escenas gráficas que traducen conceptos abstractos a metáforas visuales. No hace falta abandonar este lenguaje para cambiar de tema.

La mejora más importante no es añadir más efectos, sino separar el diseño del contenido y corregir la desalineación entre la presentación web y `TAREA 6`. Una vez fijada la fuente de verdad, conviene limpiar el código huérfano, fijar dependencias, centralizar tokens y crear plantillas de escenas. Con esas decisiones, la siguiente exposición podrá reutilizar la identidad visual sin volver a construir la presentación desde cero.

## Referencias internas

- `index.html:1-20`: metadatos, fuentes y librerías externas.
- `index.html:21-1016`: estructura completa de la presentación.
- `script.js:1-230`: inicialización y comportamiento.
- `style.css:1-2464`: sistema visual, escenas, responsive y animaciones.
- `TAREA 6.pdf`: informe ITIL de 7 páginas.
- `TAREA 6.docx`: versión editable del mismo informe ITIL.

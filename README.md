# 🎮 Juego Jeopardy - Evento Presencial

Un juego tipo programa de TV estilo Jeopardy diseñado para eventos presenciales con proyección en pantalla grande.

## 🚀 Características

- **Tablero completo**: 6 categorías x 5 preguntas cada una
- **Temporizador visual**: Con animaciones y alertas
- **Sistema de puntajes**: Para 3 jugadores
- **Efectos visuales**: Animaciones y transiciones suaves
- **Sonidos simulados**: Sistema de sonidos configurable
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Control de juego**: Reiniciar, configuración, etc.

## 🎯 Categorías Incluidas

1. **Historia** - Eventos históricos importantes
2. **Ciencia** - Conocimiento científico general  
3. **Deportes** - Deportes y eventos deportivos
4. **Entretenimiento** - Cine, música y cultura pop
5. **Geografía** - Países, capitales y geografía mundial
6. **Tecnología** - Innovaciones y empresas tech

## 🎮 Cómo Usar

### Configuración Inicial
1. Abre `index.html` en tu navegador
2. Proyecta la pantalla en un display grande
3. Configura el tiempo por pregunta (10-60 segundos)
4. Selecciona el jugador actual

### Durante el Juego
1. **Seleccionar pregunta**: Haz clic en cualquier valor del tablero
2. **Timer automático**: Cuenta regresiva con efectos visuales
3. **Revelar respuesta**: Botón para mostrar la respuesta correcta  
4. **Puntuar**: Botones Correcto/Incorrecto para actualizar puntajes
5. **Cambiar jugador**: Usa el selector en configuración

### Controles del Host
- **Reiniciar Juego**: Volver a empezar con todas las preguntas
- **Configuración**: Ajustar timer, sonidos, jugador actual
- **Cerrar Modal**: Click fuera o botón cerrar

## 📁 Estructura de Archivos

```
juegosjeopardy/
├── index.html          # Página principal
├── styles.css          # Estilos y animaciones
├── script.js           # Lógica del juego
└── README.md           # Este archivo
```

## 🎨 Diseño para Pantalla Grande

- **Tipografía grande** y legible desde lejos
- **Colores contrastantes** (azul/dorado como Jeopardy real)
- **Animaciones llamativas** para mantener atención
- **Grid responsive** se adapta a resoluciones diferentes

## ⚙️ Personalización

### Cambiar Preguntas
Edita el array `questions` en `script.js`:

```javascript
let questions = [
    { category: 'Tu Categoría', questions: [
        { question: '¿Tu pregunta?', answer: 'Tu respuesta', value: 100, answered: false },
        // ... más preguntas
    ]},
    // ... más categorías
];
```

### Modificar Estilos
- Colores: Edita las variables CSS en `styles.css`
- Animaciones: Modifica `@keyframes` 
- Layout: Ajusta `.game-board` grid

### Agregar Sonidos Reales
Reemplaza `playSound()` en `script.js` con Audio API:

```javascript
function playSound(type) {
    if (!soundEnabled) return;
    const audio = new Audio(`sounds/${type}.mp3`);
    audio.play();
}
```

## 🖥️ Proyección

### Configuración Recomendada
- **Resolución**: 1920x1080 o superior
- **Navegador**: Chrome/Firefox para mejor rendimiento
- **Modo**: Pantalla completa (F11)
- **Conexión**: HDMI para mejor calidad

### Tips para Eventos
1. **Prueba previa**: Testa todo antes del evento
2. **Backup**: Ten una segunda computadora lista
3. **Sonido**: Conecta altavoces para mejor experiencia
4. **Host**: Designa a alguien para manejar el juego

## 🔧 Solución de Problemas

### Problemas Comunes
- **Modal no se cierra**: Refresca la página
- **Timer no funciona**: Verifica JavaScript habilitado
- **Diseño roto**: Prueba con otro navegador

### Mejoras Futuras
- [ ] Sonidos reales con archivos MP3
- [ ] Más categorías y preguntas
- [ ] Guardar puntajes en localStorage
- [ ] Efectos de partículas
- [ ] Modo pantalla completa automático

## 📝 Licencia

Libre para usar en eventos educativos y de entretenimiento.

---

¡Que disfruten el juego! 🎉

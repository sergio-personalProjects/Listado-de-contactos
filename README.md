# Agenda y Decretos

## 1. Descripción General del Proyecto

**Agenda y Decretos** es una aplicación web desarrollada en Angular que permite gestionar y consultar la agenda municipal, así como los decretos y normativas publicadas por la entidad. 

Esta aplicación proporciona una interfaz moderna e intuitiva para que los usuarios puedan:
- Acceder a los decretos y normativas vigentes
- Localizar de forma sencilla los contactos del personal

El proyecto está estructurado siguiendo las mejores prácticas de Angular, incluyendo componentes reutilizables, servicios para la gestión de datos, enrutamiento dinámico e interfaces TypeScript tipadas.

---

## 2. Tecnologías y Lenguajes Utilizados

### Framework y Librerías Principales
- **Angular 17.3.0** - Framework frontend progresivo para la construcción de aplicaciones SPA
- **TypeScript 5.4.2** - Lenguaje de programación con tipado estático basado en JavaScript
- **RxJS 7.8.0** - Librería para programación reactiva con Observables

### Estilos y Diseño
- **Tailwind CSS** - Framework de CSS utility-first para diseño responsivo
- **Google Fonts (Lato)** - Familia tipográfica personalizada para la aplicación

### Herramientas de Desarrollo
- **Angular CLI 17.3.11** - Herramienta de línea de comandos para desarrollo y compilación

### Estructura del Proyecto
```
src/
├── app/
│   ├── components/     # Componentes reutilizables
│   ├── interfaces/     # Interfaces TypeScript
│   ├── services/       # Servicios para gestión de datos
│   ├── app.ts         # Componente raíz
│   ├── app.html       # Template principal
│   ├── app.css        # Estilos globales
│   ├── app.config.ts  # Configuración de Angular
│   └── app.routes.ts  # Definición de rutas
├── assets/            # Recursos estáticos (imágenes, iconos)
├── styles.css         # Estilos globales
├── index.html         # Archivo HTML principal
└── main.ts           # Punto de entrada de la aplicación
```

---

## 3. Fuentes de Datos

El proyecto está diseñado para trabajar con datos relacionados con:

- **Agenda**: Información de contacto del personal de la entidad
- **Decretos y Normativas**: Disposiciones administrativas y regulaciones publicadas por la entidad

Los datos se gestionan a través de:
- **Servicios Angular**: Ubicados en la carpeta `services/`, se encargan de recuperar y gestionar los datos
- **Interfaces TypeScript**: Definidas en `interfaces/`, garantizan la tipificación correcta de los datos
- **Componentes**: Consumen los datos a través de los servicios para mostrarlos en la interfaz

### Nota sobre las APIs
Para identificar las fuentes específicas de datos (APIs externas o bases de datos locales), consulta los servicios en la carpeta `src/app/services/`.

---

## Cómo Ejecutar el Proyecto

### Instalación de dependencias
```bash
npm install
```

### Iniciar el servidor de desarrollo
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

### Compilar para producción
```bash
npm run build
```

### Ejecutar pruebas unitarias
```bash
npm test
```

---

*Última actualización: 2026*

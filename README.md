# Frontend - Gestión de Posts, Comentarios y Categorías

Este proyecto es una aplicación frontend desarrollada en Angular que permite la gestión de publicaciones, categorías y comentarios. La aplicación utiliza un diseño responsivo con Bootstrap y funcionalidades adicionales como modales y alertas con SweetAlert2. Además, incluye la integración de iconos de FontAwesome.


## Prueba Tecnica en Producción
  [Ver Proyecto](https://postcomments.netlify.app/)

## Tabla de Contenido
1. [Tecnologías Utilizadas](#tecnologías-utilizadas)
2. [Funcionalidades](#funcionalidades)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación](#instalación)
5. [Ejecución del Proyecto](#ejecución-del-proyecto)
6. [Estructura del Proyecto](#estructura-del-proyecto)
   - [Componentes Clave](#componentes-clave)
   - [Servicios Clave](#servicios-clave)
7. [Variables de Entorno](#variables-de-entorno)
8. [Estilo](#estilo)

## Tecnologías Utilizadas

- **Angular**: Framework para la creación de aplicaciones frontend.
- **Bootstrap**: Para el diseño y el estilo responsivo de la interfaz.
- **SweetAlert2**: Para el manejo de alertas y confirmaciones de forma elegante.
- **FontAwesome**: Para la inclusión de iconos en la interfaz de usuario.
- **Git**: Control de versiones.
- **GitHub**: Repositorio remoto.

## Funcionalidades

- **Gestión de publicaciones**: CRUD completo para crear, editar, eliminar y listar publicaciones.
- **Gestión de comentarios**: CRUD para añadir, editar y eliminar comentarios desde el detalle de las publicaciones.
- **Gestión de categorias**: CRUD completo para crear, editar, eliminar y listar publicaciones.
- **Gestión de detalles del post**: Muestra la publicación completa, incluyendo sus comentarios y las categorías asignadas.
- **Selección de categorías**: Implementación de modales para seleccionar las categorías de las publicaciones.
- **Manejo de errores**: Manejo centralizado de errores utilizando **SweetAlert2** para mostrar notificaciones de error, tanto en peticiones HTTP fallidas como en validaciones.
- **Paginación**: Listado de publicaciones con paginación de 10 en 10 desde el servidor.
- **Alertas personalizadas**: Uso de SweetAlert2 para manejar mensajes de éxito, errores y confirmaciones.


## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) V. 20.11.0
- [Angular CLI](https://angular.io/cli) V. 18.2.4
- [Git](https://git-scm.com/)

## Instalación

1. Clona el repositorio desde GitHub:

   ```bash
    https://github.com/LuisJrDev/Frontend_Prueba_Tecnica.git

2. Navega a la carpeta del proyecto:

    ```bash
    cd Frontend_Prueba_Tecnica

3. Instala las dependencias del proyecto:

   ```bash
   npm install

## Ejecución del Proyecto

Para ejecutar el proyecto en un entorno de desarrollo, utiliza el siguiente comando:

      ng serve

Luego, abre tu navegador y accede a http://localhost:4200.

## Estructura del Proyecto

El proyecto sigue la estructura típica de Angular:

      src/
       ├── app/
       │    ├── components/
       │    │    ├── post/
       │    │    │     ├── post-detail 
       │    │    │     ├── post-list 
       │    │    │     └── post-form
       │    │    └── category/
       │    │    │     ├── category-form
       │    │    │     └── category-list
       │    ├── services/
       │    │    ├── post.service.ts
       │    │    ├── category.service.ts
       │    │    └── comment.service.ts
       │    └── models/
       │         ├── post.model.ts
       │         ├── post-detalles.model.ts
       │         ├── category.model.ts
       │         └── comment.model.ts
       └── environments/

### Componentes Clave
  - PostListComponent: Muestra el listado de publicaciones con opciones para crear, editar y eliminar.
  - PostDetailComponent: Muestra el detalle de una publicación, incluyendo los comentarios y las categorias.
  - CategoryListComponent: Muestra el listado de categorias con opciones para crear, editar y eliminar.

### Servicios Clave
  - PostService: Interactúa con el backend para la gestión de publicaciones.
  - CategoryService: Gestiona la selección de categorías.
  - CommentService: Maneja los comentarios.


## Variables de Entorno

El proyecto incluye un archivo de configuración para entornos de desarrollo en `src/environments/environment.ts`. Asegúrate de configurar la URL base de la API:

      export const environment = {
        production: false,
        apiUrl: 'http://localhost:5228/api'
      };

## Estilo

El proyecto está estilizado utilizando Bootstrap.

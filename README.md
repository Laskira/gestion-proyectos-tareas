# Gestión de proyectos y tareas

Aplicación básica de gestión construida con Angular. Permite a los usuarios autenticarse, gestionar proyectos y tareas, así como realizar operaciones básicas sobre los datos obtenidos de una API pública.

## Instalación y Ejecución
#### Requisitos:
- Node.js (v14 o superior)
- npm (Gestor de paquetes)

#### Paso a Paso

1. Clonar el repositorio:
```
git clone https://github.com/Laskira/gestion-proyectos-tareas.git
cd gestion-proyectos-tareas

```
2. Instalar dependencias:
```
npm i
```
2. Ejecutar la aplicación:
```
ng serve
```
Navega a `http://localhost:4200/login`

## Rutas y sus caracteristicas
##### Ingreso a la app
- `http://localhost:4200/login` 
    * Usuario:
        correo: `prueba@gmail.com`
        contraseña: `12345678`

#### Módulo de proyectos
##### Listado de proyectos
- `http://localhost:4200/app/projects` 
##### Creación de un proyecto
- `http://localhost:4200/app/projects/create`
##### Edición de un proyecto
- `http://localhost:4200/app/projects/edit/:id` 

#### Módulo de tareas
##### Listado de todas las tareas existentes
- `http://localhost:4200/app/tasks
##### Listado de tareas de un proyecto
- `http://localhost:4200/app/tasks/:id` 
Nota: notese que se hace referencia al id de un proyecto
##### Creación de una tarea
- `http://localhost:4200/app/tasks/create`
##### Edición de una tarea
- `http://localhost:4200/app/tasks/edit/:id` 
    

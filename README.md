# Curso practico NodeJS
Backend completo de la red social minimalista PlatziSocial. Creamos microservicios con usuarios, posts, follow e interacciones.

# Aqui podras hacer las consultas a las endpoints

<a href="https://vercel.com/victor-guzmans-projects/curso-practico-node-js" target="_blank">https://vercel.com/victor-guzmans-projects/curso-practico-node-js</a>

# Documentacion de la API

**Link en swagger**
https://editor.swagger.io/?_gl=1*ar1gdt*_gcl_au*Mjg5MjgxMjg5LjE3MDM3MzYxNjU.&_ga=2.245253895.308490089.1703736165-1268619513.1703736165

**Path dentro de la app**
/api-docs


## Endpoints

**User**
/api/user
/api/user/{userId}

**Posts**
/api/post
/api/post/{postId}

## Usage
Para correr el proyecto en local:

1- Clonar el repo de github en la rama main

2- Instalar las dependencias de node 
    - ```npm install```
3- Instalar dependencias globales
    - ```npm install -g nodemon```
    - ```npm install -g pm2```
    - ```npm install -g npm```

4- Correr los microservicios
    - ```nodemon api/index.js```
    - ```nodemon post/index.js```
    - ```nodemon mysql/index.js```

5- Ya podemos hacer peticiones en postman para nuestros servicios, la coleccion de postman esta incluida en el repo en la carpeta de collection
    - CRUD para user
    - CRUD para posts 

## Observaciones
- Para activar la funcionalidad del cache, descomentar linea 27 y comentar la 28 del archivo controller.js del componente user
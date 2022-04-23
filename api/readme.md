# TuFinde APP (API)

## Readme de la API de TuFinde!

### Rutas principales

Ruta | Descripción 
--- | --- 
/user | Ruta para interactuar con el usuario
/bebidas | Ruta para interactuar con las bebidas

## Endpoints de cara ruta:

#### /user

Tipo | Ruta | Descripción
--- | ---
POST | /login | Ruta para iniciar sesión
POST | /register | Ruta para registrarte como usuario

#### /user/favoritos

Tipo | Ruta | Descripción
--- | ---
GET | /ver | Ruta para ver las bebidas favoritas
POST | /agregar | Ruta para agregar una bebida a favoritos
DELETE | /remover | Ruta para eliminar una bebida de favoritos

#### /bebidas

Tipo | Ruta | Descripción | Tipos de query
--- | ---
GET | /todas | Ruta para ver las todas bebidas
GET | / filtrar | Ruta para filtrar las bebidas | nombre
GET | /:id | Ruta para ver una bebida en específico, en éste caso por ID
GET | /likes | Ruta para darle Me Gusta a una bebida
POST | /like | Ruta para darle Me Gusta a una bebida
DELETE | /like | Ruta para quitar el Me Gusta a una bebida
POST | /comentario | Ruta para agregar un comentario a una bebida
PUT | /comentario | Ruta para editar el comentario de una bebida
DELETE | /comentario | Ruta para eliminar un comentario de una bebida

#### /mis-bebidas

Tipo | Ruta | Descripción
--- | ---
POST | /agregar | Ruta para agregar una bebida a la base de datos
PUT | /editar | Ruta para editar una bebida de la base de datos
DELETE | /remover | Ruta para eliminar una bebida de la base de datos
GET | /ver | Ruta para ver las bebidas agregadas a la base de datos

### Se irán agregando rutas a medida que se requieran.

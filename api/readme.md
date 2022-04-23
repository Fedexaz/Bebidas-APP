# TuFinde APP (API)

## Readme de la API de TuFinde!

### Rutas principales

* /user
* /user/favoritos
* /bebidas

## Endpoints de cara ruta:

#### /user

* [POST] /login
* [POST] /register

#### /bebidas

* [GET] /bebidas/ver
* [POST] /bebidas/agregar
* [PUT] /bebidas/editar
* [DELETE] /bebidas/remover
* [POST] /bebidas/comentar
* [GET] /bebidas/likes <-- VER LIKES DE UNA BEBIDA
* [POST] /bebidas/like <-- AGREGAR LIKE A UNA BEBIDA
* [GET] /todas
* [GET] /filtrar
* [GET] /:id

#### /user/favoritos

* [GET] /ver
* [POST] /agregar
* [PUT] /editar
* [DELETE] /remover
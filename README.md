<p align="right">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

![alt text](image.png)
# Ejecutar en desarrollo

1. clonar el repositorio.
2. Ejecutar.
```
npm instal
```
3. Tener Nest CLI instalado.
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
~~~
docker compose up -d
~~~
5. Recomtrir la base de datos con la semilla

```
http://localhost:3000/api/v2/seed

```
## Stack  usado
* Mongodb 
* Nestjs

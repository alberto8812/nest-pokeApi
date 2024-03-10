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
5. Clonar el archivo __.env.template__ y renombrar la copia a
__.env__

6. Llenar las varaibles de entorno definidad  en el ```.env```

7.Ejecutar la aplicacion en dev:
```
npm run start:dev
```
8. Reconstruir la base de datos con la semilla

```
http://localhost:3000/api/v2/seed

```

# production build
1. Crear el archivo ```.env.prod```
2. Completar las variables de entorno de prod
3. Crear la nueva imagen 
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```


## Stack  usado
* Mongodb 
* Nestjs

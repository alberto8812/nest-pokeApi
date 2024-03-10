#instalar dependencias
FROM node:20-alpine3.18 AS deps
RUN apk add --no-cache libc6-compat #configuracion para nest
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

#build the app with cache  dependencias
FROM node:20-alpine3.18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY  . .
RUN npm run build


# Production image, copy all the files and run next
FROM node:20-alpine3.18 AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --prod

COPY --from=builder /app/dist ./dist

# # Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3000

CMD [ "node","dist/main" ]

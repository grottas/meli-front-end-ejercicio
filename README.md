# Test Front-End para MercadoLibre

Ejercicio práctico de front-end para MercadoLibre. Se puede ver una version estable del proyecto [aqui](http://nach.com.ar/meli).

## Setup

Como dependencia del proyecto se encuentra [Nodejs](https://nodejs.org/es/) > v6.0. Para tener una instalación que
respete esta restriccion consultar [aqui](https://nodejs.org/es/download/package-manager/). 

El resto de las dependencias se encuentran listadas en el archivo `app/package.json` y son instalables via `npm`. 

```
$ cd app
$ npm install 

```

### Levantar el servidor

Para levantar el servidor en modo desarrollo ejecutar `DEBUG=app:* npm run devstart` desde la carpeta `app`. 

Para levantar el servidor en modo produccion, ejecutar `NODE_ENV=production npm start` desde la carpeta `app`.

Ni el modo desarrollo ni el modo produccion del servidor compilan assets. Para esta tarea leer la seccion siguiente.

### Compilar assets

La compilación y minificación de js y css se realiza usando [Gulp](https://gulpjs.com/). 

Si se desea dejar los assets preparados para produccion, basta con ejecutar `gulp` desde la carpeta `app`, mientras que
durante el proceso de desarrollo es conveniente tener el proceso escuchando cambios en los archivos, lo cual se puede
logar ejecutando `gulp watch`.


## Proceso

- Usé la pagina oficial de express como guia
- Aunque no utilicé todos los atributos de la api para renderizar los templates, mantuve la estructura propuesta y
agregué otros atributos que me resultaban de utilidad
- Que onda "author" en la respuesta de la api?
- Underscore y Backbone

## Pendientes
- Chequear si la query es un id y entonces redireccionar a la vista del item
- Revisar usabilidad. Hacer mas semantico el html. Agregar ARIA
- Modo produccion del server https://www.digitalocean.com/community/tutorials/how-to-deploy-node-js-applications-using-systemd-and-nginx
- Documentar codigo
- Benchmark y performance http://expressjs.com/es/advanced/best-practice-performance.html
- Usar ruteo inteligente para assets
- Usar generador de urls para linkear desde los templates
- En /item/:id que la columna de la derecha te acompañe al scrollear
- Items sin imagen ?
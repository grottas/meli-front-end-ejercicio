# Test Front-End para MercadoLibre

Ejercicio práctico de front-end para MercadoLibre. Se puede ver una version estable del proyecto [aqui](https://nach.com.ar/meli).

- [Ejercicio](#ejercicio)
  - [Especificaciones](#especificaciones)
  - [Implementación y tecnologias usadas](#implementaci%C3%B3n-y-tecnologias-usadas)
  - [Comentarios relevantes](#comentarios-relevantes)
  - [Pendientes](#pendientes)
- [Setup](#setup)
  - [Levantar el servidor](#levantar-el-servidor)
  - [Compilar assets](#compilar-assets)

## Ejercicio

### Especificaciones

Los archivos correspondientes a la especificación del ejercicio se encuentran en la carpeta `ejercicio`. Dentro de ella
se encuentra [un pdf](./ejercicio/front-end-test-practico.pdf) que describe la funcionalidades y requisitos esperados
que contenga el proyecto, y en el resto de las carpetas se encuentran distribuidos los [assets](./ejercicio/assets), 
los [diseños](./ejercicio/diseños) y las [especificaciones de diseño](./ejercicio/specs) necesarias.

### Implementación y tecnologias usadas

El proyecto contiene un servidor montado en [nodejs](https://nodejs.org/) utilizando [expressjs](http://expressjs.com/) 
como framwork del lado del servidor y utilizando [backbone](http://backbonejs.org/) en el lado del cliente. Se utilizó 
[gulp](https://gulpjs.com/) para manejo de archivos js y scss, y se utilizan dentro del stack del cliente las librerias 
[underscore](http://underscorejs.org/) y [jquery](https://gulpjs.com/). 

### Comentarios relevantes

Al momento de empezar el ejercicio no me encontraba familiarizado con expressjs, con lo cual tomé la oportunidad para
poder aprender los conceptos básicos de este framework. Utilicé como principal referencia la [documentación oficial de 
express](http://expressjs.com/en/4x/api.html) junto a las guías presentadas en su sitio oficial.

Ademas de consultar los metodos de la api de mercado libre detallados en el pdf de especificaciones, tambien realizo
consultas al metodo correspondiente a la información detallada de imagenes de items y a la información de categorias
de un item en particular. El primero metodo, correspondiente a la url `https://api.mercadolibre.com/pictures?ids=:ids`,
se consulta para poder acceder a imagenes de mejor calidad para utilizar en el listado de resultados. Mientras que el
segundo metodo, correspondiente a la url `https://api.mercadolibre.com/categories/:category_id`, se consulta para poder
generar el breadcrumb necesario en la vista de un item. 

En mi ambiente de desarrollo, el servidor de express tardaba un tiempo considerable en hacer el pasamanos de información
de la informción devuelta por la api de mercadolibre. Para mitigar un poco este delay, decidí mockear la lista de resultados
sin información para poder dar cierto feedback inmediato al usuario y no generar confusion al momento de realizar 
interacciones que puedan tener un delay considerable. 

El maquetado de las pantallas sigue la linea de las especificaciones propuestas en los archivos del ejercicio, pero tambien
se agregaron 2 breakpoints para anchos de cliente de  576px y 768px. El diseño de la lista de resultados y de detalle de
item se adaptan a resoluciones mas pequeñas en estos dos breakpoints. Tomé como referencia el sitio mismo de mercadolibre
para maquetar estos cambios.

Tambien agregué maquetado para pantallas de [404](http://nach.com.ar/meli/una_ruta_que_no_existe),
[busqueda sin resultados](https://nach.com.ar/meli/items?search=unabusquedaquenotieneresultados) e 
[item no encontrado](https://nach.com.ar/meli/item/id_que_no_existe) 

Hay una demo del proyecto hosteada en [https://nach.com.ar/meli](https://nach.com.ar/meli). Para que esto funcionase tuve
que adaptar el servidor para que no necesariamente esté levantado desde un dominio y pueda ser hostedo bajo una ruta 
customizable. El proyecto escucha la variable de entorno `EXPRESS_BASE_PATH`. Si esta está especificada en, por ej, `/meli/`
entonces las urls registradas y generadas por la aplicación seran de la forma `http(s)://dominio/meli/`. Esto deja 
pendiente el ruteo de los archivos estaticos, que en el caso de [https://nach.com.ar/meli](https://nach.com.ar/meli) 
se realiza via nginx.  

### Pendientes

Me quedaron pendientes al momento de cerrar este ejercicio. Estos son:
- Revisar usabilidad y darle mas ganas al maquetado semantico. Incorporar atributos de ARIA. 
- Realizar una mejor documentar del codigo. Agregar comentarios a todos los metodos para dejar en claro su funcionamiento 
esperado, parametros que reciben y contexto de ejcución.
- Implementar cache de respuestas, sobretodo para consultas a la api de mercadolibre.
- Integrar analytics y servicios de monitoreo, tanto del lado del servidor como del cliente, para llevar registro de 
uso, performance y posibles errores no atrapados de la aplicación

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
Se recomienda levantar el proceso mediante un gestor de servicios. El archivo `app/meli.service.example` es un ejemplo
del archivo de configuración de `systemd` utilizado en [nach.com.ar/meli](https://nach.com.ar/meli).

Ni el modo desarrollo ni el modo produccion del servidor compilan assets. Para esta tarea leer la seccion siguiente.

### Compilar assets

La compilación y minificación de js y css se realiza usando [Gulp](https://gulpjs.com/). 

Si se desea dejar los assets preparados para produccion, basta con ejecutar `gulp` desde la carpeta `app`, mientras que
durante el proceso de desarrollo es conveniente tener el proceso escuchando cambios en los archivos, lo cual se puede
logar ejecutando `gulp watch`.
# Test Front-End para MercadoLibre

## Dependencias

- [Nodejs](https://nodejs.org/es/) > v6.0
- [NPM](https://www.npmjs.com/)
- [SASS](http://sass-lang.com/)

## Setup

Instalar dependencias del proyecto:

cd app
npm install
DEBUG=app:* npm start
DEBUG=app:* npm run devstart

ref: https://github.com/tastejs/todomvc/blob/master/examples/backbone/index.html

## Contar el proceso acá

- Usé la pagina oficial de express como guia
- Aunque no utilicé todos los atributos de la api para renderizar los templates, mantuve la estructura propuesta y
agregué otros atributos que me resultaban de utilidad
- Que onda "author" en la respuesta de la api?
- Underscore y Backbone

## Pendientes
- Chequear si la query es un id y entonces redireccionar a la vista del item
- Responsiveness
- Consistencia aun bajo throttiling bajo
- Cache para assets
- Gzip
- Revisar usabilidad. Hacer mas semantico el html. Agregar ARIA
- Modo produccion del server
- Documentar codigo
- Manejo de errores. Pagina de 500. Pagina de 404. Pagina de "no hay resultados"
- Benchmark y performance
- Usar ruteo inteligente para assets
- Usar generador de urls para linkear desde los templates

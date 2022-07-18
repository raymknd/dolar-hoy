# dolar-hoy
 
Inicio rápido: <code>npm run init</code><br/>
Para producción: <code>/dist/webApp/</code>
## Archivos TS
En <code>/src</code> estan los archivos TS y JS de desarrollo, una vez modificados el comando <code>npm run bundle</code> va compilar y bundlear los archivos para su uso en producción, el archivo final es <code>/dist/webApp/js/app.js</code>
## Scss
Idealmente trabajar el SCSS en módulos. Importar todos los módulos a <code>main.scss</code>, y al momento de pasar la app a producción, minimizar <code>main.css</code> (en VSC: Seleccionar el contenido del archivo con CMD/CTRL + A, abrir la paleta de comandos de VSC con CMD/CTRL + P y escoger "Join lines") y finalmente borrar todos los archivos SCSS.


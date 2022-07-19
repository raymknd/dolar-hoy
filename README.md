# dolar-hoy
 
Inicio rápido: <code>npm run init</code><br/>
Para producción: <code>/dist/webApp/</code>
## Archivos TS
En <code>/src</code> estan los archivos TS y JS de desarrollo, una vez modificados el comando <code>npm run bundle</code> va compilar y bundlear los archivos para su uso en producción, el archivo final es <code>/dist/webApp/js/app.js</code>
## Scss
Idealmente trabajar el SCSS en módulos. Importar todos los módulos a <code>main.scss</code>, y al momento de pasar la app a producción, minimizar <code>main.css</code> (en VSC: Seleccionar el contenido del archivo con CMD/CTRL + A, abrir la paleta de comandos de VSC con CMD/CTRL + P y escoger "Join lines") y finalmente borrar todos los archivos SCSS.
## new Currency() y InputHandler();
Currency es la clase encargada de calcular el valor de las divisas para mostrarlas al usuario. Idealmente no modificar ni Currency ni InputHandler para evitar dañar el behavior de la app.
### Conceptos básicos
<code>InputHandler()</code> se encarga de tomar, limpiar y devolver los resultados.<br/><br/>
<code>InputHandler(f: HTMLInputElement, s: HTMLInputElement, a: Currency, r?: number)</code><br/>
 - f [HTMLInputElement]: Es la primera input y de donde se tomará el valor del usuario.
 - s [HTMLInputElement]: Es la segunda input y es donde se mostrará el resultado de la conversión.
 - a [Class:::Currency]: Clase Currency ya iniciada.
 - r? [number]: Números después de la coma en el resultado de la conversión, si es nulo cae al fallback que es 2.<br/>
### Los valores de la divisa base y se toman de los dataset en la raíz de la input.



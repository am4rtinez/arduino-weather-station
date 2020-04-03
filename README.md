# Arduino-Weather-Station
Proyecto arduino para controlar varios sensores para una estación meteorológica.
---

El proyecto tiene el objetivo de implementar una estación meteorológica. En una primera fase medirá temperatura, humedad, presión atmosférica y luminosidad. 

> Hay que estudiar si es factible realizar una medición de la dirección y velocidad del viento (segunda fase). 

Una vez implementada hay que recoger los datos desde una fuente externa como una RPi o el microserver ya implementado para otros menesteres (corriendo una debian sin entorno gráfico). 

Para ello es necesario seleccionar el método de conexion Ardunio - RPi/Microserver (lo nombraremos DataCenter para abreviar). Por distancia parece conveniente utilzar el metodo de conexión Wi-Fi.

Una vez resuelto el problema de comunicación hay que estudiar si las peticiones de datos las lanza DataCenter o Arduino es la encargada de lanzar los datos.

Los datos obtenidos seran almacenados en una BD. MySQL o MariaDB (aun pendiente analizar si usar PSQL).

Hay que intentar que una vez obtenidos los datos se realice un análisis de los mismos e incluso se puedan realizar pequeñas predicciones.

> Queda pendiente añadir alguna mejora más como dirección del viento o velocidad del mismo.

## Componentes

Los componentes a utilizar para iniciar el proyecto:

* Arduino UNO / Arduino Nano (una vez el proyecto sea viable).
* Sensor DHT22 (Temperatura y humedad).
* Sensor BMP280 (Presión atmosférica).
* Sensor LDR (Luminosidad).
* Resistencias (220 Oms, 10K Oms, etc).
* Display LCD 16x2 conectado con I2C.
* Botones.
* Módulo Wi-Fi.
* Caja impresa en 3D.
* Chip para conexiones.
* Protoboard (Hasta que quede montado en chip).

---

## Diseño esquema montaje

> Pendiente de modificar y/o añadir componentes segun se vaya planteando el proyecto.

Diseñado con fritzig.

![Imagen de idea_inicial](docs/img/arduino-weather-station_bb.png)

## Diseño BBDD.

El motor de BBDD utilizado es MariaDB. En este momento el server core es la versión 10.3.

La BD contiene 3 tablas:

* Temperature.
* Preasure.
* Humidity.

Cada tabla comparte la misma estructura (3 campos de datos)  solo cambia el nombre del campo de datos.

Campos:

* ID - Tipo INT (auto incremental).
* DATA - Tipo FLOAT (temperature, preasure, humidity).
* DATE - Tipo TIMESTAMP (current_timestamp).

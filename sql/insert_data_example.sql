--Query SQL para insertar 2022-06-datos ficticios en la BBDD y poder hacer pruebas con ella. Es necesario añadir los datos para cada tipo.

--Inserta datos ficticios para humedad. Previamente vacia la tabla.
TRUNCATE TABLE w_station.humidity;
INSERT INTO w_station.humidity (humidity, `date`) VALUES(45, "2022-06-02 01:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(65, "2022-06-02 02:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(35, "2022-06-02 03:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(60, "2022-06-02 04:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(75, "2022-06-02 05:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(80, "2022-06-02 06:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(80, "2022-06-02 07:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(85, "2022-06-02 08:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(90, "2022-06-02 09:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(70, "2022-06-02 10:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(55, "2022-06-02 11:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(60, "2022-06-02 12:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(65, "2022-06-02 13:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(70, "2022-06-02 14:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(75, "2022-06-02 15:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(90, "2022-06-02 16:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(100, "2022-06-02 17:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(90, "2022-06-02 18:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(90, "2022-06-02 19:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(70, "2022-06-02 20:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(50, "2022-06-02 21:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(60, "2022-06-02 22:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(35, "2022-06-02 23:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(30, "2022-06-03 00:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(80, "2022-06-03 01:00:00");
INSERT INTO w_station.humidity (humidity, `date`) VALUES(45, "2022-06-03 02:00:00");

--Inserta datos ficticios para presión atmosférica. Previamente vacia la tabla.
TRUNCATE TABLE w_station.preasure;
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1010, "2022-06-02 01:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1011, "2022-06-02 02:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1020, "2022-06-02 03:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1020, "2022-06-02 04:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1015, "2022-06-02 05:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1015, "2022-06-02 06:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1013, "2022-06-02 07:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1013, "2022-06-02 08:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1014, "2022-06-02 09:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1015, "2022-06-02 10:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1016, "2022-06-02 11:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1016, "2022-06-02 12:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1017, "2022-06-02 13:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1018, "2022-06-02 14:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1018, "2022-06-02 15:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1019, "2022-06-02 16:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1019, "2022-06-02 17:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1019, "2022-06-02 18:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1020, "2022-06-02 19:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1020, "2022-06-02 20:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1020, "2022-06-02 21:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1018, "2022-06-02 22:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1017, "2022-06-02 23:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1015, "2022-06-03 00:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1013, "2022-06-03 01:00:00");
INSERT INTO w_station.preasure (preasure, `date`) VALUES(1011, "2022-06-03 02:00:00");

--Inserta datos ficticios para temperatura. Previamente vacia la tabla.
TRUNCATE TABLE w_station.temperature;
INSERT INTO w_station.temperature (temperature, `date`) VALUES(13.55, "2022-06-02 01:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(13.90, "2022-06-02 02:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(13.95, "2022-06-02 03:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(14.45, "2022-06-02 04:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(15.85, "2022-06-02 05:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(15.85, "2022-06-02 06:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(16.05, "2022-06-02 07:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(16.15, "2022-06-02 08:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(16.35, "2022-06-02 09:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(16.60, "2022-06-02 10:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(17.65, "2022-06-02 11:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(18.70, "2022-06-02 12:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(19.10, "2022-06-02 13:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(20.5, "2022-06-02 14:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(20.5, "2022-06-02 15:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(21.35, "2022-06-02 16:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(22.35, "2022-06-02 17:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(23.10, "2022-06-02 18:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(23.60, "2022-06-02 19:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(22.10, "2022-06-02 20:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(20.05, "2022-06-02 21:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(15.05, "2022-06-02 22:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(13.85, "2022-06-02 23:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(12.75, "2022-06-03 00:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(12.05, "2022-06-03 01:00:00");
INSERT INTO w_station.temperature (temperature, `date`) VALUES(12.45, "2022-06-03 02:00:00");

--Inserta datos ficticios para luminosidad. Previamente vacia la tabla.
TRUNCATE TABLE w_station.brightness;
INSERT INTO w_station.brightness (brightness, `date`) VALUES(10, "2022-06-02 01:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(10, "2022-06-02 02:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(10, "2022-06-02 03:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(10, "2022-06-02 04:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(30, "2022-06-02 05:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(60, "2022-06-02 06:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(80, "2022-06-02 07:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(95, "2022-06-02 08:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(95, "2022-06-02 09:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(100, "2022-06-02 10:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(100, "2022-06-02 11:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(100, "2022-06-02 12:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(75, "2022-06-02 13:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(75, "2022-06-02 14:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(60, "2022-06-02 15:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(85, "2022-06-02 16:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(85, "2022-06-02 17:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(85, "2022-06-02 18:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(65, "2022-06-02 19:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(55, "2022-06-02 20:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(40, "2022-06-02 21:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(30, "2022-06-02 22:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(20, "2022-06-02 23:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(10, "2022-06-03 00:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(10, "2022-06-03 01:00:00");
INSERT INTO w_station.brightness (brightness, `date`) VALUES(10, "2022-06-03 02:00:00");
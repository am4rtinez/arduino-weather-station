import router from '../router/index.js';
import Route from '../router/Route.js';

import homeView from '../views/home.js';
import temperatureView from '../views/temperature.js';
import humidityView from '../views/humidity.js';
import pressureView from '../views/pressure.js';
import brightnessView from '../views/brightness.js';
import mappingView from '../views/mapping.js';
import owDataView from '../views/owdata.js';

const routes = [
    new Route('home', '/', homeView),
    new Route('owdata', '/owdata', owDataView),
    new Route('temperature', '/temperature', temperatureView),
    new Route('humidity', '/humidity', humidityView),
    new Route('pressure', '/pressure', pressureView),
    new Route('brightness', '/brightness', brightnessView),
    new Route('mapping', '/mapping', mappingView)
];

router(routes);
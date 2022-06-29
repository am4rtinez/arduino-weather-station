import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import Dashboard from "../views/Dashboard.vue";
import Contact from "../views/Contact.vue";
import MapVue from "../views/Map.vue";
import Temperature from "../views/Temperature.vue"
import Humidity from "../views/Humidity.vue"
import Pressure from "../views/Pressure.vue"
import Brightness from "../views/Brightness.vue"

const routes = [
  { 
		path: "/", 
		name: "Home",
		component: Dashboard 
	},
	{ 
		path: "/temperature", 
		name: "Temperature",
		component: Temperature 
	},
	{ 
		path: "/humidity", 
		name: "Humidity",
		component: Humidity 
	},
	{ 
		path: "/pressure", 
		name: "Pressure",
		component: Pressure 
	},
	{ 
		path: "/brightness", 
		name: "Brightness",
		component: Brightness 
	},
	{ 
		path: "/about", 
		name: "About",
		component: About 
	},
  { 
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard 
	},
	{ 
		path: "/contact",
		name: "Contact",
		component: Contact 
	},
	{ 
		path: "/map",
		name: "Map",
		component: MapVue 
	},
];

const history = createWebHistory();

const router = createRouter({
	history,
	routes,
});

export default router
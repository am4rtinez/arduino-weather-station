import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

// require('./plugins/fontawesome');
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

createApp(App)
.use(router, BootstrapVue)
.component('fa', FontAwesomeIcon)
.mount('#app')
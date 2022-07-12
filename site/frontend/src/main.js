import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './index.css'

// require('./plugins/fontawesome');
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

createApp(App)
.use(router)
.component('fa', FontAwesomeIcon)
.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import Mixins from "@/mixins"

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleUser)

const app = createApp(App)

app.mixin(Mixins)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
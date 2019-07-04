import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import Notifications from 'vue-notification'
import VeeValidate from 'vee-validate'

Vue.use(Notifications)
Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
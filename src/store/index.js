import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

import { user } from './user'
import { alert } from './alert'

Vue.use(Vuex)

const pluginSetUserFormCookie = (store) => {
    if (!store.getters['user/token'] && Cookies.get('user')) {
        store.commit('user/setUserFromCookie', JSON.parse(Cookies.get('user')))
    }
}

export default new Vuex.Store({
    modules: {
        user,
        alert
    },
    plugins: [pluginSetUserFormCookie]
})
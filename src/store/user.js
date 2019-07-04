import server from '@/services/server'
import Cookies from 'js-cookie'
import router from '@/router'

const state = {
    name: null,
    email: null,
    token: null,
    status: null
}

const getters = {
    token: state => state.token || Cookies.get('se_token'), // TODO TODO:
    isAutorized: state => !!(state.token || Cookies.get('se_token')), // TODO TODO:
    name: state => state.name,
    email: state => state.email,
    status: state => state.status
}

const actions = {
    auth({ commit, dispatch }, data) {
        server.user.login(data, (res) => {
            console.log(res)
            if (res.success) {
                commit('setToken', res.key)
                server.user.info((res) => {
                    if (res.success) {
                        commit('setInfo', res.info)
                        dispatch('alert/notify', 'Авторизация прошла успешно', { root: true })
                        _authRouterPush(res.info.status) // TODO: TODO
                    } else {
                        console.log(res)
                    }
                })
            } else {
                commit('alert/setUserError', 'Предоставлены неверные данные', { root: true })
            }
        })
    },

    signUp({ commit, dispatch }, data) {
        // TODO регстриация пользователя, а пока просто входим.
        console.log(data)
        data = {
            email: 'revisor@bikes.test',
            password: 'Qw31A2'
        }
        server.user.login(data, (res) => {
            if (res.success) {
                commit('setToken', res.key)
                server.user.info((res) => {
                    if (res.success) {
                        commit('setInfo', res.info)
                        dispatch('alert/notify', 'Авторизация прошла успешно', { root: true })
                        _authRouterPush(res.info.status) // TODO: TODO
                    } else {
                        console.log(res)
                    }
                })
            } else {
                commit('alert/setUserError', 'Предоставлены неверные данные', { root: true })
            }
        })
    },

    logout({ commit }) {
        server.user.logout((res) => {
            commit('deleteUser')
            $router.push({ name: 'login' })
        })
    },

    updateData({ commit, dispatch }, data) {
        server.user.updateData(data, (res) => {
            if (res.success) {
                dispatch('alert/notify', 'Сохранено', { root: true })
                commit('setInfo', data)
            } else {
                commit('alert/setUserError', res.msg, { root: true })
            }
        })
    }
}

const mutations = {
    setToken(state, token) {
        state.token = token
        Cookies.set('se_token', token)
    },

    setInfo(state, userInfo) {
        state.name = userInfo.name ? userInfo.name : state.name
        state.email = userInfo.email ? userInfo.email : state.email
        state.status = userInfo.status ? userInfo.status : state.status
        Cookies.set('user', JSON.stringify(state))
    },

    deleteUser(state) {
        state.name = null
        state.email = null
        state.token = null
        state.status = null
        Cookies.remove('user')
        Cookies.remove('se_token')
    },

    setUserFromCookie(state, data) {
        state.name = data.name
        state.email = data.email
        state.token = data.token
        state.status = data.status
    },

    successRouterPush(state, userInfo) {
        state.status = userInfo.status ? userInfo.status : state.status
    },
}

export const user = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}

function _authRouterPush(status) {
    console.log(status)
    if (status === 'owner') router.push({ name: 'offersGarage' })
    else router.push({ name: 'main' })
}
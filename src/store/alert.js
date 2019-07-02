const errorType = {
    wrong: 'wrong',
    success: 'success',
    error: 'error'
}

const state = {
    type: null, // success, wrong, error
    message: null
}

const getters = {
    error: state => state.type !== errorType.success ? state.message : null
}

const actions = {
    notifyEveryone({ commit }, messages) {
        setTimeout(() => {
            console.log('Отправили сообщение об ошибке к нам') // TODO: 2 Отправляем инфу об ошибке нам
            commit('setInternalError', messages.toUser)
        }, 700)
    },
    notify({ commit }, message) {
        console.info(message) // TO DO 10 оповещения красивым образом
        commit('clear')
    }
}

const mutations = {
    setUserError(state, message) {
        state.type = errorType.wrong
        state.message = message
    },
    setInternalError(state, message) {
        state.type = errorType.error
        state.message = message
    },
    clear(state) {
        state.type = null
        state.message = null
    }
}

export const alert = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}
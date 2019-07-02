import axios from 'axios'
import store from '@/store'

const API_URL = 'https://'

// HTTP
export const HTTP = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

HTTP.interceptors.request.use(
    function(config) {
        if (store.getters['user/isAutorized']) {
            config.headers.Authorization = `Bearer ${store.getters['user/token']}`
        }
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)
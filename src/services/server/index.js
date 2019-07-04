import { HTTP } from './http-common'
import api from './api'

export default {
    user: {
        login(data, callback) {
            /*HTTP.post(api.user.login, {
                    'email': data.email,
                    'password': data.password
                })
                .then((res) => {
                    let data = {
                        success: true,
                        key: res.data.key
                    }
                    callback(data)
                })
                .catch((error) => {
                    let clbData = {
                        success: false,
                        error
                    }
                    callback(clbData)
								})*/
            if (data.email === 'email@email.com' && data.password === 'password') {
                let clbData = {
                    success: true,
                    key: 'test_token'
                }
                callback(clbData)
            } else {
                let clbData = {
                    success: false,
                    error: 'Неверно введена пара "email" - "password"'
                }
                callback(clbData)
            }
        },

        logout(callback) {
            /*HTTP.post(api.user.logout)
                .then(res => {
                    callback(res)
                })
                .catch(error => {
                    console.log(error)
								})*/
            callback('logout-ok')
        },

        info(callback) {
            /*HTTP.get(api.user.info)
                .then((response) => {
                    let clbData = {
                        success: true,
                        info: {
                            email: response.data.email,
                            name: response.data.nickname,
                            status: response.data.status
                        }
                    }
                    callback(clbData)
                })
                .catch((error) => {
                    let clbData = {
                        success: false,
                        error
                    }
                    callback(clbData)
								})*/
            let clbData = {
                success: true,
                info: {
                    email: 'email@email.com',
                    name: 'Test user - client',
                    status: 'client'
                }
            }
            callback(clbData)
        }
    }
}
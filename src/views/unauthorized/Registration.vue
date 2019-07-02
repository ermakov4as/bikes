<template>
    <div>
        <h2>Регистрация</h2>
        <form @submit.prevent="handleSubmit">

						<div class="form-group">
                <label for="email">E-mail</label>
                <input type="text" v-validate="'required|email'" v-model="user.email" name="email" class="form-control"
                        :class="{ 'is-invalid': submitted && (!user.email || errors.has('email')) }" />
                <template v-if="submitted" class="invalid-feedback">
                    <div v-if="!user.email">Укажите e-mail</div>
                    <div v-else-if="errors.has('email')">Укажите корректный email</div>
                </template>
            </div>

            <div class="form-group">
                <label for="name">Имя</label>
                <input type="text" v-model="user.name" v-validate="'required'" name="name" class="form-control"
                        :class="{ 'is-invalid': submitted && (!user.name || errors.has('name')) }" />
                <template v-if="submitted" class="invalid-feedback">
                    <div v-if="!user.name">Укажите имя</div>
                    <div v-else-if="errors.has('name')">Укажите имя правильно</div>
                </template>
            </div>

            <div class="form-group">
                <label htmlFor="password">Пароль</label>
                <input type="password" v-model="user.password" v-validate="'required|min:6'" name="password" class="form-control"
                        :class="{ 'is-invalid': submitted && (!user.password || errors.has('password')) }" />
                <template v-if="submitted" class="invalid-feedback">
                    <div v-if="!user.password">Укажите пароль</div>
                    <div v-else-if="errors.has('password')">Укажите корректный пароль</div>
                </template>
            </div>

            <div class="form-group">
                <label htmlFor="confirm-password">Подтвердите пароль</label>
                <input type="confirm-password" v-model="confirmPassword" v-validate="'required|confirmed:password'" name="confirm-password" class="form-control"
                        :class="{ 'is-invalid': submitted && (!user.password || errors.has('confirm-password')) }" />
                <template v-if="submitted" class="invalid-feedback">
                    <div v-if="!confirmPassword">Укажите пароль</div>
                    <div v-else-if="errors.has('confirm-password')">Пароли не совпадают</div>
                </template>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Зарегистрироваться</button>
                <router-link :to="{ name: 'login' }" class="btn btn-link">Вход</router-link>
            </div>

        </form>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'registration',
    data () {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            },
            confirmPassword: '',
            submitted: false
        }
    },
    computed: {
        ...mapGetters('alert', ['error']),
    },
    methods: {
        ...mapActions('user', ['signUp', 'logout']),
        handleSubmit (e) {
            this.submitted = true
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.signUp(this.user)
                }
            })
        }
    }
}

</script>

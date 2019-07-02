<template>
    <div>
        <h2>Войти</h2>
        <form @submit.prevent="handleSubmit">
            <div v-if="error">{{ error }}</div>

            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="text" v-validate="'required|email'" v-model="email" name="email" class="form-control"
                        :class="{ 'is-invalid': submitted && (!email || errors.has('email')) }" />
                <template v-if="submitted" class="invalid-feedback">
                    <div v-if="!email">Укажите email</div>
                    <div v-else-if="errors.has('email')">Укажите корректный email</div>
                </template>
            </div>

            <div class="form-group">
                <label htmlFor="password">Пароль</label>
                <input type="password" v-validate="'required'" v-model="password" name="password" class="form-control"
                        :class="{ 'is-invalid': submitted && (!password || errors.has('password')) }" />
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Вход</button>
                <router-link :to="{ name: 'registration' }" class="btn btn-link">Регистрация</router-link>
            </div>
        </form>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'login',
    data () {
        return {
            email: '',
            password: '',
            submitted: false
        }
    },

    computed: {
        ...mapGetters('alert', ['error'])
    },

    methods: {
        ...mapActions('user', ['auth']),

        handleSubmit (e) {
            this.submitted = true
            this.$validator.validate()
                .then(valid => {
                    const { email, password } = this
                    this.auth({ email, password })
                })
        }
    }
}

</script>
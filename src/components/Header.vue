<template>
	<div>
		
		<!-- Ссылка на домашнюю страницу -->
		<!--<router-link to="/">
      <a class="navbar-brand" href="/">На главную</a>
    </router-link>-->
		<button class="header-button" @click.prevent="$router.push({name: 'main'})">На главную</button>

		<div class="header-button" v-if="!isLoggedIn">
			<button @click.prevent="$router.push({name: 'login'})">Войти</button>
		</div>

		<div class="header-button" v-else>
			<a>{{ user.email }}</a>
			<button @click.prevent="edit">Редактировать</button>
			<button @click.prevent="logout">Выход</button>
		</div>

		<!--<div class="collapse navbar-collapse" id="navbarCollapse">
			
			<ul class="navbar-nav" v-if="!isLoggedIn">
				<p>1</p>
				<li class="nav-item">
					<p>3</p>
					<router-link to="/login"><span class="nav-link">Войти</span></router-link>
				</li>
			</ul>

			<ul class="navbar-nav mr-2" v-else>
				<p>2</p>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
						aria-haspopup="true" aria-expanded="false">
						{{ user.email }}
					</a>

					<!-- Выпадающее меню действий с аккаунтом -->
					<!--<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">-->

						<!-- Ссылка на редактирование аккаунта -->
						<!--<a class="dropdown-item" @click.prevent="edit">Редактировать</a>-->

						<!-- Ссылка на выход из аккаунта -->
						<!--<a class="dropdown-item" @click.prevent="logout">Выход</a>

					</div>

				</li>
			</ul>
		</div>-->
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Header',

	data() {
		return {
			isLoggedIn: false
		}
	},

	/*watch: {
		...mapGetters('user', ['isAutorized'])
	},*/
	watch: {
		isLoggedIn: {
			handler(val, oldVal) {
				return this.$store.getters.isAuthorized
			}
		}
	},

	/*computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthorized
		}
	},*/

	methods: {
		...mapActions('user', ['logout']),

		edit() {
			console.log('Редактирование пока не активно')
		}
	}
}
</script>

<style scoped>
.header-button {
	display: inline-block;
}
</style>

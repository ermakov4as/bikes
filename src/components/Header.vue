<template>
	<nav class="navbar navbar-expand-md navbar-light bg-light mb-2">
		
		<!-- Ссылка на домашнюю страницу -->
		<router-link to="/">
      <a class="navbar-brand" href="#">На главную</a>
    </router-link>

		<div class="collapse navbar-collapse" id="navbarCollapse">
			
			<ul class="navbar-nav" v-if="!isAutorized">
				<li class="nav-item">
					<router-link to="/login"><span class="nav-link">Войти</span></router-link>
				</li>
			</ul>

			<ul class="navbar-nav mr-2" v-else>

				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
						aria-haspopup="true" aria-expanded="false">
						{{ user.email }}
					</a>

					<!-- Выпадающее меню действий с аккаунтом -->
					<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

						<!-- Ссылка на редактирование аккаунта -->
						<a class="dropdown-item" @click.prevent="edit">Редактировать</a>

						<!-- Ссылка на выход из аккаунта -->
						<a class="dropdown-item" @click.prevent="logout">Выход</a>

					</div>

				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Header',

	watch: {
		...mapGetters('user', ['isAutorized'])
	},

	methods: {
		...mapActions('user', ['logout']),

		edit() {
			console.log('Редактирование пока не активно')
		}
	}
}
</script>


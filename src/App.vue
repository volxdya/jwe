<script>

// Компоненты
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { RouterView } from 'vue-router'

// Главная страница
export default {
	components: {
		AppHeader,
		RouterView,
		AppFooter
	}
};


</script>

<template>
	<!-- Шапка -->
	<div class="app container mt-4 mb-4">
		<app-header></app-header>
		<!-- Меняющаяся часть -->
		<router-view></router-view>
		
		<app-footer></app-footer>
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Geologica&family=Noto+Sans&family=Poppins&family=Rubik&display=swap');

body {
	font-family: 'Geologica', sans-serif;
	font-family: 'Noto Sans', sans-serif;
	font-family: 'Poppins', sans-serif;
	font-family: 'Rubik', sans-serif;
	background-color: rgb(22, 22, 22);
	color: aliceblue;
}

.app {
	background-color: #252525;
    border-radius: 15px;
}

body::-webkit-scrollbar {
	width: 0;
}
</style>

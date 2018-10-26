<template>
	<div>
		<toolbar :user="user"></toolbar>	
		<div
	    >
			<router-view></router-view>

   		</div>
	</div>
</template>

<script>
	import toolbar from './components/Toolbar.vue'

	export default {
		components : {
			toolbar,
		},
		data () {
			return {
				user: {}
			}
		},
		mounted () {
			window.auth.onAuthStateChanged((user) => {
				this.user = user;
			})
		},
		methods: {
			
		}
	}
</script>
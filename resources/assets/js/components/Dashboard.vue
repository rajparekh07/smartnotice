<template>
	<v-container>
	  	<v-layout center-align justify-space-around row wrap>
	  	  <v-flex xs3>
	  	  	<v-toolbar dark color="teal lighten-3" card>
		  	  	  	<v-toolbar-title>
		  		   	Total Impressions

		  	  	  	</v-toolbar-title>
		  	  	</v-toolbar>
		  	  <v-card>
		  	  	
		  	   <v-card-text class="display-4 text-lg-center">
		  	     	{{ count }}
		  	   </v-card-text>
		  	</v-card>
	  	  </v-flex>
	  	  <v-flex xs3>
	  	  	<v-toolbar dark color="teal lighten-3" card>
		  	  	  	<v-toolbar-title>
		  		   	Total Documents

		  	  	  	</v-toolbar-title>
		  	  	</v-toolbar>
		  	  <v-card>
		  	  	
		  	   <v-card-text class="display-4 text-lg-center">
		  	     	{{ documentCount }}
		  	   </v-card-text>
		  	</v-card>
	  	  </v-flex>
	  	  <v-flex xs3>
	  	  	<v-toolbar dark color="teal lighten-3" card>
		  	  	  	<v-toolbar-title>
		  		   	Total Users

		  	  	  	</v-toolbar-title>
		  	  	</v-toolbar>
		  	  <v-card>
		  	  	
		  	   <v-card-text class="display-4 text-lg-center">
		  	     	{{ userCount }}
		  	   </v-card-text>
		  	</v-card>
	  	  </v-flex>
	  	</v-layout>
	</v-container>
</template>

<script>
	export default {
		data() {
			return {
				count : 0,
				userCount: 0,
				documentCount: 0
			}
		},
		mounted() {
			window.database.collection('analysis')
				.onSnapshot((s) => {
					s.forEach((d) => {
						let data = d.data()
						this.count = data.impressions
					})
				})
			window.database.collection('users')
				.onSnapshot((s) => {
					this.userCount = s.size
				})	

			window.database.collection('content')
				.onSnapshot((s) => {
					this.documentCount = s.size
				})	
		}
	}
	
</script>
<template>
	<v-container>
		<v-layout row wrap center-align justify-center>
		  	<v-flex xs12>
		  	  <v-toolbar
			      card
			      color="teal lighten-3"
			      dark
			      v-if="!isSearching"
			    >
			      	<v-toolbar-title>
			      		Users
			     	</v-toolbar-title>
			     	<v-spacer></v-spacer>
				    <v-btn icon class="hidden-xs-only" @click="isSearching = true">
		              <v-icon>search</v-icon>
		            </v-btn>
		            <v-btn icon class="hidden-xs-only" @click="openUserAddDialog">
		              <v-icon>add</v-icon>
		            </v-btn>
			    </v-toolbar>
			    <v-toolbar light v-else>
		            <v-btn icon class="hidden-xs-only" @click="isSearching = false">
		              <v-icon>arrow_back</v-icon>
		            </v-btn>

	           		<v-text-field
				        v-model="search"
				        label="Search"
				        single-line
				        hide-details
				    ></v-text-field>

	            	<v-spacer></v-spacer>

		            
	            </v-toolbar>
				<v-data-table
			    	:headers="headers"
			    	:items="data"
			    	:search="search"
			    	class="elevation-1"
			  	>
				    <template slot="items" slot-scope="props">
				    	<td>{{ props.item.name }}</td>
				      	<td>{{ props.item.email }}</td>
				    </template>
				    <template slot="no-data">
				      <v-alert :value="true" color="blue" icon="warning">
				        Sorry, nothing to display here :(
				      </v-alert>
				    </template>
			  	</v-data-table>
		  	</v-flex>
		</v-layout>
		<AddUser ref="addUser"></AddUser>
		<wait ref="wait"></wait>
	</v-container>
</template>

<script>
	import AddUser from './AddUser.vue'

	export default {
		components: {
			AddUser
		},
		data() {
			return {
				headers: [
					{ text: 'Name', value: 'name' },
		          	{ text: 'Email', value: 'email' }
		        ],
				data: [],
				search: "",
				isSearching: false
			}
		},
		mounted() {
			this.$refs.wait.dialog = true
			window.database.collection('users').onSnapshot((snapshot) => {
				this.$refs.wait.dialog = true
					this.data = []
					snapshot.forEach((doc) => {
						let user = doc.data()
						user.email = doc.id

						this.data.push(user)
					})
					this.$refs.wait.dialog = false

				})
		},
		methods: {
			openUserAddDialog () {
				this.$refs.addUser.dialog = true
			}
		}
	}
</script>
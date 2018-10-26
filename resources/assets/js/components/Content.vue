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
			      		Content
			     	</v-toolbar-title>
			     	<v-spacer></v-spacer>
				    <v-btn icon class="hidden-xs-only" @click="isSearching = true">
		              <v-icon>search</v-icon>
		            </v-btn>
		            <v-btn icon class="hidden-xs-only" @click="openContentDialog">
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
				      	<td>{{ props.item.url }}</td>
				      	<td>{{ props.item.priority }}</td>
				      	<td>{{ props.item.timestamp.toDate().toLocaleDateString() }}</td>
				      	<td><v-switch
				      			color="teal lighten-3"
				      			@change="setSwitch(props.item, props.item.isActive)"
					      		v-model="props.item.isActive"
					    	></v-switch>
					    </td>
					    <td>
					    	<v-btn color="red" outline small fab @click="deleteRow(props.item)">
					    		<v-icon>delete</v-icon>
					    	</v-btn>
					    </td>
				    </template>
				    <template slot="no-data">
				      <v-alert :value="true" color="blue" icon="warning">
				        Sorry, nothing to display here :(
				      </v-alert>
				    </template>
			  	</v-data-table>
		  	</v-flex>
		</v-layout>
		<AddContent ref="addContent"></AddContent>
		<wait ref="wait"></wait>
	</v-container>
</template>

<script>
	import AddContent from './AddContent.vue'

	export default {
		components: {
			AddContent
		},
		data() {
			return {
				headers: [
					{ text: 'Name', value: 'name' },
		          	{ text: 'Link', value: 'url' },
		          	{ text: 'Priority', value: 'priority' },
		          	{ text: 'Uploaded On', value: 'timestamp' },
		          	{ text: 'Is Active?', value: 'isActive' },
		          	{ text: 'Action', value: 'action' },

		        ],
				data: [],
				search: "",
				isSearching: false
			}
		},
		mounted() {
			this.$refs.wait.dialog = true
			window.database.collection('content').onSnapshot((snapshot) => {
				this.$refs.wait.dialog = true
					this.data = []
					snapshot.forEach((doc) => {
						let content = doc.data()
						content.id = doc.id

						this.data.push(content)
					})
					this.$refs.wait.dialog = false

				})
		},
		methods: {
			openContentDialog () {
				this.$refs.addContent.dialog = true
			},
			setSwitch(el, val) {
				el.isActive = val
				window.database.collection('content').doc(el.id).set(el)
			},
			deleteRow(el) {
				this.$refs.wait.dialog = true
				window.database.collection('content').doc(el.id).delete().then(() => {window.success('Deleted Row');this.$refs.wait.dialog = false})
			}
		}
	}
</script>
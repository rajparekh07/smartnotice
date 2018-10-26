<template>
	<v-container fluid>
		<v-layout align-center justify-center fill-height>
		  	<v-flex xs4>
	        	<v-card color="primary">
	          	
	          		<v-toolbar
				      card
				      color="teal lighten-3"
				      dark
				    >
				      	<v-toolbar-title>
				      		Login
				     	</v-toolbar-title>
				    </v-toolbar>

				    <v-card-text>
						 <v-text-field 
						 	v-model="form.email"
						 	solo
						 	flat 
						 	label="Email"
						 	prepend-icon="fa-at"
						 ></v-text-field>
						 <v-text-field
						 	v-model="form.password"
							flat
						 	solo
						 	prepend-icon="fa-key"
				            :append-icon="show1 ? 'visibility_off' : 'visibility'"
				            :type="show1 ? 'text' : 'password'"
				            label="Password"
				            @click:append="show1 = !show1"
				          ></v-text-field>
				    </v-card-text>
					
					<v-divider></v-divider>

				    <v-card-actions>
				    	<v-spacer></v-spacer>
				      <v-btn
				      	outline 
				      	:loading="isLoading" 
				      	color="teal lighten-3"
				      	@click="login"
				      >
				      	Login
				      </v-btn>
				    </v-card-actions>

	        	</v-card>
	      </v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data () {
      		return {	
        		show1: false,
        		isLoading: false,
        		form: {
        			email: '',
        			password: ''
        		}
        	}
        },
        mounted () {
        	window.firebase.auth().setPersistence(window.firebase.auth.Auth.Persistence.SESSION)
        },
        methods: {
        	login() {
        		this.isLoading = true
        		window.NProgress.start();

        		let {email, password} = this.form;
				window.auth.signInWithEmailAndPassword(email, password)
        			.then((...args) => {
        				this.isLoading = false;

        				window.localStorage.setItem("sec", JSON.stringify(this.form))
        				window.NProgress.done();

        				this.$router.push('/users')
        			})
        			.catch((error) => {
        				this.isLoading = false;
        				window.NProgress.done();

        				var errorCode = error.code;
				        var errorMessage = error.message;
				          // [START_EXCLUDE]
				        if (errorCode === 'auth/wrong-password') {
				          window.error('Wrong password.');
				        } else {
				          window.error(errorMessage);
				        }
        			})
				

        	}
        }
	}
</script>


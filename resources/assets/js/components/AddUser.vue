<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add new user</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="form.name" label="Full name" required></v-text-field>
              </v-flex>
             
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="form.email" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="form.password" label="Password" type="password" required></v-text-field>
              </v-flex>
              
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal lighten-3" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="teal lighten-3" flat :loading="isLoading" @click.native="addUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      isLoading: false,
      form: {
        email: '',
        password: '',
        name: ''
      }
    }),
    methods: {
        addUser() {
            let {name, email, password} = this.form
            this.isLoading = true
            window.auth.createUserWithEmailAndPassword(email, password)
              .then((...user) => {
                  
                  window.auth.signOut()
                  .then(() => {
                      let user = JSON.parse(localStorage.getItem("sec"))
                      window.auth.signInWithEmailAndPassword(user.email, user.password)
                      window.database.collection('users').doc(email).set({
                          name: name,
                      }).catch(function(error) {
                          window.error("Error writing document: " + error);
                      });
                      this.isLoading = false;
                      this.dialog = false
                  })
                  
              })
              .catch((error) => {
            // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              this.isLoading = false;
              window.error(errorMessage)
              // this.dialog = false
            // ...
          });
        }
    }
  }
</script>
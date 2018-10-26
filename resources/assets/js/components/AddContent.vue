<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add new content</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="form.name" label="Name" required></v-text-field>
              </v-flex>
             
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="form.priority" label="Priority" hint="0 being highest" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <file-upload ref="uploader" ></file-upload>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal lighten-3" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="teal lighten-3" flat :loading="isLoading" @click.native="add" :disabled="!isDisabled">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import FileUpload from './FileUploader.vue'
  export default {
    components: {
      FileUpload
    },
    data: () => ({
      dialog: false,
      isLoading: false,
      form: {
        url: '',
        priority: '',
        name: '',
        timestamp: new Date(),
        isActive: false
      }
    }),
    computed: {
        isDisabled() {
          return this.form.url != ""
        }
    },
    mounted() {
        this.$refs.uploader.$on('url', (u) => {
          console.log(u)
          this.form.url = u
        })
    },
    methods: {
        add() {
            this.isLoading = true
            this.timestamp = window.firebase.firestore.Timestamp.now()
            let {url, priority, name, timestamp, isActive} = this.form
            window.database.collection('content').add({
                url, priority, name, timestamp, isActive
            }).then((res) => {
                this.isLoading = false
                this.dialog = false
            }).catch((e) => {
                window.error(e.message)
            })
        }
    }
  }
</script>
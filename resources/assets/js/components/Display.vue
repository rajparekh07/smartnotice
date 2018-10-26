<template>
  <v-card
    color="black lighten-5"
    dark
    flat
    tile
  >
    <v-window v-model="onboarding">
      <v-window-item
        v-for="(n,ind) in data"
        :key="`card-${ind}`"
      >
        <v-card
          color="transparent"
          height="680"
        >
          <v-layout
            align-center
            justify-center
            fill-height
            tag="v-card-text"
          > 
            <iframe :src="getUrl(n.url)" id="go" width="100%" height="100%" frameborder="0"></iframe>
          </v-layout>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn
        flat
        @click="prev"
      >
        <v-icon>fa-chevron-left</v-icon>
      </v-btn>
      <v-item-group
        v-model="onboarding"
        class="text-xs-center"
      >
        <v-item
          v-for="(n,ind) in data"
          :key="`btn-${ind}`"
        >
          <v-btn
            slot-scope="{ active, toggle }"
            :input-value="active"
            icon
            @click="toggle"
          >
            <v-icon>fa-circle</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn
        flat
        @click="next"
      >
        <v-icon>fa-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
    <wait ref="wait"></wait>

  </v-card>
</template>
<script>
  export default {
    data: () => ({
      length: 3,
      onboarding: 0,
      data : [{}],
      src: 'https://firebasestorage.googleapis.com/v0/b/smartnotice-rpi.appspot.com/o/1540497396146?alt=media&token=20c3a19f-b070-41ca-9b20-caa0daccde44'
    }),
    mounted() {
      this.$refs.wait.dialog = true

      window.database.collection('content').where("isActive","==",true).orderBy('priority')
        .onSnapshot((snapshot) => {
          this.data = []
            snapshot.forEach((el) => {
                let data = el.data()
                // this.data.src = this.data.url + ""
                this.data.push(el.data())
                // this.src = el.data().src
            })
          this.$refs.wait.dialog = false

        })

      window.setInterval(() => this.next(), 5000);

    document.getElementById("go").onload = function () { this.contentWindow.scrollTo(0, 200) };
    },
    methods: {
      next () {
        this.onboarding = this.onboarding + 1 === length
          ? 0
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 < 0
          ? this.length - 1
          : this.onboarding - 1
      },
      getUrl (v) {
        return v + "#view=fit&toolbar=0&navpanes=0"
      }
    }
  }
</script>



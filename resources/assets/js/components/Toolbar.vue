<template>
    <div>
        <v-toolbar
      color="teal lighten-3"
      dark
      scroll-off-screen
      scroll-target="#scrolling-techniques"
    >
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>

      <v-toolbar-title> Smart Notice </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn flat color="success">{{ time }}</v-btn>

    </v-toolbar>

    <v-layout wrap>
      <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
             <v-avatar color="teal lighten-3" v-if="isUserLoggedIn">
              <span class="white--text headline" :size="25"> {{ avatarText }} </span>
            </v-avatar>
            <!-- <img src="https://randomuser.me/api/portraits/men/85.jpg"> -->
            <v-icon v-else>fa-user-circle</v-icon>  
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-if="isUserLoggedIn">{{ user.email }}</v-list-tile-title>
            <v-list-tile-title v-else>Please Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          @click="onListItemClick(item.action)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    </v-layout>
    </div>
    
</template>

<script>
    export default {
        props: ['user'],
        data() {
            return {
                drawer: null,
                notLoggedInItems: [
                ],
                loggedInItems: [
                    { title: 'Dashboard', icon: 'fa-chart-line', action:"goToDashboard"},
                    { title: 'User Manager', icon: 'fa-users', action:"goToUserManager"},
                    { title: 'Content Manager', icon: 'fa-newspaper', action:"goToContentManager"},
                    // { title: 'Device Manager', icon: 'fa-sign-in-alt', action:"goToDeviceManager"},
                    { title: 'Logout', icon: 'fa-sign-out-alt', action:"doLogout" }
                ],
                avatarText: ''
            }
        },
        computed: {
            isUserLoggedIn() {
                if (this.user && this.user.email) {
                    console.log(this.user);
                    this.avatarText = this.user.email.split("@")[0].split(" ").map(x => x[0]).reduce((x, y) => x + " " + y).toUpperCase()
                    return true;
                }
                return false;
            },
            menuItems() {
                return this.isUserLoggedIn ? this.loggedInItems : this.notLoggedInItems
            },
            time() {
                let date = new Date();
                return `${date.getHours()}:${date.getMinutes()}`
            }
        },
        methods: {
            onListItemClick(action) {
                switch (action) {
                    case "goToDashboard":
                        this.$router.push('/dashboard')
                        break;
                    case "goToUserManager":
                        this.$router.push('/users')
                        break;
                    case "goToContentManager":
                        this.$router.push('/content')
                        break;
                    case "goToDeviceManager":
                    case "doLogout":
                        window.auth.signOut()
                            .then((res) => {
                                this.$router.push('/login')
                            })
                        break;
                }
            }
        }
    }
</script>
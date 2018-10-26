export default [
		{ 
  			path: '/login',
  			component: require('./components/Login.vue'),
  			beforeEnter: (to, from, next) => {
  				window.auth.onAuthStateChanged((user) => {
					if (user) {
						next('/dashboard')
					} else {
						next()
					}
				})	
  			}
  		},
  		{ 
  			path: '/users',
  			component: require('./components/Users.vue'),
  			beforeEnter: (to, from, next) => {
  				if (window.auth.currentUser) {
  					next()
  				} else {
  					next('/login')
  				}
  			}
  		},
  		{ 
  			path: '/content',
  			component: require('./components/Content.vue'),
  			beforeEnter: (to, from, next) => {
  				if (window.auth.currentUser) {
  					next()
  				} else {
  					next('/login')
  				}
  			}
  		},
  		{ 
  			path: '/dashboard',
  			component: require('./components/Dashboard.vue'),
  			beforeEnter: (to, from, next) => {
  				if (window.auth.currentUser) {
  					next()
  				} else {
  					next('/login')
  				}
  			}

  		},
		{ 
  			path: '/display',
  			component: require('./components/Display.vue')
  		},
  		
	]
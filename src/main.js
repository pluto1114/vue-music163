import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import vueTap from 'v-tap';
import store from './store'

Vue.use(vueTap);
Vue.use(VueRouter)
Vue.use(MintUI)




const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    { path: '/' },
    { path: '/songs/:word', component: require('./views/Songs') },
    { path: '/song/:id', component:require('./views/Song') }, 
    { path: '*', redirect: '/' }  
  ]
})

var vm=new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})




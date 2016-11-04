import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(VueRouter)
Vue.use(MintUI)
const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})


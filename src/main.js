import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Songs from './components/Songs'
import Song from './components/Song'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueResource from 'vue-resource'
import DataApi from './data-api'
Vue.use(VueRouter)
Vue.use(MintUI)
Vue.use(VueResource)
Vue.use(DataApi)

const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/songs/:word', component: Songs },
    { path: '/song/:id', component: Song },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})

var vm=new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})




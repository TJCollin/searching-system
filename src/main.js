// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './routes'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store'
import echarts from 'echarts'

Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
	routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

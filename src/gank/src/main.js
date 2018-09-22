import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import './styles/common.less'

import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

import ZList from '@/components/z-list'
Vue.component('z-list', ZList)
import ZCategory from '@/components/z-category'
Vue.component('z-category', ZCategory)

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
});
router.afterEach((to, from) => {
  NProgress.done()
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

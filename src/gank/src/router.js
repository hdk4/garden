import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const e404 = () => import('./views/404')
const none = () => import('./views/none')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    redirect: '/category'
  }, {
    path: '/girls',
    name: 'girls',
    component: () => import('./views/girls')
  }, {
    path: '/detail/:year/:month/:day',
    name: 'detail',
    component: () => import('./views/detail')
  }, {
    path: '/history',
    name: 'history',
    component: () => import('./views/history')
  }, {
    path: '/category',
    name: 'category',
    component: () => import('./views/category')
  }, {
    path: '/search',
    name: 'search',
    component: () => import('./views/search')
  }, {
    path: '/404',
    name: '404',
    component: e404
  }, {
    path: '*',
    name: '_404',
    redirect: '/404',
  }],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

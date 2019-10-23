import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    }, {
      path: '/system',
      name: 'system',
      component: require('@/components/system').default
    }, {
      path: '/master',
      name: 'master',
      component: require('@/components/master').default
    }, {
      path: '/setter',
      name: 'setter',
      component: require('@/components/setter').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

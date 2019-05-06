import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'


//== Frame
import Frame from '@/components/Frame'

//== View
// View global
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import Inbox from '@/views/Inbox/Main'
import Outbox from '@/views/Outbox/Main'
import Sentitem from '@/views/Sentitem/Main'


Vue.use(Router)


const router = new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Frame,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'inbox',
          name: 'Inbox',
          component: Inbox
        },
        {
          path: 'outbox',
          name: 'Outbox',
          component: Outbox
        },
        {
          path: 'sentitem',
          name: 'Sentitem',
          component: Sentitem
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

// Route guard
router.beforeEach((to, from, next) => {
  // Cek apakah userInfo (dan harusnya ACL) sudah terisi di Vuex
  let clientHasUserInfo = (typeof store.getters.userInfo !== 'undefined' && typeof store.getters.userInfo.nama !== 'undefined')

  // Setup payload. Object.assign() harus ditumpuk karena tidak semua route
  // memiliki ACL meta, sehingga bisa menyebabkan error "Cannot convert
  // undefined or null to object" ketika runtime
  let payload = Object.assign(Object.assign({}, to.meta.acl), { clientHasUserInfo })

  // Cek auth ke server
  axios.post(window.baseUrl + '/resources/gatekeeper', payload)
    .then(({ data }) => {
      let nextParam = {}
      // Destructuring data
      let { passed } = data

      if (passed && !clientHasUserInfo) {
        store.commit('setUser', data.userInfo)
      }

      if (passed && to.name === 'Login'){
        nextParam = {
          path: '/dashboard'
        }
      }

      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!passed){
          nextParam = {
            path: '/login',
            query: { intended: to.fullPath }
          }
        }
      }

      // Set judul halaman sesuai nama route
      document.title = `${to.name} – Bekisar: Manajemen SMS Berbasis Web`

      next(nextParam)
    })
    .catch(errors => {
      console.log(errors)

      next(false)
    })
})

export default router

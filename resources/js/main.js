//== Vue dan plugin-nya
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueNoty from 'vuejs-noty'
import VueMultiselect from 'vue-multiselect'
import Datetime from 'vue-datetime'
import flatPickr from 'vue-flatpickr-component'
import tinymce from 'vue-tinymce-editor'

import { Settings } from 'luxon'


//== Komponen app
// Well, app
import App from '@/App'
// Komponen lain
import Spinner from '@/components/Spinner'
import WaktuLalu from '@/components/WaktuLalu'
// Vuex Store
import store from '@/store'
// Vue Router
import router from '@/router'
// Mixin
import UrlMixin from '@/mixins/Url'
// Filter
import JoinFilter from '@/filters/Join'


//== Panggil bootstrapper untuk front-end
require('@/bootstrap')


//== Panggil plugin Vue
Vue.use(BootstrapVue)
Vue.use(Datetime)
Vue.use(flatPickr)
Vue.use(VueNoty, {
  theme: 'bootstrap-v4',
  timeout: 8000,
  layout: 'topRight',
})

//== Panggil mixin Vue
Vue.mixin(UrlMixin)

//== Panggil filter Vue
Vue.filter('join', JoinFilter)

//== Panggil komponen Vue
Vue.component('App', App)
Vue.component('spinner', Spinner)
Vue.component('tinymce', tinymce)
Vue.component('WaktuLalu', WaktuLalu)
Vue.component('multiselect', VueMultiselect)


//== Konfigurasi lainnya
// luxon
Settings.defaultLocale = 'id'

// Vue Performance Devtool
Vue.config.performance = process.env.NODE_ENV !== 'production'

//== Run!
const app = new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>'
})

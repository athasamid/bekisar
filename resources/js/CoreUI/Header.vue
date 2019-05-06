<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="/dashboard"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-navbar-nav class="ml-auto mr-3 pr-3">
      <b-nav-item-dropdown right :text="$store.getters.userInfo.nama">
        <!--<b-dropdown-item @click="$refs.modalUbahPassword.show()">Ubah Password</b-dropdown-item>-->
        <b-dropdown-item @click="doLogout">Keluar</b-dropdown-item>
      </b-nav-item-dropdown>
      <!-- <b-nav-item class="d-md-down-none">
        <i class="icon-bell"></i>
        <b-badge pill variant="danger">5</b-badge>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-list"></i>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-location-pin"></i>
      </b-nav-item>
      <HeaderDropdown/> -->
    </b-navbar-nav>
    <!-- <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
      <span class="navbar-toggler-icon"></span>
    </button> -->
  </header>
</template>

<script>
// import HeaderDropdown from './HeaderDropdown'
import { flatMapDeep } from 'lodash'

export default {
  name: 'core-header',
  components: {
    // HeaderDropdown
  },
  data () {
    return {
      payloadUbahPassword: {
        old_password: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  computed: {
    formValidated () {
      return this.payloadUbahPassword.old_password.length > 6 &&
        this.payloadUbahPassword.password.length > 6 &&
        this.payloadUbahPassword.password_confirmation.length > 6 &&
        this.payloadUbahPassword.password === this.payloadUbahPassword.password_confirmation
    }
  },
  methods: {
    handleCompose (){

    },
    resetCompose (){

    },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    doLogout () {
      axios.get(this.baseUrl('logout'))
        .then(() => {
          this.$noty.info('Anda berhasil logout.')
          this.$router.push({ path: '/login' })
        })
        .catch(({ response: { status, data: { errors }}}) => {
          // if (status === 422)
          //   this.$noty.error(errors.username.join(''))
        })
    }
  }
}
</script>

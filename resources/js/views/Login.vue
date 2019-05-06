<template>
    <div class="container">
      <b-row class="justify-content-center">
          <div class="col-md-4">
            <div class="card-group">
              <div class="card p-4">
                <div class="card-body">
                  <h1>Masuk</h1>
                  <p class="text-muted">Masuk ke Bekisar</p>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                          <i class="fa fa-user"></i>
                      </span>
                    </div>
                    <input class="form-control" type="text" v-model="login.username" @keyup.enter.native="doLogin" placeholder="Username">
                  </div>
                  <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                      <i class="fa fa-lock"></i>
                      </span>
                    </div>
                    <input class="form-control" v-model="login.password" type="password" @keyup.enter.native="doLogin" placeholder="Password">
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <button class="btn btn-primary px-4" type="button" :disabled="formEmpty" @click="doLogin">Login</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </b-row>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      login: {
        username: '',
        password: '',
        intended: null,
      },
    }
  },
  computed: {
    formEmpty() {
      return this.login.username.length < 3 || this.login.password.length < 6
    },
  },
  methods: {
    doLogin () {
      axios.post(this.baseUrl('login'), this.login)
        .then(({ data }) => {
          this.$store.setUser(data.user)

          this.$noty.success('Anda berhasil login.')
          this.$router.push({ path: data.redirect })
        })
        .catch((error) => {
        })
    }
  },
  beforeCreate: function () {
      document.body.className = "app header-fixed flex-row align-items-center sidebar-fixed aside-menu-hidden"
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // Jika haman login di-redirect dari route lain, tampilkan notifikasi
      if (to.query.intended) {
        vm.$noty.info('Silakan login terlebih dahulu.')
      }

      vm.login.intended = to.query.intended
    })
  }
}
</script>

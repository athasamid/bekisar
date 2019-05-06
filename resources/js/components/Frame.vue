<template>
  <div class="app">
    <CoreHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>

    <CoreFooter/>
  </div>
</template>

<script>
import nav from '@/router/nav'
import { Header as CoreHeader, Sidebar, Footer as CoreFooter, Breadcrumb } from '@/CoreUI'

export default {
  name: 'frame',
  components: {
    CoreHeader,
    Breadcrumb,
    Sidebar,
    CoreFooter,
  },
  data () {
    return {
      nav: nav.items,

    }
  },
  computed: {
    name () {
      return this.$route.name
    },
  },
  methods : {

  }
}
</script>

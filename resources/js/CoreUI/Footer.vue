<template>
  <footer class="app-footer">
    <span>&copy; {{ tahun }} Bekisar: Manajemen SMS Gateway Berbasis WEB.</span>
    <span class="ml-auto">Powered by <a href="https://synergics.digital">Synergics Digital</a> develop by <a href="#">Dhimas Atha A</a></span>
  </footer>
</template>
<script>
export default {
  name: 'core-footer',
  computed: {
    tahun () {
      let thisYear = (new Date).getFullYear()
      return thisYear > 2018 ? `2018 - ${thisYear}` : thisYear
    }
  }
}
</script>

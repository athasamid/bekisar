<template>
  <div class="sidebar-header">
    <router-link to="/dashboard">
      <img :src="baseUrl('images/logo_bin.png')" alt="Badan Intelijen Negara" class="img-fluid px-1 py-2">
    </router-link>
  </div>
</template>
<script>

export default {
  name: 'sidebar-header'
}
</script>

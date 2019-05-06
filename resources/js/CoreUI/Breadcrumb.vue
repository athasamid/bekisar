<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="(item, index) in list" :key="index">
      <span class="active" v-if="isLast(index)">{{ showName(item) }}</span>
      <router-link :to="item" v-else>{{ showName(item) }}</router-link>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    isLast (index) {
      return index === this.list.length - 1
    },
    showName (item) {

      if (typeof item.meta !== 'undefined' && typeof item.meta.label !== 'undefined') {
        if (typeof item.meta.label[this.$acl.getUserRole()] !== 'undefined')
          item = item.meta.label[this.$acl.getUserRole()]
        else if (typeof item.meta.label.default !== 'undefined')
          item = item.meta.label.default
        else
          item = item.meta.label
      }

      if (item.name) {
        item = item.name
      }

      return item
    }
  }
}
</script>

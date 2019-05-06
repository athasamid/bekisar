<template>
  <li :class="classList">
    <template v-if="wrapper && wrapper.element">
      <component v-bind:is="wrapper.element" v-bind="wrapper.attributes">
        {{name}}
      </component>
    </template>
    <template v-else>
      <router-link v-if="url.length" :to="url">{{ labelText }}</router-link>
      <span v-else>{{ labelText }}</span>
    </template>
  </li>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: ''
      },
      classes: {
        type: String,
        default: ''
      },
      wrapper: {
        type: Object,
        default: () => {}
      },
      url: {
        type: String,
        default: ''
      },
      label: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      classList () {
        return [
          'nav-title',
          ...this.itemClasses
        ]
      },
      itemClasses () {
        return this.classes ? this.classes.split(' ') : ''
      },
      labelText () {
        if (this.label) {
          return this.label.label
        }

        return this.name
      }
    }
  }
</script>

<template>
  <div :class="{ 'spinner': true, 'spinner-block': !inline, 'spinner-inline': inline, 'spinner-dark': dark }" v-show="show">
    <vue-simple-spinner :speed="speed" :size="sizeInNumber" />
  </div>
</template>

<script>
import VueSimpleSpinner from 'vue-simple-spinner'

export default {
  name: 'spinner',
  components: {
    VueSimpleSpinner
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    speed: {
      type: Number,
      default: .4,
    },
    size: {
      type: String,
      default: 'md',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sizeInNumber () {
      let size

      switch (this.size) {
        case 'xs': size = 16
          break

        case 'sm': size = 24
          break

        case 'lg': size = 40
          break

        default: size = 30
      }

      return size
    }
  }
}
</script>

<style>
.spinner-inline {
  display: inline-block;
}
.spinner-block {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1000;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, .5);
}
.spinner-dark {
  background-color: rgba(0, 0, 0, .5);
}
</style>

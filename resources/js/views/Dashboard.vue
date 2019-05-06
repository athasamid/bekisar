<template>
  <div class="animated fadeIn">

  </div>
</template>

<script>
import Chart from '@/components/Chart'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'

export default {
  components: {
    Chart,
  },
  data () {
    return {
      isBusy: true,
    }
  },
  computed: {

  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.box-orange {
  border-color: #F17300;
  background-color: lighten(#F17300, 50%);
  .display-4 { color: #F17300; }
}
.box-cyan {
  border-color: #5B7BC6;
  background-color: lighten(#5B7BC6, 40%);
  .display-4 { color: #5B7BC6 }
}
.box-blue {
  border-color: #19528C;
  background-color: lighten(#19528C, 62%);
  .display-4 { color: #19528C }
}
.box-green {
  border-color: #5A8436;
  background-color: lighten(#5A8436, 57%);
  .display-4 { color: #5A8436 }
}
.card-body .p.h4 {
  color: #33444c;
}
</style>

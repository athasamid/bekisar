<template>
  <span class="text-muted">{{ getParsedDate() }}</span>
</template>

<script>
  // Inspirasi dari https://gist.github.com/johndavedecano/0630b27d2c0a9d717ae6fe918edcf534

  import format from 'date-fns/format'
  import differenceInSeconds from 'date-fns/difference_in_seconds'
  import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
  const dateFnsId = require('date-fns/locale/id')

  export default {
    props: {
      date: {
        type: String
      },
      tag: {
        type: String,
        default: 'span'
      }
    },
    methods: {
      updateTime () {
        const interval = this.getInterval()
        if (interval > 0) {
          setTimeout(this.updateTime, interval)
          this.$forceUpdate()
        }
      },
      getDifference () {
        return differenceInSeconds(new Date, this.date)
      },
      getInterval () {
        const diff = this.getDifference()
        if (diff < 300) {
          return 60000
        } else if (diff < 86400) {
          return 1800000
        } else {
          return 0
        }
      },
      getParsedDate () {
        const diff = this.getDifference()
        if (diff < 30) {
          return 'baru saja'
        } else if (diff < 86370) {
          return distanceInWordsToNow(this.date, { locale: dateFnsId })
        } else {
          return format(this.date, 'dddd, D MMMM YYYY HH.mm', { locale: dateFnsId })
        }
      }
    },
    mounted () {
      this.updateTime()
    },
    render: createElement => {
      return createElement(
        this.tag,
        {
          class: {
            'text-muted': true
          }
        },
        this.getParsedDate()
      )
    }
  }
</script>

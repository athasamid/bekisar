import { Bar, mixins } from 'vue-chartjs'
import chartjsDatalabels from 'chartjs-plugin-datalabels'
const { reactiveProp } = mixins

let vm

export default {
  extends: Bar,
  mixins: [ reactiveProp ],
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    stacked: {
      type: [ Boolean, String ],
      default: false,
    },
    height: {
      type: [ Number, String ],
    }
  },
  data () {
    return {
      options: {
        onClick(event, item) {
          if (item.length)
            vm.$emit('barClick', item[0]._index)
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          // display: false,
          fontStyle: 'bold',
        },
        scales: {
          xAxes: [
            {
              stacked: this.stacked,
              barPercentage: 1,
              // categoryPercentage: 1,
              gridLines: {
                display: false,
                drawBorder: false,
                // color: '#495057', // Bootstrap 4's $gray-700
              },
              ticks: {
                // stepSize: 1,
                // min: 0,
                autoSkip: false,
                // fontColor: '#e9ecef', // Bootstrap 4's $gray-200
                // fontSize: 16,
                fontStyle: 'bold',
              }
            }
          ],
          yAxes: [
            {
              stacked: this.stacked,
              gridLines: {
                display: false,
                drawBorder: false,
                // color: '#495057', // Bootstrap 4's $gray-700
              },
              ticks: {
                display: false,
                // callback: (value) => {
                //   return Number.isInteger(value) ? value : null;
                // },
                beginAtZero: true,
                // stepSize: 1,
                // fontColor: '#868e96', // Bootstrap 4's $gray-600
                // fontSize: 14,
              }
            }
          ]
        }
      }
    }
  },
  mounted () {
    vm = this

    this.addPlugin({
      id: 'chartjs-plugin-datalabels',
      beforeInit: function (chart) {
        const options = chart.options.plugins.datalabels

        // Posisi
        options.anchor = 'end'
        options.align = ({ dataIndex, dataset }) => {
          return dataset.data[dataIndex] > 0 ? 'start' : 'end'
        }
        options.offset = ({ dataIndex, dataset }) => {
          return dataset.data[dataIndex] > 0 ? 8 : 12
        }

        // Styling
        options.backgroundColor = ({ dataIndex, dataset }) => {
          return dataset.data[dataIndex] > 0
            ? 'rgba(255, 255, 255, .5)'
            : 'transparent'
        }
        options.borderRadius = 4
        // options.color = ({ dataIndex, dataset }) => {
        //   return dataset.data[dataIndex] > 0
        //     ? '#343a40' // Bootstrap 4's $gray-800
        //     : '#e9ecef' // Bootstrap 4's $gray-200
        // }
        options.font = {
          // size: 16,
          weight: 'bold',
        }
        options.padding = {
          top: 3,
          bottom: 4,
          left: 5,
          right: 5,
        }

        // Formatter
        options.formatter = (value) => {
          return value > 0 ? value : 'Nihil'
        }
      }
    })

    this.renderChart(this.chartData, this.options)
  }
}

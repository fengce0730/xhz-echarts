<template>
<div :id="domId"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "XhzEcharts",
  props: {
    // echarts 渲染的节点，页面多图表时必传
    domId: {
      type: String,
      default: 'bar'
    },
    // 值为 true, 表示echarts 的 option 配置自定义
    manul: {
      type: Boolean,
      default: false
    },
    // 当manul 为 false 时，图表的类型
    chartType: {
      type: String,
      default: 'line'
    },
    // echarts 配置
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // manul 为 false, 图表x轴数据
    xData: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    // manul 为 false, 图表y轴数据
    yData: {
      type: Array,
      required: !this.manul,
      default: () => {
        return []
      }
    },
    // 多数据图表
    multiple: {
      type: Boolean,
      default: false
    },
    chartOption: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 图表高度
    height: {
      type: String,
      default: 'auto'
    },
    // 图表宽度
    width: {
      type: String,
      default: 'auto'
    }
  },
  computed: {
    options() {
      if(this.manul) {
        return this.option
      }
      this.generateOption(this.originOption,this.option)
      if(this.xData && this.xData.length !== 0) {
        this.originOption.xAxis.data = this.xData
      }
      if(this.yData && this.yData.length !== 0) {
        this.originOption.series = []
        if(this.multiple) {
          try {
            this.yData.forEach(item=>{
              if(item instanceof Array) {
                this.originOption.series.push({
                  data: item,
                  type: this.chartType
                })
              } else if(item instanceof Object) {
                if(Object.keys(item).includes('data')) {
                  item.type = item.type || this.chartType
                  this.originOption.series.push(item)
                } else {
                  throw new Error('堆叠数据类型错误！')
                }
              } else {
                throw new Error('堆叠数据类型错误！')
              }
            })
          } catch (e) {
            this.originOption.series = []
          }
        } else {
          this.originOption.series[0] = {
            data: this.yData,
            type: this.chartType
          }
        }
      }
      return this.originOption
    },
    chartOptions() {
      if(this.height && this.width) {
        return {
          height: this.height,
          width: this.width
        }
      } else {
        return Object.assign({},this.chartOption)
      }
    },
  },
  data(){
    return{
      chart: undefined,
      originOption: {
        xAxis: {
          type: 'category',
          data: undefined,
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            margin: 2,
            formatter: function(value, index) {
              if (value >= 10000 && value < 10000000) {
                value = value / 10000 + '万';
              } else if (value >= 10000000) {
                value = value / 10000000 + '千万';
              }
              return value;
            }
          }
        },
        series: []
      }
    }
  },
  mounted() {
    this.initCharts()
    this.generateOption(this.originOption,this.option)
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(document.getElementById(this.domId),null, this.chartOptions)
      this.chart.setOption(this.options)
    },
    generateOption(originOption,option) {
      let origin = Object.keys(originOption)
      let source = Object.keys(option)
      source.forEach(key => {
        if(origin.includes(key)) {
          if(option[key] instanceof Object && originOption[key] instanceof Object) {
            this.generateOption(originOption[key],option[key])
          } else {
            originOption[key] = option[key]
          }
        } else {
          originOption[key] = option[key]
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

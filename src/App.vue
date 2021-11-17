<template>
  <div id="app">
    <xhz-echarts ref="barId" dom-id="barId" chart-type="bar" multiple :option="options" :y-data="yData" :x-data="xData" style="width: 60%;height: 400px"></xhz-echarts>
    <xhz-echarts ref="lineId" dom-id="lineId" chart-type="line" multiple :y-data="yData" :x-data="xData" style="width: 80%;height: 300px;margin: auto;"></xhz-echarts>
  </div>
</template>

<script>
import XhzEcharts from "./components/XhzEcharts";
export default {
  name: 'app',
  components: {
    XhzEcharts
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      yData: [
        {
          name: '一',
          type: 'line',
          data: [80, 200, 170, 80, 70, 110, 130]
        },
        {
          name: '二',
          data: [120, 200, 280, 80, 70, 110, 150]
        },
        {
          name: '三',
          data: [111, 269, 150, 25, 70, 156, 130],
        }
      ],
      options: {
        title: {
          text: '111嘿嘿'
        },
        legend: {
          data: ['一','二','三']
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: '25'
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            margin: 3,
          }
        },
      }
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

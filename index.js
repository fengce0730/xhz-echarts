import XhzEcharts from './src/components'

XhzEcharts.install = (Vue) => {
  Vue.component(XhzEcharts.name,XhzEcharts)
}

export default XhzEcharts


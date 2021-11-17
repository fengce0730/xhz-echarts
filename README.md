# xhz-echarts
![](https://img.shields.io/static/v1?label=vue&message=v2.5.11&color=<COLOR>) ![](https://img.shields.io/static/v1?label=echarts&message=v5.2.2&color=<COLOR>)

提供给 xhz 前端开发者使用的 echarts 组件

## 目的

简化echarts配置，针对柱状图、折线图进行了优化，使其更加符合业务场景的需要同时减轻开发人员的工作量

## 如何使用

##### 安装

```
yarn add xhz-echarts
# or
npm install xhz-echarts
```

##### 引入

###### 全局引入：在main.js文件中添加如下代码

```
import XhzEcharts from 'xhz-echarts'

Vue.use(XhzEcharts)
```

###### 按需引入：在页面文件中添加如下代码

```
import XhzEcharts from 'xhz-echarts'

export default {
	name: 'Index'
	components: {
    	XhzEcharts
  	},
}
```

###### 页面中加入如下代码：

```
<xhz-echarts
    dom-id="lineId"
    chart-type="bar"
    multiple
    :y-data="yData"
    :x-data="xData"
    style="height: 500px;width: 1000px">
</xhz-echarts>
```

## 属性

| 名称           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| `:domId`       | 类型`String`，作为echarts的渲染dom节点id，当页面存在多个echarts图表时，请指定不同的domId，否则会导致图表渲染不成功 |
| `:option`      | echarts图表配置项，可参考官网进行配置。默认配置为空          |
| `:manul`       | 类型`Boolean`，默认值为`false`，值为`true`时，请传入自定义option |
| `:chartType`   | 类型`String`，图表类型，默认值为`line`，目前仅支持`line`以及`bar`类型 |
| `:xData`       | 类型`Array`，当manul值为`false`时，x轴的数据                 |
| `:yData`       | 类型`Array`，当manul值为`false`时，y轴的数据                 |
| `:multiple`    | 类型`Boolean`，图表是否为多数据                              |
| `:chartOption` | 类型`Object`、图表初始化配置                                 |
| `:height`      | 类型`String`，图表高度，默认为auto，即跟随组件样式。须于width一同设置，单位为px。 |
| `:width`       | 类型`String`，图表宽度，默认为auto，即跟随组件样式。须于height一同设置，单位为px。 |

## 注意事项

### 属性注意事项

1. `domId`一般情况下建议必填，避免产生domId重复的情况。可设置为图表数据相关的英文解释。

2. `option`的配置请参考[官网](https://echarts.apache.org/zh/option.html#title)。xhz-echarts针对业务场景常用图表简化了此项配置，目前已简化的图表类型有柱状图以及折线图。默认的option如下：

   ```
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
   ```

   使用者也可以传入其他配置（当manul为true时下述不生效），类似于

   ```
   title: {
   	text: 'xhz-echarts'
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
   ```

   当传入option为上方代码时，xhz-echarts会将默认配置以及使用者传入的option进行整合，**且以使用者设置的option配置优先**，上述例子整合结果如下：

   ```
   title: {
   	text: 'xhz-echarts'
   },
   legend: {
   	data: ['一','二','三']
   },
   xAxis: {
       type: 'category',
       data: undefined,
       axisLabel: {
       	interval: 0,
       	rotate: '25'
       },
   },
   yAxis: {
   	type: 'value',
   	axisLabel: {
   		margin: 3,
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
   ```

3. `manul`为true时，传入的option将成为图表渲染配置的唯一值，此时echarts的配置完全由外部传入的option决定，属性`chartType`、`xData`、`yData`、`multiple`等设置都将失效

4. `chartType`目前仅支持到`line`以及`bar`，后续会有更多图表得到支持

5. `yData`仅接收数组形式的数据，可单独指定某一条数据的图表类型，如不设置，则默认设置为`chartType`类型值，可接受数据结构如下：

   > 普通数组结构（multiple为false）

   ```
   var arr = [10,20,30,40,50]
   ```

   > 多数据结构（multiple为true）

   ```
   var arr = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
   ```

   > 对象数组结构（multiple为true）

   ```
   var arr = [
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
   ]
   ```

6. `multiple`仅在图表为多数据时进行配置，默认为`false`

7. `chartOption`配置详见[官网](https://echarts.apache.org/zh/api.html#echarts)中`init`方法的opt参数

8. `height`以及`width`配置详见[官网](https://echarts.apache.org/zh/api.html#echarts)中`init`方法的opt参数

### 用法注意事项

- 可在组件上使用内联样式指定图表的宽高，也可传入`chartOption`，或者是`height`以及`width`。此时需要注意的是设置`height`以及`width`的优先级高于`chartOption`，`chartOption`高于内联样式。如以上三种方式都未设置，图表将无法正常显示。

## 更多使用细节

想了解更多内容请联系作者。

- 邮箱：fengce@gxxhz.com
- qq：1048438791

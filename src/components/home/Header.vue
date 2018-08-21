<template>
  <div class="Header">
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
  <div id="myChart1" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
     
      // 绘制图表
       myChart1.setOption({
        backgroundColor: 'beige',
        title: { text: "在Vue中使用echarts" },
        tooltip: {},//提示框的相关行为
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  }
};
</script>

<style >

</style>

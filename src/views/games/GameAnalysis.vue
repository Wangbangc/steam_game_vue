<template>
  <el-container>
    <el-header>游戏数据分析</el-header>
    <el-main>
      <div id="chart" style="width: 600px; height: 400px;"></div>
    </el-main>
  </el-container>
</template>

<script>
import { onMounted } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    onMounted(() => {
      const chartDom = document.getElementById('chart');
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: '圆环图的例子',
          left: 'center',
          top: 'center'
        },
        series: [
          {
            type: 'pie',
            data: [
              { value: 335, name: 'A' },
              { value: 234, name: 'B' },
              { value: 1548, name: 'C' }
            ],
            radius: ['40%', '70%']
          }
        ]
      };
      myChart.setOption(option);
    });
  }
};
</script>

<style>
#chart {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style> 
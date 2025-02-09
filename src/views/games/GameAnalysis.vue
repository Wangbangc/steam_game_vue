<template>
  <el-container>
    <el-header>游戏数据分析</el-header>
    <el-main>
      <div class="chart-container">
        <div id="roseChart" class="chart"></div>
        <div id="barLineChart" class="chart"></div>
        <div id="bubbleChart" class="chart"></div>
        <div id="dynamicBarChart" class="chart"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import { getGameTypes } from '@/api/gameApi';

export default {
  setup() {
    onMounted(async () => {
      try {
        const response = await getGameTypes();
        const gameTypes = response.data;

        // 环形玫瑰图
        const roseChart = echarts.init(document.getElementById('roseChart'));
        const roseOption = {
          title: {
            text: '环形玫瑰图（游戏类型分布）',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              return `类型: ${params.name}<br/>数量: ${params.value}`;
            }
          },
          series: [
            {
              type: 'pie',
              roseType: 'radius',
              data: gameTypes.map(type => ({ value: type.gameCount, name: type.category })),
              radius: ['30%', '70%']
            }
          ]
        };
        roseChart.setOption(roseOption);

        // 双轴对比柱线图
        const barLineChart = echarts.init(document.getElementById('barLineChart'));
        const barLineOption = {
          title: {
            text: '双轴对比柱线图',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              const category = params[0].name;
              return `类型: ${category}<br/>平均游玩时间: ${params[0].value}<br/>中位数游玩时间: ${params[1].value}`;
            }
          },
          xAxis: {
            type: 'category',
            data: gameTypes.map(type => type.category)
          },
          yAxis: [
            { type: 'value', name: '平均游玩时间' },
            { type: 'value', name: '中位数游玩时间' }
          ],
          series: [
            {
              type: 'bar',
              data: gameTypes.map(type => type.averagePlaytime),
              yAxisIndex: 0
            },
            {
              type: 'line',
              data: gameTypes.map(type => type.medianPlaytime),
              yAxisIndex: 1
            }
          ]
        };
        barLineChart.setOption(barLineOption);

        // 气泡散点图
        const bubbleChart = echarts.init(document.getElementById('bubbleChart'));
        const bubbleOption = {
          title: {
            text: '气泡散点图（价格与数量关系）',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              const category = gameTypes[params.dataIndex].category;
              return `类型: ${category}<br/>价格: ${params.value[0]}<br/>游戏数量: ${params.value[1]}<br/>平均游玩时间: ${params.value[2]}`;
            }
          },
          xAxis: { type: 'value', name: '价格' },
          yAxis: { type: 'value', name: '游戏数量' },
          series: [
            {
              type: 'scatter',
              symbolSize: 20,
              data: gameTypes.map(type => [type.averagePrice, type.gameCount, type.averagePlaytime])
            }
          ]
        };
        bubbleChart.setOption(bubbleOption);

        // 动态排序条形图
        const dynamicBarChart = echarts.init(document.getElementById('dynamicBarChart'));
        const dynamicBarOption = {
          title: {
            text: '动态排序条形图',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              const category = params[0].name;
              return `类型: ${category}<br/>价格: ${params[0].value}`;
            }
          },
          xAxis: { type: 'value' },
          yAxis: {
            type: 'category',
            data: gameTypes.map(type => type.category)
          },
          series: [
            {
              type: 'bar',
              data: gameTypes.map(type => type.averagePrice)
            }
          ]
        };
        dynamicBarChart.setOption(dynamicBarOption);

      } catch (error) {
        console.error('Failed to fetch game types:', error);
      }
    });
  }
};
</script>

<style>
.chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.chart {
  width: 45%;
  height: 400px;
  margin: 20px 0;
}
</style> 
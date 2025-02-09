<template>
    <el-container>
      <el-header>气泡散点图</el-header>
      <el-main>
        <div id="bubbleChart" style="width: 100%; height: 400px;"></div>
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
  
        } catch (error) {
          console.error('Failed to fetch game types:', error);
        }
      });
    }
  };
  </script>
  
  <style>
  #bubbleChart {
    margin: 0 auto;
  }
  </style>
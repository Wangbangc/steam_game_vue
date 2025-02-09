<template>
    <el-container>
      <el-header>环形玫瑰图</el-header>
      <el-main>
        <div id="roseChart" style="width: 100%; height: 400px;"></div>
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
  
        } catch (error) {
          console.error('Failed to fetch game types:', error);
        }
      });
    }
  };
  </script>
  
  <style>
  #roseChart {
    margin: 0 auto;
  }
  </style>
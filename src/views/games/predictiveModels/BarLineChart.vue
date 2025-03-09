<template>
    <el-container>
   
      <el-main>
        <div id="barLineChart" style="width: 100%; height: 400px;"></div>
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
  
        } catch (error) {
          console.error('Failed to fetch game types:', error);
        }
      });
    }
  };
  </script>
  
  <style>
  #barLineChart {
    margin: 0 auto;
  }
  </style>
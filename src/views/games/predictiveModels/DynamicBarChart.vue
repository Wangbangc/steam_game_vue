<template>
    <el-container>
      <el-header>动态排序条形图</el-header>
      <el-main>
        <div id="dynamicBarChart" style="width: 100%; height: 400px;"></div>
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
  #dynamicBarChart {
    margin: 0 auto;
  }
  </style>
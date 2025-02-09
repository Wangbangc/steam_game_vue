<template>
    <el-container>
      <el-header>游戏销量预测</el-header>
      <el-main>
        <div id="salesChart" style="width: 100%; height: 400px;"></div>
      </el-main>
    </el-container>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import * as echarts from 'echarts';
  import { getAllGames } from '@/api/gameApi';
  
  export default {
    setup() {
      const games = ref([]);
  
      onMounted(async () => {
        try {
          const response = await getAllGames();
          games.value = response.data;
  
          // 使用更复杂的公式进行预测
          const predictions = games.value.map(game => {
            const positiveRate = game.positiveRatings / (game.positiveRatings + game.negativeRatings);
            return positiveRate * (game.positiveRatings + game.negativeRatings) + game.price * game.medianPlaytime;
          });
  
          const salesChart = echarts.init(document.getElementById('salesChart'));
          const option = {
            title: {
              text: '游戏销量预测',
              left: 'center'
            },
            xAxis: {
              type: 'category',
              data: games.value.map(game => game.name)
            },
            yAxis: {
              type: 'value',
              name: '预测销量'
            },
            series: [
              {
                name: '预测销量',
                type: 'line',
                data: predictions
              }
            ]
          };
          salesChart.setOption(option);
  
        } catch (error) {
          console.error('Failed to fetch games:', error);
        }
      });
  
      return { games };
    }
  };
  </script>
  
  <style>
  #salesChart {
    margin: 0 auto;
  }
  </style>
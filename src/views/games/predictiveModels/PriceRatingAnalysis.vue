<template>
    <el-container>
    
      <el-main>
        <div id="priceRatingChart" style="width: 100%; height: 400px;"></div>
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
  
          const priceRatingChart = echarts.init(document.getElementById('priceRatingChart'));
          const option = {
            title: {
              text: '价格与好评率的关系分析',
              left: 'center'
            },
            xAxis: {
              type: 'value',
              name: '价格'
            },
            yAxis: {
              type: 'value',
              name: '好评率'
            },
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                const game = games.value[params.dataIndex];
                const positiveRate = (game.positiveRatings / (game.positiveRatings + game.negativeRatings)).toFixed(2);
                return `游戏名: ${game.name}<br/>价格: ${game.price}<br/>好评率: ${positiveRate}`;
              }
            },
            series: [
              {
                type: 'scatter',
                data: games.value.map(game => {
                  const positiveRate = game.positiveRatings / (game.positiveRatings + game.negativeRatings);
                  return [game.price, positiveRate];
                })
              }
            ]
          };
          priceRatingChart.setOption(option);
  
        } catch (error) {
          console.error('Failed to fetch games:', error);
        }
      });
  
      return { games };
    }
  };
  </script>
  
  <style>
  #priceRatingChart {
    margin: 0 auto;
  }
  </style>


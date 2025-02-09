<template>
    <el-container>
      <el-header>自定义数据分析</el-header>
      <el-main>
        <el-form :model="form" label-width="120px">
          <el-form-item label="选择图表类型">
            <el-select v-model="form.chartType" placeholder="请选择图表类型">
              <el-option label="折线图" value="line"></el-option>
              <el-option label="柱状图" value="bar"></el-option>
              <el-option label="散点图" value="scatter"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择X轴字段">
            <el-select v-model="form.xField" placeholder="请选择X轴字段">
              <el-option label="游戏名称" value="name"></el-option>
              <el-option label="价格" value="price"></el-option>
              <el-option label="好评数" value="positiveRatings"></el-option>
              <el-option label="好评率" value="positiveRate"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择Y轴字段">
            <el-select v-model="form.yField" placeholder="请选择Y轴字段">
              <el-option label="价格" value="price"></el-option>
              <el-option label="好评数" value="positiveRatings"></el-option>
              <el-option label="好评率" value="positiveRate"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="drawChart">绘制图表</el-button>
        </el-form>
        <div id="customChart" style="width: 100%; height: 400px; margin-top: 20px;"></div>
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
      const form = ref({
        chartType: 'line',
        xField: 'name',
        yField: 'price'
      });
  
      onMounted(async () => {
        try {
          const response = await getAllGames();
          games.value = response.data.map(game => ({
            ...game,
            positiveRate: game.positiveRatings / (game.positiveRatings + game.negativeRatings)
          }));
        } catch (error) {
          console.error('Failed to fetch games:', error);
        }
      });
  
      const drawChart = () => {
        const customChart = echarts.init(document.getElementById('customChart'));
        const option = {
          title: {
            text: '自定义数据分析',
            left: 'center'
          },
          xAxis: {
            type: 'category',
            data: games.value.map(game => game[form.value.xField])
          },
          yAxis: {
            type: 'value',
            name: form.value.yField
          },
          series: [
            {
              type: form.value.chartType,
              data: games.value.map(game => game[form.value.yField])
            }
          ]
        };
        customChart.setOption(option);
      };
  
      return { form, drawChart };
    }
  };
  </script>
  
  <style>
  #customChart {
    margin: 0 auto;
  }
  </style>
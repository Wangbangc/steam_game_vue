<template>
  <div id="app">
    <el-container style="height: 100vh;">
      <el-aside v-if="!isAuthPage" width="200px" style="background-color: #ffffff; border-right: 1px solid #e0e0e0; box-shadow: 2px 0 2px -1px rgba(0, 0, 0, 0.1);">
        <el-menu :default-active="route.path" class="el-menu-vertical-demo" style="border-right: none;">
          <el-menu-item index="/sales-prediction" @click="goToPage('/sales-prediction')">
            <el-icon><Document /></el-icon>
            <span>游戏销量预测</span>
          </el-menu-item>
          <el-menu-item index="/price-rating-analysis" @click="goToPage('/price-rating-analysis')">
            <el-icon><Histogram /></el-icon>
            <span>价格与评价的关系分析</span>
          </el-menu-item>
          <el-menu-item index="/rose-chart" @click="goToPage('/rose-chart')">
            <el-icon><PieChart /></el-icon>
            <span>环形玫瑰图</span>
          </el-menu-item>
          <el-menu-item index="/bar-line-chart" @click="goToPage('/bar-line-chart')">
            <el-icon><TrendCharts /></el-icon>
            <span>双轴对比柱线图</span>
          </el-menu-item>
          <el-menu-item index="/bubble-chart" @click="goToPage('/bubble-chart')">
            <el-icon><ScatterChart /></el-icon>
            <span>气泡散点图</span>
          </el-menu-item>
          <el-menu-item index="/dynamic-bar-chart" @click="goToPage('/dynamic-bar-chart')">
            <el-icon><BarChart /></el-icon>
            <span>动态排序条形图</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header v-if="!isAuthPage" height="50px" style="background-color: #ffffff; border-bottom: 1px solid #e0e0e0; box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1); padding: 0;">
          <el-menu :default-active="route.path" class="el-menu-demo" mode="horizontal" style="border-bottom: none;">
            <el-menu-item index="/home" @click="goToPage('/home')">
              <el-icon><HomeFilled /></el-icon>
              首页
            </el-menu-item>
            <el-menu-item index="/games" @click="goToPage('/games')">
              <el-icon><Grid /></el-icon>
              游戏列表
            </el-menu-item>
            <el-menu-item index="/custom-analysis" @click="goToPage('/custom-analysis')">
              <el-icon><DataAnalysis /></el-icon>
              自定义分析
            </el-menu-item>
            <el-menu-item index="/profile" @click="goToPage('/discount-games')">
              <el-icon><User /></el-icon>
              在线游戏查询
            </el-menu-item>
          </el-menu>
        </el-header>
        <el-main style="padding: 20px; background-color: #f5f7fa; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); border-radius: 5px;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Document,
  Histogram,
  PieChart,
  TrendCharts,
  ScatterChart,
  BarChart,
  HomeFilled,
  Grid,
  DataAnalysis,
  User
} from '@element-plus/icons-vue';

export default {
  name: 'App',
  components: {
    Document,
    Histogram,
    PieChart,
    TrendCharts,
    ScatterChart,
    BarChart,
    HomeFilled,
    Grid,
    DataAnalysis,
    User
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isAuthPage = computed(() => ['login', 'register'].includes(route.name));

    const goToPage = (path) => {
      router.push(path);
    };

    watch(route, (newRoute) => {
      console.log('Route changed to:', newRoute.name);
    });

    return { isAuthPage, goToPage, route };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

/* 全局样式，移除默认边距 */
body {
  margin: 0;
}

/* Element Plus Menu 全局样式 */
.el-menu-item {
  color: #333;
}
.el-menu-item:hover {
  color: #409EFF;
}

.el-menu--horizontal .el-menu-item.is-active {
  border-bottom: 2px solid #409EFF;
  color: #409EFF;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu--vertical {
  width: 100%;
  }

  .el-aside {
  display: flex;
  flex-direction: column;
  }

</style>
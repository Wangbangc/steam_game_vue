<template>
  <div id="app">
    <el-container>
      <el-header v-if="!isAuthPage" height="50px">
        <el-menu :default-active="route.name" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="home" @click="goToPage('/home')">首页</el-menu-item>
          <el-menu-item index="games" @click="goToPage('/games')">游戏列表</el-menu-item>
          <el-menu-item index="analysis" @click="goToPage('/analysis')">数据分析</el-menu-item>
          <el-menu-item index="profile" @click="goToPage('/profile')">用户中心</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside v-if="!isAuthPage" width="200px">
          <el-menu :default-active="'1'" class="el-menu-vertical-demo">
            <el-menu-item index="1">导航一</el-menu-item>
            <el-menu-item index="2">导航二</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'App',
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
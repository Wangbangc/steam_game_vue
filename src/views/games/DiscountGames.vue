<template>
  <div>
    <h1>游戏信息</h1>
    <div v-if="gameInfo && gameInfo.combine_games && gameInfo.combine_games.length > 0">
      <!-- 确保 gameInfo、combine_games 存在，并且 combine_games 数组不为空 -->
      <div v-for="game in gameInfo.combine_games" :key="game.game_id">
        <!-- 循环渲染每个游戏 -->
        <h2>{{ game.name }}</h2>
        <p v-if="game.desc">简介: {{ game.desc }}</p>
        <p v-if="game.tag">游戏标签: {{ game.tag }}</p>
        <p v-if="game.combine_rating">玩家评分: {{ game.combine_rating }}</p>
        <p v-if="game.combine_rating_num">评分人数: {{ game.combine_rating_num }}</p>
        <p v-if="game.wannan">想玩人数: {{ game.wannan }}</p>
        <p v-if="game.platforms">
          游戏平台:
          <span v-for="platform in parsePlatforms(game.platforms)" :key="platform">
            {{ platform}}、
          </span>
        </p>
        <img v-if="game.game_photo" :src="game.game_photo" alt="游戏图片">
        <img v-if="game.img" :src="game.img" alt="游戏图片2">
      </div>
    </div>
    <div v-else>
      <p>请输入游戏名称：</p>
      <input type="text" v-model="gameName" />
      <button @click="fetchGameInfo">查询</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getGameInfo } from '@/api/gameApi'; // 引入 API

export default {
  setup() {
    const gameName = ref('');
    const gameInfo = ref(null);

    const platformMap = {
      '1': 'PlayStation',
      '8': 'Xbox',
      '998': 'Steam',
      '999': 'Nintendo Switch',
    };

    const parsePlatforms = (platforms) => {
      if (!platforms) {
        return [];
      }

      const platformIds = platforms.split(',');
      const platformNames = platformIds.map(id => platformMap[id] || '未知平台');
      return platformNames;
    };

    const fetchGameInfo = async () => {
      try {
        // 调用 API
        const data = await getGameInfo(gameName.value);
        gameInfo.value = data;
      } catch (error) {
        console.error('获取游戏信息失败:', error);
        gameInfo.value = null;
      }
    };

    return {
      gameName,
      gameInfo,
      fetchGameInfo,
      parsePlatforms,
    };
  },
};
</script>
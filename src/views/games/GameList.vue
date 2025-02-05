<template>
  <el-container>
    <el-header>
      <el-input v-model="searchQuery" placeholder="搜索游戏" clearable @input="handleSearch" style="width: 300px; margin-bottom: 20px;"></el-input>
    </el-header>
    <el-main>
      <el-table :data="paginatedGames" style="width: 100%" @sort-change="handleSort" fit>
        <el-table-column
          prop="name"
          label="游戏名称"
          min-width="200"
          sortable
        ></el-table-column>
        <el-table-column
          prop="positiveRatings"
          label="好评数量"
          min-width="150"
          sortable
        ></el-table-column>
        <el-table-column
          prop="negativeRatings"
          label="差评数量"
          min-width="150"
          sortable
        ></el-table-column>
        <el-table-column
          prop="averagePlaytime"
          label="平均游玩时间"
          min-width="150"
          sortable
        ></el-table-column>
        <el-table-column
          prop="price"
          label="定价"
          min-width="100"
          sortable
        ></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="games.length"
        :page-size="pageSize"
        v-model:current-page="currentPage"
        @current-change="handlePageChange"
      />
    </el-main>
  </el-container>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import  {getAllGames}  from '@/api/gameApi';

export default {
  setup() {
    const games = ref([]);
    const searchQuery = ref('');
    const pageSize = 100;
    const currentPage = ref(1);
    const sortKey = ref('');
    const sortOrder = ref('');

    onMounted(async () => {
      try {
        const response = await getAllGames();
        console.log(response);
        games.value = response.data;
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    });

    const filteredGames = computed(() => {
      return games.value.filter(game =>
        game.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const paginatedGames = computed(() => {
      let sorted = [...filteredGames.value];
      if (sortKey.value) {
        sorted = sorted.sort((a, b) => {
          const result = a[sortKey.value] - b[sortKey.value];
          return sortOrder.value === 'ascending' ? result : -result;
        });
      }
      const start = (currentPage.value - 1) * pageSize;
      const end = start + pageSize;
      return sorted.slice(start, end);
    });

    const handleSearch = () => {
      currentPage.value = 1;
    };

    const handleSort = ({ prop, order }) => {
      sortKey.value = prop;
      sortOrder.value = order;
    };

    const handlePageChange = (page) => {
      currentPage.value = page;
    };

    return { searchQuery, games, paginatedGames, pageSize, currentPage, handlePageChange, handleSearch, handleSort };
  },
};
</script>

<style>
.el-table th, .el-table td {
  text-align: center;
}
.el-pagination {
  margin-top: 20px;
}
.el-table th {
  cursor: pointer;
}
</style>
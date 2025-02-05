<template>
  <el-form :model="profileForm" @submit.prevent="onSubmit">
    <el-form-item label="用户名">
      <el-input v-model="profileForm.username" disabled></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="profileForm.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">更新信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'UserProfile',
  setup() {
    const profileForm = ref({
      username: '',
      email: '',
    });

    onMounted(async () => {
      try {
        const response = await axios.get('/api/profile');
        profileForm.value = response.data;
      } catch (error) {
        // 处理错误
      }
    });

    const onSubmit = async () => {
      try {
        await axios.put('/api/profile', profileForm.value);
        // 处理更新成功逻辑
      } catch (error) {
        // 处理错误
      }
    };

    return { profileForm, onSubmit };
  },
};
</script>
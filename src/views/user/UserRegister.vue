<template>
  <div class="register-container">
    <el-card class="box-card">
      <h2>用户注册</h2>
      <el-form :model="registerForm" @submit.prevent="onSubmit">
        <el-form-item label="用户名">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" block>注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue';
//import axios from 'axios';

export default {
  setup() {
    const registerForm = ref({
      username: '',
      password: '',
    });

    const onSubmit = async () => {
      try {
      //  const response = await axios.post('/api/register', registerForm.value);
        // 处理注册成功逻辑
      } catch (error) {
        // 处理错误
      }
    };

    return { registerForm, onSubmit };
  },
};
</script>

<style>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
.box-card {
  width: 400px;
  padding: 20px;
}
</style>
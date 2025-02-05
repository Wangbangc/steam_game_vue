<template>
  <div class="login-container">
    <el-card class="box-card">
      <h2>用户登录</h2>
      <el-form :model="loginForm" @submit.prevent="onSubmit">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" block>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const loginForm = ref({
      username: '',
      password: '',
    });
    const store = useStore();
    const router = useRouter();

    const onSubmit = () => {
      const success = store.dispatch('login', loginForm.value);
      if (success) {
        router.push('/'); // 登录成功后跳转到主页
      } else {
        alert('用户名或密码错误');
      }
    };

    return { loginForm, onSubmit };
  },
};
</script>

<style>
.login-container {
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
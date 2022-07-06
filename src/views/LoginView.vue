<template>
  <n-grid x-gap="12" :cols="3">
    <n-gi span="1">
      <div class="left">
        <img src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" class="login-img">
        <div class="login-img-cover">
          <div class="login-img-cover-caption">SPT点餐系统</div>
        </div>
      </div>
    </n-gi>
    <n-gi span="2">
      <div class="right">
        <n-card class="right-card">
          <n-h2 style="text-align: left; font-weight: bold">账号登录</n-h2>
          <n-space vertical :size="24" style="text-align: left">
            <n-input type="text"
            v-model:value="username"
            placeholder="请输入用户名"></n-input>
            <n-input type="password"
            v-model:value="password"
            placeholder="请输入密码"></n-input>
            <n-button block type="primary" size="large" @click="login">登录</n-button>
            <div style="text-align:right">忘记密码?</div>
          </n-space>
        </n-card>
      </div>
    </n-gi>
  </n-grid>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request'
export default {
  name: 'LoginView',
  setup () {
    const username = ref('')
    const password = ref('')
    const router = useRouter()

    const login = async () => {
      const res = await post('/staff/login', {
        staffAccount: username.value,
        staffPassword: password.value
      })
      if (res.code === 200) {
        localStorage.isLogin = true
        localStorage.token = res.token
        localStorage.setItem('menu', JSON.stringify(res.menu))
        router.push({ name: 'Home' })
      } else {
        console.log(res)
        window.$message.error(res.msg)
      }
    }

    return { username, password, login }
  }
}
</script>

<style lang="scss">
.left {
  height: 100vh;
  position: relative;
}
.login-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  &-cover{
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.3);
    &-caption{
      margin-top: 48px;
      color: white;
      font-size: 48px;
      font-weight: bold;
    }
  }
}
.right {
  height: 100vh;
  display: flex;
  align-items: center;
  &-card{
    margin: 0 auto;
    max-width: 500px;
    box-shadow: 0px 0px 7px #dddddd;
  }
}
</style>

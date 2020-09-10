<template>
  <div class="login-style">
    <h1>Demo</h1>
    <input placeholder="用户名" v-model="username">
    <input type="password" placeholder="密码" v-model="password">
    <input type="password" placeholder="确认密码" v-if="type === 'register'" v-model="re_password">
    <button type="primary" v-if="type === 'register'" @click="signup()">注册</button>
    <button type="primary" v-else @click="login()">登录</button>
    <router-link to="/login" v-show="type === 'register'" tag="p">已有账号，去登录</router-link>
    <router-link to="/register" v-show="type === 'login'" tag="p">没有账号，去注册</router-link>
  </div>
</template>

<script>
  import {userLogin} from "../../network/login";

  export default {
    data() {
      return {
        username: '',
        password: '',
        re_password: '',
        sayhub_token: ''
      }
    },
    props: {
      type: {
        type: String
      }
    },
    methods: {
      // 注册
      signup() {
      },
      // 登陆
      login() {
        if (this.username === '') {
          console.log('用户名不能为空哦~~');
        } else if (this.password === '') {
          console.log('用户名不能为空哦~~');
        } else {
          userLogin(this.username, this.password).then(res => {
            console.log(res);
          })
        }
      }
    }
  }
</script>

<style scoped>
  .login-style {
    border: 1px solid #fff;
    text-align: center;
    padding: 20px;
    line-height: 50px;
    background: #fff;
    width: 300px;
    box-shadow: 0 1px 3px 0 rgba(0, 34, 77, 0.5);
  }

  p {
    font-size: 12px;
    cursor: pointer;
  }
</style>

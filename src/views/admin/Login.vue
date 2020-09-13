<template>
  <div id="admin-login">
    <input type="text" v-model="username" placeholder="请输入管理员名称">
    <input type="password" v-model="password" placeholder="请输入管理员密码">
    <button @click="signup">登录</button>
  </div>
</template>

<script>
  import {adminLogin} from "network/login"

  export default {
    name: "login",
    data() {
      return {
        username: "",
        password: "",
        rememberMe: true
      }
    },
    methods: {
      signup() {
        const form = {
          username: this.username,
          password: this.password,
          rememberMe: this.rememberMe
        }
        adminLogin(form).then(res => {
          if(!res.success) {
            alert(res.errorMsg)
          }
          else this.$router.push('/admin/index');
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>

</style>

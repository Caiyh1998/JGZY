<template>
  <div id="login">
    <nav-bar class="login-nav-bar">
      <div v-if="isLogin()" slot="item-center">用户登录</div>
      <div v-else slot="item-center">用户注册</div>
    </nav-bar>
    <div class="content">

      <div class="login-view">
        <div class="input-view" v-if="!isLogin()">
          <div class="input-lable">
            <span>昵称</span>
          </div>
          <input v-model="username" name="username" type="text" placeholder="输入昵称">
          <p>昵称修改需改名卡，请慎重填写</p>
        </div>
        <div class="input-view">
          <div class="input-lable">
            <span>手机号</span>
          </div>
          <input v-model="phoneCode" name="phoncCode" type="number" placeholder="输入手机号">
        </div>
        <div class="input-view">
          <div class="input-lable">
            <span>密码</span>
          </div>
          <input v-model="password" name="password" type="password" placeholder="输入密码">
        </div>
        <div class="input-view" v-if="!isLogin()">
          <div class="input-lable"><span>确认</span></div>
          <input v-model="password0" name="password0" type="password" placeholder="确认密码">
        </div>
        <div class="input-foot" v-if="isLogin()">
          <div class="input-span">
            <span>记住我</span>
            <input v-model="rememberMe" name="rememberMe" type="checkbox">
          </div>
          <span><a href="/register">没有账号？点我立即注册</a></span>
        </div>
        <div class="input-foot" v-else>
          <div class="input-span">
            <span>自动登录</span>
            <input v-model="loginAuto" name="loginAuto" type="checkbox">
          </div>
          <span><a href="/login">已有账号？点我立即登录</a></span>
        </div>

        <div class="input-btn">
          <button v-if="isLogin()" @click="login">登录</button>
          <button v-else @click="register">注册</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import {userLogin,userRegister} from "network/login"

  export default {
    data() {
      return {
        username: "",
        phoneCode: "",
        password: "",
        password0: "",
        rememberMe: false,
        loginAuto: true,
      }
    },
    components: {
      // Item，
      NavBar
    },
    methods: {
      isLogin() {
        return this.$route.path === '/login'
      },
      login() {
        if (this.phoneCode === "") {
          alert("长劲鹿不记得这个手机号")
          return
        } else if (this.password === "") {
          alert("长劲鹿觉得你密码为空很不应该")
          return
        }
        const form = {
          phoneCode: this.phoneCode,
          password: this.password,
          rememberMe: this.rememberMe
        }
        userLogin(form).then(res => {
          if(!res.success) {
            alert(res.errorMsg)
          }
          else this.$router.push('/home');
        }).catch(err => {
          console.log(err);
        })
      },
      register() {
        if (this.username === "") {
          alert("长颈鹿提醒你要慎重起名")
          return
        } else if (this.phoneCode === "") {
          alert("长劲鹿希望你有一个手机号")
          return
        } else if (this.password === "") {
          alert("长劲鹿觉得你密码为空很不应该")
          return
        } else if (this.password0 === "") {
          alert("长劲鹿希望你确认一下密码")
          return
        } else if (this.password !== this.password0) {
          alert("长劲鹿发现你两次输入多密码不一致")
          return
        }
        const form = {
          username: this.username,
          phoneCode: this.phoneCode,
          password: this.password,
          loginAuto: this.loginAuto
        }
        userRegister(form).then(res => {
          if(res.success && this.loginAuto) this.$router.push('/home')
          else if(res.success) {
            alert(res.message)
          }
          else if(!res.success){
            alert(res.message)
          }
          else {
            this.$router.push('/login')
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  #login {
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .login-nav-bar {
    background-color: var(--color-tint);
    color: #000000;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .2);

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content {
    margin-top: 44px;
    height: calc(100vh - 93px);

    position: relative;
  }

  .login-view {
    position: absolute;
    top: 20vh;
    right: 10%;
    left: 10%;
    padding: 5%;
    border-radius: 10px;
    width: 80%;
    background-color: #f2f2f2;
    padding-top: 10%;
  }

  .input-view {
    width: 100%;
    padding: 4%;
    position: relative;
  }

  .input-lable {
    text-align: center;
    width: 30%;
    line-height: 22px;
    font-size: 22px;
    display: inline;
    padding-right: 2%;
    margin: 0;
    color: #1298DB;
    align-content: center;
  }

  .input-lable span {
    margin: 0 auto;
  }

  .input-view input {
    height: 22px;
    font-size: 20px;
    width: 65%;
    margin: 0;
    padding: 0;
    display: inline;
    position: absolute;
    right: 5%;
  }

  .input-foot {
    padding: 3%;
    display: flex;
    width: 100%;
  }

  .input-span {
    flex: 1;
    padding-right: 2%;
  }

  .input-btn {
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
  }
  .input-btn button {
    border-radius: 5px;
    padding: 2px;
    width: 80%;
    font-size: 20px;
  }
</style>

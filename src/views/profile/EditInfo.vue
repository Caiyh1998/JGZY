<template>
  <div id="editinfo">
    <nav-bar class="editinfo-nav-bar">
      <img slot="item-left" src="~assets/img/common/back.svg" alt="" @click="backProfile">
      <div slot="item-center">账户管理</div>
    </nav-bar>
    <div class="content">
      <div>
        <span>昵称：</span><input v-model="username" name="username" type="text" disabled="disabled">
        <button>使用改名卡</button>
      </div>
      <div>
        <span>手机号：</span><input v-model="phoneCode" name="username" type="text">
      </div>
      <div><button @click="update">修改</button></div>
      <div>
        <span>原密码 ：</span><input v-model="oldPassword" name="old_password" type="password">
      </div>
      <div>
        <span>新密码 ：</span><input v-model="newPassword" name="new_password" type="password">
      </div>
      <div>
        <span>确认新密码 ：</span><input v-model="newPassword0" name="new_password0" type="password">
      </div>
      <div>
        <button @click="updatePassword">修改密码</button>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import {update,updatePassword} from "network/handle"

  export default {
    name: "Edit",
    components: {
      NavBar,
    },
    data() {
      return {
        username: '',
        phoneCode: '',
        oldPassword: '',
        newPassword: '',
        newPassword0: '',
      }
    },
    computed: {

    },
    created() {
      this.username = this.$store.getters.getUserInfo.UserName
      this.phoneCode = this.$store.getters.getUserInfo.PhoneCode
    },
    activated() {
      this.username = this.$store.getters.getUserInfo.UserName
      this.phoneCode = this.$store.getters.getUserInfo.PhoneCode
    },
    methods: {
      backProfile() {
        this.$router.push('/profile')
      },
      update() {
        const form = {
          username: this.username,
          phoneCode: this.phoneCode
        }
        update(form).then(res => {
          alert('修改成功')
          this.$router.go(0);
        }).catch(err => {
          console.log(err);
        })
      },
      updatePassword() {
        if(this.oldPassword === ''){
          alert('请先验证旧密码')
          return
        }
        else if(this.newPassword === ''){
          alert('请输入新密码')
          return
        }
        else if(this.newPassword0 === ''){
          alert('请重复新密码')
          return
        }
        else if(this.oldPassword === this.newPassword){
          alert('新密码与旧密码重复')
          return
        }
        else if(this.newPassword !== this.newPassword0) {
          alert('两次输入的密码不一致')
          return
        }
        const form = {
          old_password: this.oldPassword,
          new_password: this.newPassword
        }
        updatePassword(form).then(res => {
          alert('修改成功')
          this.$router.go(0);
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  #editinfo {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    height: 100vh;
    width: 100%;
    overflow: hidden;
    z-index: 9;
  }

  .editinfo-nav-bar {
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
    height: calc(100% - 44px);
    width: 100%;
    margin-top: 45px;
    padding: 10px;
    overflow: scroll;
    z-index: 9;
    background-color: #ffffff;
  }
</style>

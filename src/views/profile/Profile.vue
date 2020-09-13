<template>
  <div id="profile">
    <nav-bar class="profile-nav-bar"/>
    <my-dialog v-show="dialogIsShow" >
      <p slot="dialog_content">确定要退出登录吗？</p>
      <button slot="dialog_btn" @click="logout">确定</button>
      <button slot="dialog_btn" @click="cloDialog">取消</button>
    </my-dialog>
    <scroll class="content" ref="scroll"
            :probe-type="1" :pull-up-load="false">
      <div>
        <UserInfo>
          <div slot="user-nickname" v-if="isShow">{{userInfo.UserName}}</div>
          <div slot="user-phone" v-if="isShow">{{userInfo.PhoneCode}}</div>
          <div class="user-icon" slot="user-icon" v-if="isShow"><img src="~assets/img/common/top.png"></div>
        </UserInfo>

        <section class="account">
          <div class="account-item">
            <div class="number" v-if="!isShow">
              <span class="balance">0.00</span>元
            </div>
            <div class="number" v-else>
              <span class="balance">完善中</span>
            </div>
            <div class="account-info">我的余额</div>
          </div>
          <div class="account-item">
            <div class="number" v-if="!isShow">
              <span class="balance">0</span>个
            </div>
            <div class="number" v-else="isShow">
              <span class="balance">完善中</span>
            </div>
            <div class="account-info">我的收藏</div>
          </div>
          <div class="account-item">
            <div class="number" v-if="!isShow">
              <span class="balance">0</span>分
            </div>
            <div class="number" v-else="isShow">
              <span class="balance">{{userInfo.Integral}}</span>分
            </div>
            <div class="account-info">我的积分</div>
          </div>
        </section>

        <list-view :list-data="orderList" class="order-list"></list-view>
        <list-view :list-data="serviceList" class="service-list"></list-view>
        <div class="logout" v-show="isShow">
          <button @click="showDialog">退出登录</button>
        </div>
      </div>
    </scroll>
    <modal v-show="isShowModal">
      <div slot="modal-header">
        <h3></h3>
      </div>
      <div slot="modal-body">
        <div>
          <span>转赠对象手机号：</span>
          <input v-model="sendphone" type="text"/>
        </div>
        <div>
          <span>转赠积分数额：</span>
          <input v-model="sendintegral"  type="number"/>
        </div>
      </div>
      <div slot="modal-footer">
        将向'{{sendphone}}'转赠'{{sendintegral}}'积分，请确认
        <div>
          <button @click="sendIntegral">确认</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/bscroll/Scroll";
  import UserInfo from "./UserInfo";
  import ListView from "./ListView";
  import MyDialog from "components/common/dialog/Dialog";
  import Modal from "components/common/modal/Modal";

  import {sendIntegral} from "network/handle";

  export default {
    name: "Profile",
    components: {
      NavBar,
      Scroll,
      UserInfo,
      ListView,
      MyDialog,
      Modal
    },
    data() {
      return {
        orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#download', iconColor: '#ff8198', info: '积分转赠'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '改名卡'},
        ],
        serviceList: [
          {icon: '#human', iconColor: '#ff8198', info: '账户管理'},
          {icon: '#speed', iconColor: '#ff8198', info: '下载坚果桌游APP'},
        ],
        dialogIsShow: false,
        isShowModal: false,
        sendphone: '',
        sendintegral: '',
      }
    },
    computed: {
      isShow() {
        return this.$store.state.isLogin
      },
      userInfo() {
          return this.$store.getters.getUserInfo
      }
    },
    mounted() {
      this.$bus.$on('showModal',() => {
        this.showModal()
      })
      this.$bus.$on('cloModal',() => {
        this.cloModal()
      })
    },
    methods: {
      logout() {
        this.$store.commit("delToken")
        this.cloDialog()
      },
      showDialog() {
        this.dialogIsShow = true
      },
      cloDialog() {
        this.dialogIsShow = false
      },
      showModal() {
        this.isShowModal = true
      },
      cloModal() {
        this.isShowModal = false
      },
      sendIntegral() {
        sendIntegral(this.sendphone, this.sendintegral).then((res) => {
          if(res.success){
            alert('赠送成功')
            this.cloModal()
          }else if(res.message==='用户不存在'){
            alert('该用户手机号不存在，请检查')
          }
        })
      }
    },
  }
</script>

<style scoped>
  #profile {
    height: 100vh;
    background-color: #f2f2f2;
    overflow: hidden;
  }

  .profile-nav-bar {
    background-color: #1298DB;
    color: #000000;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .user-icon img {
    float: left;
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 16px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }

  .content {
    height: calc(100% - 95px);
    overflow: hidden;
    margin-top: 43px;
    align-content: center;
  }

  .logout {
    width: 80%;
    height: 40px;
    margin: 5% auto;
    align-content: center;
  }

  .logout button {
    border-radius: 5px;
    border: 0px;
    background-color: #00C78C;
    color: #ffffff;
    height: 100%;
    width: 100%;
  }


</style>

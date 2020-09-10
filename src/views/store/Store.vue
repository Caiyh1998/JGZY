<template>
  <div id="store">
    <nav-bar class="store-nav-bar">
      <div slot="item-center">积分商城</div>
    </nav-bar>
    <my-dialog v-show="dialogIsShow" >
      <p slot="dialog_content">请先登录，即可兑换</p>
        <button slot="dialog_btn" @click="toLogin">去登录</button>
        <button slot="dialog_btn" @click="cloDialog">取消</button>
    </my-dialog>
    <div class="content">
      <tab-menu-left :active="isActive"/>
      <scroll class="store-scrolls" ref="scroll1" :probe-type="3" @scroll="contentScroll">
        <tab-content :categoryDetail="goods"/>
      </scroll>
    </div>
    <modal v-show="isShowModal" :goods="singleGoods"/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/bscroll/Scroll";
  import TabMenuLeft from "./TabMenuLeft";
  import TabContent from "./TabContent";
  import MyDialog from "components/common/dialog/Dialog";
  import Modal from "components/common/modal/Modal";

  import {getStoreData} from "network/store"
  import {BuyOne} from "network/handle"
  import {debounce} from "common/utils"

  export default {
    name: "Store",
    components: {
      NavBar,
      Scroll,
      TabMenuLeft,
      TabContent,
      MyDialog,
      Modal
    },
    data() {
      return {
        goods: {
          '饮品': [],
          '其他': [],
        },
        singleGoods: {},
        dialogIsShow: false,
        isShowModal: false,
        isActive: '饮品'
      }
    },
    created() {
      this.getStoreData('饮品')
      // this.getStoreData('饮品')
      this.getStoreData('其他')
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll1.refresh, 500)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
      this.$bus.$on('showDialog',() => {
        this.showDialog()
      })
      this.$bus.$on('showModal1',(goods) => {
        this.showModal(goods)
      })
      this.$bus.$on('cloModal',() => {
        this.cloModal()
      })
      this.$bus.$on('selectItem',(index,item) => {
        this.selectItem(index,item)
      })
      this.$bus.$on('BuyOne',(gid,remarks) => {
        if(confirm('确认兑换？')){
          this.BuyOne(gid,remarks)
          this.isShowModal = false
        }
        else return '用户取消操作'
      })
    },
    methods: {
      getStoreData(type) {
        getStoreData(type).then(res => {
          console.log(res);
          this.goods[type] = res.data.list
        })
      },
      showDialog() {
        this.dialogIsShow = true
      },
      cloDialog() {
        this.dialogIsShow = false
      },
      showModal(goods) {
        this.isShowModal = true
        this.singleGoods = goods
      },
      cloModal() {
        this.isShowModal = false
      },
      toLogin() {
        this.$router.push('/login')
      },
      contentScroll(position) {
        if ((-position.y) < this.goods['饮品'].length * 200)
          this.isActive = '饮品'
        // else if ((-position.y) >= this.goods['饮品'].length * 200)
        else
          this.isActive = '其他'
      },
      selectItem(index,item) {
        let y = 0
        if(index===0){
          this.$refs.scroll1.scrollTo(0,-y,500)
          return
        }
        else {
          y = this.goods.length * 200 * index
          console.log(y);
          this.$refs.scroll1.scrollTo(0,-y,500)
        }
      },
      BuyOne(gid, remarks='无') {
        BuyOne(gid, remarks).then((res) => {
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>

  #store {
    height: 100vh;
    overflow: hidden;
  }

  .store-nav-bar {
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
    height: calc(100% - 95px);
    margin-top: 45px;
  }

  .store-scrolls {
    height: calc(100% - 0px);
    width: calc(100% - 100px);
    float: right;
    overflow: hidden;
  }

</style>

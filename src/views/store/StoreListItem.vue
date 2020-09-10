<template>
  <div class="goods">
    <div class="goods-img"><img :src="imgsrc+goods.GoodsImages" alt="" @load="imageLoad"></div>

    <div class="goods-info">
      <p>{{goods.GoodsName}}</p>

      <div class="small-info">
        <span class="price">{{goods.GoodsPrice}}积分</span>
        <span class="stock">剩余{{goods.GoodsStock}}</span>
      </div>
      <div class="goods-bottom">
        <div class="bottom-left">
<!--          <span @click="add">+</span><span>{{count}}</span><span @click="sub">-</span>-->
        </div>
        <div class="bottom-right">
          <button v-if="goods.GoodsType === '饮品'" @click="addCart">选规格</button>
          <button v-else @click="BuyOne">兑换</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "StoreListItem",
    components: {},
    data () {
      return {
        count: 0,
      }
    },
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      },
      imgsrc: {
        type: String,
        default() {
          return "http://localhost:7001/public/JGZY_DATA/STORE_IMG/";
        }
      },
    },
    methods: {
      imageLoad() {
        // console.log('imageLoad');
        this.$bus.$emit('itemImageLoad')
      },
      add() {
        this.count++
      },
      sub() {
        if (this.count === 0) return
        this.count--
      },
      addCart() {
        if(!this.$store.state.isLogin){
          this.$bus.$emit("showDialog")
        }else {
          this.$bus.$emit("showModal1",this.goods)
        }
      },
      BuyOne() {
        this.$bus.$emit('BuyOne', this.goods.GoodsID)
      }
    },
  }
</script>

<style scoped>
  .goods {
    height: 200px;
    width: 100%;
    display: flex;
    border-bottom: 1px solid #ff5777;
  }

  .goods img {
    width: 120px;
  }

  .goods-img {
    padding: 5px;
    flex: 2;
  }

  .goods-info {
    padding: 10px;
    flex: 3;
    position: relative;
  }

  .goods-info p {
    color: #333333;
    padding: 2px;
    margin-bottom: 3px;

  }

  .small-info span {
    display: block;
    font-size: 10px;
    padding: 2px;
  }


  .goods-bottom {
    position: absolute;
    display: flex;
    width: 100%;
    bottom: 15px;
    padding: 5px;
  }

  .bottom-right{
    flex: 1;
    padding: 5px;
  }
  .bottom-right button{
    padding: 2px;
    font-size: 14px;
  }

  .bottom-left {
    flex: 1;
    height: 24px;
    width: 24px;
    font-size: 20px;
    justify-content: center;
    margin-right: 20px;
  }

  .bottom-left span {
    padding: 5px;
  }

</style>

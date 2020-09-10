<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <slot name="modal-header">
          <h3>{{goods.GoodsName}}</h3>
        </slot>
      </div>
      <div class="modal-body">
        <slot name="modal-body">
          <p>规格</p>
          <div class="modal-btn">
            <button v-for="(item,index) in ice"
                    :class="{active:selectItemIndex1 === index}"
                    @click="itemClick1(index)">
              {{item}}
            </button>

          </div>
          <p>口味</p>
          <div class="modal-btn">
            <button v-for="(item,index) in sugar"
                    :class="{active:selectItemIndex2 === index}"
                    @click="itemClick2(index)">
              {{item}}
            </button>
          </div>
          <p>已选规格：{{ice[selectItemIndex1]}} {{sugar[selectItemIndex2]}}</p>
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="modal-footer">

          总计&nbsp;<span>&nbsp;¥{{goods.GoodsPrice}}</span>
          <div class="modal-footer-right">
            <button @click="BuyOne">兑换</button>
          </div>

        </slot>
      </div>

    </div>
    <div class="modal-close"><img src="~assets/img/common/close.svg" @click="closeSelf"></div>
  </div>

</template>

<script>
  export default {
    name: "Modal",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    data() {
      return {
        ice: ['多冰', '少冰', '正常冰'],
        sugar: ['多糖', '少糖', '正常糖'],
        selectItemIndex1: 2,
        selectItemIndex2: 2,
      }
    },
    methods: {
      closeSelf() {
        this.$bus.$emit("cloModal")
      },
      itemClick1(index) {
        this.selectItemIndex1 = index
      },
      itemClick2(index) {
        this.selectItemIndex2 = index
      },
      BuyOne() {
        const remarks = this.ice[this.selectItemIndex1] + this.sugar[this.selectItemIndex2]
        this.$bus.$emit('BuyOne', this.goods.GoodsID, remarks)
      }
    }
  }
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    justify-content: center;
    align-items: center;
    z-index: 9;
  }

  .modal {
    margin: 0 auto;
    margin-top: 40vh;
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    width: 80vw;
    height: auto;
  }

  .modal-header {
    /*border-bottom: 1px solid #eee;*/
    color: #313131;
    justify-content: space-between;
    padding: 15px;
    display: flex;
  }

  .modal-body {
    font-size: 14px;
    position: relative;
    padding-left: 15px;
  }

  .modal-footer {
    padding: 15px;
    display: flex;
    line-height: 28px;
    position: relative;
  }

  .modal-footer span {
    font-size: 28px;
    color: #ff5f3e;
  }

  .modal-footer button {
    padding: 5px;
    line-height: 20px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #1298DB;
    background-color: #1298DB;
    color: #ffffff;
  }

  .modal-footer-right {
    position: absolute;
    right: 15px;
  }

  .modal-close {
    margin: 10px auto;
    width: 100vw;
    text-align: center;
  }

  .modal-close img {
    height: 50px;
  }

  .modal-btn {
    padding-top: 5px;
    padding-bottom: 5px;
    /*padding-left: 5px;*/
  }

  .modal-btn button {
    background-color: #ffffff;
    font-size: 16px;
    border: 1px solid #000000;
    border-radius: 5px;
    padding: 4px;
    margin-right: 5px;
    outline:none;
  }

  .modal-btn .active {
    background-color: #FFD700;
    border: 1px solid #FFD700;
  }


  .modal-btn button:active {
    background-color: #FFD700;
    border: 1px solid #FFD700;
  }

  .modal-btn button:hover {
    background-color: #FFD700;
    border: 1px solid #FFD700;
  }

</style>

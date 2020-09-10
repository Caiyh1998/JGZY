<template>

  <div class="game-item">
    <!--      <div class="game-title">{{game.Title}}</div>-->
    <div class="game-title">{{game.GameTitle}}</div>

    <!--      <div class="game-date">{{game.Date}}</div>-->
    <div class="game-date">{{game.GameDate}}</div>

    <div class="game-info" v-if="!isSign">
      <!--        <p>参赛名额{{game.Quota}}</p>-->
      <span>参赛名额：{{game.GameQuota}}/{{game.PlayerCNT}}</span>
      <div class="game-info-btn">
        <button @click="signUp" v-bind:disabled=isDisabled>{{btn_value}}</button>
      </div>
    </div>

    <div class="game-info" v-else>
      <span>已报名,座位号 </span>
      <span class="red">{{saetNum}}</span>
    </div>

  </div>

</template>

<script>
  export default {
    name: "GameItem",
    data() {
      return {
        btn_value : '报名参赛',
        userinfo: this.$store.getters.getUserInfo
      }
    },
    props: {
      game : {
        type : Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      isDisabled() {
        if (this.game.PlayerCNT >= this.game.GameQuota ){
          this.btn_value = '已报满'
          return true
        }
        else {
          this.btn_value = '报名参赛'
          return false
        }
      },
      isSign() {
        if(JSON.stringify(this.game.Player).indexOf(this.userinfo.UserID) !== -1){
          return true
        }
        return false
      },
      saetNum() {
        const object = JSON.parse(this.game.Player)
        for(const player in object){
          if( object[player].userid === this.userinfo.UserID) {
            return object[player].seatNum
          }
        }
        return 'err'
      }
    },
    methods: {
      signUp() {
        if(confirm('确认报名？')){
          this.$bus.$emit("signUp",this.game.GameID)
        }
        else return '用户取消操作'
      }
    }
  }
</script>

<style scoped>

  .game-item {
    margin: 10px auto;
    padding: 15px;
    border: 1px solid #666666;
    border-radius: 10px;
    height: auto;
    width: 100%;
  }

  .game-title {
    font-size: 20px;
    line-height: 20px;
  }

  .game-date {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .game-info {
    margin: 0 auto;
    width: 100%;
    position: relative;
    font-size: 20px;
  }

  .game-info-btn {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
  .game-info-btn button {
    padding: 2px;
    font-size: 16px;
  }

  .unavailable {
    disabled: disabled
  }

  .red {
    color: #ff5f3e;
  }

</style>

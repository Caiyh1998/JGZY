<template>
  <div id="game">
    <nav-bar class="game-nav-bar">
      <img slot="item-left" src="~assets/img/common/back.svg" alt="" @click="backHome">
      <div slot="item-center">坚果赛事</div>
    </nav-bar>
    <div class="content">
      <game-item v-for="item in games" :game="item"/>
    </div>
    <game-tab-bar class="game-tab-bar"/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import GameTabBar from "components/content/GameTabBar";
  import GameItem from "./GameItem";

  import {getGameData,signUp} from "network/game"

  export default {
    name: "Game",
    components: {
      GameItem,
      NavBar,
      GameTabBar
    },
    data() {
      return {
        games: [],
      }
    },
    created() {
      this.getGameData()
    },
    mounted() {
      this.$bus.$on('signUp',(gameid) => {
        this.signUp(gameid)
      })
    },
    methods: {
      getGameData() {
        getGameData().then(res => {
          console.log(res);
          this.games = res.data.game.list
        })
      },
      signUp(gameid) {
        signUp(gameid).then(res => {
          console.log(res)
          this.$router.go(0)
        })
      },
      backHome() {
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>
  #game {
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

  .game-nav-bar {
    background-color: var(--color-tint);
    color: #000000;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .2);

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .game-tab-bar {

    z-index: 9;
  }

  .content {
    height: calc(100% - 95px);
    width: 100%;
    margin-top: 45px;
    padding: 10px;
    overflow: scroll;
  }

</style>

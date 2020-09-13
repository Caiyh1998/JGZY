<template>
  <div id="admin-game">
    <div class="modal" v-if="isShow">
      <div class="modal-view">
        <div>比赛名称：<input v-model="TEMP_ITEM.title" type="text"></div>
        <div>参赛名额：<input v-model="TEMP_ITEM.quota" type="number"></div>
        <div>比赛日期：<input v-model="TEMP_ITEM.date" type="text" placeholder="yyyy-MM-dd hh:mm:ss"></div>
        <div>报名积分：<input v-model="TEMP_ITEM.price" type="number"></div>

        <div>
          <button @click="clearAll">取消</button>
          <button @click="createGame">创建</button>
        </div>
      </div>
    </div>

    <div>
      <button @click="showModal">创建比赛</button>
    </div>

    <div class="game-tr">
      <div class="game-td">
        标题
      </div>
      <div class="game-td">
        报名积分
      </div>
      <div class="game-td">
        参赛名额
      </div>
      <div class="game-td">
        比赛时间
      </div>
      <div class="game-td">
        操作
      </div>
    </div>

    <div class="game-tr game-item" v-for="item in games">
      <div class="game-td">
        {{item.GameTitle}}
      </div>
      <div class="game-td">
        {{item.GamePrice}}
      </div>
      <div class="game-td">
        {{item.GameQuota}}/{{item.PlayerCNT}}
      </div>
      <div class="game-td">
        {{item.GameDate}}
      </div>
      <div class="game-td">
        <button>结算</button>
      </div>
    </div>
    <pagination :totalPage="0" :isEnd="false" v-on:loadMore="loadMore"/>

  </div>
</template>

<script>
  import Pagination from "components/common/pagination/Pagination"

  import {getGameData, createGame} from "network/game"

  export default {
    name: "Game",
    components: {
      Pagination
    },
    data() {
      return {
        games: [],
        isShow: false,
        TEMP_ITEM: {
          title: '',
          quota: 6,
          date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ',
          price: 100,
        },
        pageNum: 1
      }
    },
    created() {
      this.getGameData(this.pageNum)
    },
    methods: {
      clearAll() {
        this.isShow = false
      },
      showModal() {
        this.isShow = true
      },
      getGameData(page) {
        console.log(page);
        getGameData(page).then(res => {
          console.log(res);
          this.games.push(...res.data.game.list)
          this.pageNum++
        })
      },
      createGame() {
        createGame(this.TEMP_ITEM).then(res => {
          console.log(res);
          alert(res.message)
          this.clearAll()
          this.getGameData()
        })
      },
      loadMore() {
        this.getGameData(this.pageNum)
        // if (this.search === '') {
        //   this.getGameData(this.pageNum)
        // } else {
        //   this.searchUser(this.pageNum)
        // }
      }
    }
  }
</script>

<style scoped>
  #admin-game {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: #ffffff;

    overflow: scroll;
  }

  .game-tr {
    display: flex;

  }

  .game-td {
    text-align: center;
    flex: 1;
    font-size: 16px;
    line-height: 20px;
    height: 22px;
    white-space: nowrap;
    overflow-x: scroll;
  }

  .game-td button {
    font-size: 14px;
    line-height: 16px;
  }

  .game-item {
    border: 1px solid #1298DB;
    border-radius: 5px;
    font-size: 20px;
    line-height: 24px;
    padding: 5px;
    margin-top: 5px;
  }

  .modal {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.7);

    overflow: hidden;
    text-align: center;
    align-content: center;
  }

  .modal-view {
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 40%;
    height: 300px;
    width: 90%;
    background-color: #ffffff;
  }
</style>

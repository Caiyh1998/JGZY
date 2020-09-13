<template>
  <div id="admin-user">
    <div class="search">
      <input v-model="search" type="text" placeholder="请输入搜索的内容">
      <button @click="searchUser(1)"><img src="~assets/img/common/search.svg"></button>
    </div>

    <div class="user-tr">
      <div class="user-td">
        编号
      </div>
      <div class="user-td">
        昵称
      </div>
      <div class="user-td">
        手机号
      </div>
      <div class="user-td">
        积分
      </div>
      <div class="user-td">
        操作
      </div>
    </div>

    <div class="user-tr user-item" v-for="item in userList">
      <div class="user-td">
        {{item.UserID}}
      </div>
      <div class="user-td">
        {{item.UserName}}
      </div>
      <div class="user-td">
        {{item.PhoneCode}}
      </div>
      <div class="user-td">
        {{item.Integral}}
      </div>
      <div class="user-td">
        <button @click="showModal(item)">修改积分</button>
      </div>
    </div>

    <pagination :totalPage="0" :isEnd="false" v-on:loadMore="loadMore"/>

    <div class="modal" v-if="isShow">
      <div class="modal-view">
        <div>正在对{{TEMP_ITEM.UserName}}进行操作</div>
        <div>手机号{{TEMP_ITEM.PhoneCode}}</div>
        <hr>
        <div>当前积分{{TEMP_ITEM.Integral}}</div>
        <div>
          <span>+ 增加积分<input v-model="method" type="radio" name="method" value="add" checked></span>
          <span>- 扣除积分<input v-model="method" type="radio" name="method" value="sub"></span>
        </div>
        <div><input type="number" name="variation" v-model="variation"></div>
        <div>修改后积分{{newIntegral}}</div>
        <hr>
        <div>
          <span>备注：<textarea type="text" name="remarks" v-model="remarks"></textarea></span>
        </div>
        <div>
          <button @click="clearAll">取消</button>
          <button @click="updateIntegral">修改</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import Pagination from "components/common/pagination/Pagination"

  import {getUserData, searchUser} from "network/admin"
  import {updateIntegral} from "network/handle"

  export default {
    name: "User",
    components: {
      Pagination
    },
    data() {
      return {
        search: '',
        userList: [],
        isShow: false,
        TEMP_ITEM: {},
        method: 'add',
        variation: 0,
        remarks: '',
        pageNum: 1
      }
    },
    computed: {
      newIntegral() {
        if (this.method === 'add')
          return Number(this.TEMP_ITEM.Integral) + Number(this.variation)
        else
          return Number(this.TEMP_ITEM.Integral) - Number(this.variation)
      }
    },
    activated() {
      this.isShow = false
      if (this.search === '')
        this.getUserData(this.pageNum)
      else
        this.searchUser(this.pageNum)
    },
    methods: {
      updateIntegral() {
        if(confirm('将向' + this.TEMP_ITEM.UserName + this.method + this.variation + '积分')){
          const form = {
            uid: this.TEMP_ITEM.UserID,
            variation: this.variation,
            method: this.method,
            remarks: this.remarks
          }
          updateIntegral(form).then(res => {
            alert(res.message)
            this.clearAll()
            this.getUserData(1)
          })
        }
        else return '用户取消操作'
      },
      clearAll() {
        this.TEMP_ITEM = {},
        this.method = 'add',
        this.variation = 0,
        this.remarks = '',
        this.isShow = false
      },
      showModal(item) {
        this.TEMP_ITEM = item
        this.isShow = true
      },
      getUserData(page) {
        getUserData(page).then(res => {
          this.userList.push(...res.data.userList)
          this.pageNum++
        })
      },
      searchUser(page) {
        searchUser(this.search, page).then(res => {
          this.userList.push(...res.data.userList)
          this.pageNum++
        })
      },
      loadMore() {
        if (this.search === '') {
          this.getUserData(this.pageNum)
        } else {
          this.searchUser(this.pageNum)
        }
      }
    }
  }
</script>

<style scoped>
  #admin-user {
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

  .search {
    width: 100%;
    height: 44px;
    line-height: 44px;
    align-content: center;
    padding: 0;
    display: flex;
  }

  .search input {
    line-height: 40px;
    height: 44px;
    padding: 0;
    flex: 1;
  }

  .search button {
    padding: 0;
  }

  .search img {
    height: 40px;
    padding: 0;
    flex: 1;
  }

  .user-tr {
    display: flex;
    font-size: 20px;
    line-height: 24px;
  }

  .user-td {
    text-align: center;
    flex: 1;
  }

  .user-td button {
    font-size: 16px;
    line-height: 20px;
  }

  .user-item {
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

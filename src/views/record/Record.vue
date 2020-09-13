<template>
  <div id="record">
    <nav-bar class="record-nav-bar">
      <div slot="item-center">兑换记录</div>
    </nav-bar>

    <div class="content">
      <div class="search">
        <input v-model="search" type="text" placeholder="请输入搜索的内容">
        <button @click="searchRecord"><img src="~assets/img/common/search.svg"></button>

      </div>
      <record-item v-for="item in records" :record="item"/>
      <pagination :totalPage="0" :isEnd="false" v-on:loadMore="loadMore"/>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import RecordItem from "./RecordItem";
  import Pagination from "components/common/pagination/Pagination"

  import {getRecordData, searchRecord} from "network/record";

  export default {
    name: "Record",
    components: {
      NavBar,
      RecordItem,
      Pagination
    },
    data() {
      return {
        records: [],
        search: '',
        pageNum: 1
      }
    },
    // created() {
    //   this.getRecordData()
    // },
    activated() {
      if (this.search === '')
        this.getRecordData(this.pageNum)
      else
        this.searchRecord(this.pageNum)
    },
    methods: {
      searchRecord(page) {
        searchRecord(this.search, page).then(res => {
          console.log(res);
          this.records.push(...res.data)
          this.pageNum++
        })

      },
      getRecordData(page) {
        getRecordData('all', page).then(res => {
          console.log(res);
          this.records.push(...res.data.list)
          this.pageNum++
        })
      },
      loadMore() {
        if (this.search === '')
          this.getRecordData(this.pageNum)
        else
          this.searchRecord(this.pageNum)
      }

    }
  }
</script>

<style scoped>
  #record {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  .record-nav-bar {
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
    width: 100%;
    margin-top: 45px;
    padding: 10px;
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


</style>

<template>
  <div id="admin-record">
    <div class="search">
      <input v-model="search" type="text" placeholder="请输入搜索的内容">
      <button @click="searchRecord(1)"><img src="~assets/img/common/search.svg"></button>
    </div>
    <record-item v-for="item in records" :record="item"/>
    <pagination :totalPage="0" :isEnd="false" v-on:loadMore="loadMore"/>
  </div>
</template>

<script>
  import RecordItem from "./RecordItem";
  import Pagination from "components/common/pagination/Pagination"

  import {getRecordData, searchRecord} from "network/admin"

  export default {
    name: "Record",
    components: {
      RecordItem,
      Pagination
    },
    data() {
      return {
        search: '',
        records: [],
        pageNum: 1,
        NotIsSearch: true
      }
    },
    created() {
        this.getRecordData(this.pageNum)
    },
    methods: {
      searchRecord(page) {
        if(this.NotIsSearch){
          this.NotIsSearch = false
          this.pageNum = 1
          this.records = []
        }
        if(this.search === ''){
          this.NotIsSearch = true
          this.pageNum = 1
          this.records = []
        }
        console.log(page);
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
        if (this.search === '') {
          this.getRecordData(this.pageNum)
        } else {
          this.searchRecord(this.pageNum)
        }
      }
    }
  }
</script>

<style scoped>
  #admin-record {
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

</style>

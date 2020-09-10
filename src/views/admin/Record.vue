<template>
  <div id="admin-record">
    <div class="search">
      <input v-model="search" type="text" placeholder="请输入搜索的内容">
      <button @click="searchRecord(1)"><img src="~assets/img/common/search.svg"></button>
    </div>
    <record-item v-for="item in records" :record="item"/>
  </div>
</template>

<script>
  import RecordItem from "./RecordItem";

  import {getRecordData, searchRecord} from "network/admin"

  export default {
    name: "Record",
    components: {
      RecordItem
    },
    data() {
      return {
        search: '',
        records: [],
      }
    },
    activated() {
      if (this.search === '')
        this.getRecordData(1)
      else
        this.searchRecord(1)
    },
    methods: {
      searchRecord(page) {
        searchRecord(this.search, page).then(res => {
          console.log(res);
          this.records = res.data
        })

      },
      getRecordData(page) {
        getRecordData('all', page).then(res => {
          console.log(res);
          this.records = res.data.list
        })
      },
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

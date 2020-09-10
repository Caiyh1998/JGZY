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
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import RecordItem from "./RecordItem";

  import {getRecordData,searchRecord} from "network/record";

  export default {
    name: "Record",
    components: {
      NavBar,
      RecordItem
    },
    data() {
      return {
        records: [],
        search: '',
      }
    },
    // created() {
    //   this.getRecordData()
    // },
    activated() {
      if(this.search === '')
        this.getRecordData()
      else
        this.searchRecord()
    },
    methods: {
      searchRecord() {
        searchRecord(this.search, 1).then(res => {
          console.log(res);
          this.records = res.data
        })

      },
      getRecordData() {
        getRecordData('all', 1).then(res => {
          console.log(res);
          this.records = res.data.list
        })
      },
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

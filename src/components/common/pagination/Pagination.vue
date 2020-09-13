<template>
  <div class="pagination">
    <div class="pagination-list">
      <div class="pagination-item" v-for="item in totalPage" v-if="totalPage<=10 && totalPage>0">
        {{item}}
      </div>

      <div class="pagination-item" v-if="!isEnd && (totalPage===0 || totalPage>10)" @click="loadMore">
        加载更多
      </div>
      <div class="pagination-item" v-else-if="isEnd && (totalPage===0 || totalPage>10)" @click="loadMore">
        滑到底了！！
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: {
      totalPage: {
        type: Number,
        default() {
          return 12
        }
      },
      isEnd: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    methods: {
      loadMore() {
        this.$emit('loadMore')
      },
    }
  }
</script>

<style scoped>
  .pagination{
    width: 100%;
    height: 20px;
    text-align: center;
    align-content: center;
    margin-bottom: 49px;
  }

  .pagination-list{
    border: 1px solid #000000;
    border-radius: 5px;
    margin: 0 auto;
    width: 90%;
    height: 20px;
    display: flex;
  }
  .pagination-item{
    border: 1px solid #000000;
    border-radius: 5px;
    font-size: 16px;
    line-height: 16px;
    flex: 1;
  }

</style>

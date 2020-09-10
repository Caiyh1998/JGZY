<template>
  <div class="tab-content">
<!--    <div class="type-title" name="1">赛事报名</div>-->
<!--    <store-list-item v-for="(item, index) in categoryDetail['其他']" :key="'type1'+index" :goods="item"></store-list-item>-->
    <div class="type-title" name="2">凤栖梧饮品</div>
    <store-list-item v-for="(item, index) in categoryDetail['饮品']" :key="'type2'+index" :goods="item"></store-list-item>
    <div class="type-title" name="3">其他</div>
    <store-list-item v-for="(item, index) in categoryDetail['其他']" :key="'type3'+index" :goods="item"></store-list-item>
  </div>
</template>

<script>
  import StoreListItem from 'views/store/StoreListItem'

  export default {
    name: "TabContent",
    components: {
      StoreListItem
    },
    props: {
      categoryDetail: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .tab-content {
  }

  .type-title {
    background-color: #C0C0C0;
    line-height: 30px;
    font-size: 20px;
    padding-left: 20px;
  }
</style>

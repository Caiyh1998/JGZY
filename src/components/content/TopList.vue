<template>
  <div class="top-list">
    <div class="top-list-title">
      <slot name="top-list-title"></slot>
    </div>
    <div class="top-list-view">
      <div v-for="(item,index) in top3" class="top-list-item"
           :class="{'top1': index === 0, 'top2': index === 1, 'top3': index === 2,}">
        <a :href="item.link">
          <img :src="item.UserImage" alt="">
          <p>{{item.Username}}</p>
          <p>{{item.Integral}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TopList",
    props: {
      top3: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .top-list {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #EEEEEE;
  }

  .top-list-title {
    padding-top: 10px;
    padding-bottom: 8px;
  }
  .top-list-view {
    width: 100%;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between
  }

  .top-list-item {
    font-size: 12px;
  }

  .top-list-item img {
    padding: 0;
    margin: 10px 0;
    width: 65px;
    height: 65px;
    border-radius:50%;

    /*border: 5px solid #ff5777;*/
  }

  .top1 {
    flex: 0.8;
    order: 2
  }

  .top2 {
    flex: 1;
    order: 1
  }

  .top3 {
    flex: 1;
    order: 3
  }

  .top1 img{
    border: 5px solid #FFD700;
  }

  .top2 img{
    border: 5px solid #C0C0C0;
  }

  .top3 img{
    border: 5px solid #D98719;
  }

</style>

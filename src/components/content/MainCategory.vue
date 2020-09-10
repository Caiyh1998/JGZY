<template>
  <div class="main-category">
    <div class="main-category-title">
      <slot name="main-category-title"></slot>
    </div>
    <div class="main-category-view">
      <slot name="main-category-view">
        <div v-for="item in category" class="main-category-item">
          <a :href="item.link">
            <img :src="item.image" alt="">
            <p>{{item.title}}</p>
          </a>
        </div>
        <div v-for="item in category" class="main-category-item">
          <a :href="item.link">
            <img :src="item.image" alt="">
            <p>{{item.title}}</p>
          </a>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Category",
    props: {
      category: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .main-category {
    text-align: center;
    padding-bottom: 10px;
  }

  .main-category-title {
    padding-top: 10px;
    padding-bottom: 8px;
  }

  .main-category-view {
    width: 100%;
    text-align: center;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between
  }

  .main-category-item {
    flex: 0 0 25%;
    font-size: 12px;
  }

  .main-category-item img {
    padding: 0;
    margin: 5px 0;
    width: 65px;
    height: 65px;
  }

</style>

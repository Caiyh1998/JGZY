<template>
  <tab-bar>
    <tab-bar-item link="/game" activeColor="#1296db">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">全部比赛</div>
    </tab-bar-item>
    <tab-bar-item link="/mygame">
      <img slot="item-icon" src="~assets/img/tabbar/store.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/store_active.svg" alt="">
      <div slot="item-text">我的比赛</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";

  export default {
    name: "GameTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>

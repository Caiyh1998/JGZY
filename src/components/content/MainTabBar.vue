<template>
  <tab-bar>
    <tab-bar-item link="/home" activeColor="#1296db">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" onclick="return false">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="" onclick="return false">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item link="/store">
      <img slot="item-icon" src="~assets/img/tabbar/store.svg" alt="" onclick="return false">
      <img slot="item-icon-active" src="~assets/img/tabbar/store_active.svg" alt="" onclick="return false">
      <div slot="item-text">积分商城</div>
    </tab-bar-item>
    <tab-bar-item link="/record">
      <img slot="item-icon" src="~assets/img/tabbar/record.svg" alt="" onclick="return false">
      <img slot="item-icon-active" src="~assets/img/tabbar/record_active.svg" alt="" onclick="return false">
      <div slot="item-text">订单记录</div>
    </tab-bar-item>
    <tab-bar-item link="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" onclick="return false">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="" onclick="return false">
      <div slot="item-text">个人中心</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>

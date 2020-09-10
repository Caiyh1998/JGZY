<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
    <icon/>
    <svg-icon/>
  </div>
</template>

<script>
  import MainTabBar from "components/content/MainTabBar";
  import Icon from "components/content/Icon/Icon";
  import SvgIcon from "components/content/Icon/Svg";

  export default {
    name: "App",
    components: {
      MainTabBar,
      Icon,
      SvgIcon
    }
  }
</script>

<style>
  @import "assets/css/base.css";

  #app {
    position: relative;
  }

</style>

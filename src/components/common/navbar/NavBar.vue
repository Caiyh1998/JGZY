<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="item-left"></slot>
    </div>
    <div class="center">
      <slot name="item-center"></slot>
    </div>
    <div class="right">
      <slot name="item-right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;

    /*box-shadow: 0 1px 1px rgba(100, 100, 100, .2);*/
  }

  .left,
  .right {
    line-height: 40px;
    width: 60px;
    align-content: center;
  }
  .left img{
    height: 40px;
    width: 40px;
  }

  .center {
    flex: 1;
  }
</style>

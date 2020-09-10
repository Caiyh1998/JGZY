<template>
  <div class="dialog">
    <div class="dialog_mask"></div>
    <div class="dialog_container">
      <div class="dialog_content">
        <div class="dialog_content_top">
          <slot name="dialog_content"></slot>
        </div>
        <div class="dialog_btn">
          <slot name="dialog_btn"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dialog",
    methods: {

    }
  }
</script>

<style scoped>
  .dialog {
    height: 0;
    position: relative;
    top: 40%;
    z-index: 8;
  }

  .dialog_mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .dialog_container {

    background: #ffffff;
    width: 80vw;
    height: 30vh;
    position: relative;
    border-radius: 10px;
    margin: 0 auto;
  }

  .dialog_content {
    text-align: center;
    height: 100%;
    padding: 10% 0;
    position: relative;
  }

  .dialog_content_top {
    margin: 15% auto;
    font-size: 20px;
    color: #333333;
  }

  .dialog_btn {
    position: absolute;
    bottom: 20%;
    width: 100%;
    margin-top: 10%;
    display: flex;
  }

  .dialog_btn button {
    background-color: #1298DB;
    padding: 5px;
    font-size: 18px;
    color: #f2f2f2;
    margin: 5%;
    flex: 1;
    border-radius: 5px;
    border: 1px solid #1298DB;
  }


</style>

<template>
  <div id="admin">
    <div class="menu">
      <table class="menu-table">
        <tr>
          <td>
            <div class="menu-item" @click="routerPush('/admin/user')">用户管理</div>
          </td>
          <td>
            <div class="menu-item" @click="routerPush('/admin/record')">订单管理</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="menu-item" @click="routerPush('/admin/game')">赛事管理</div>
          </td>
          <td>
            <div class="menu-item" @click="routerPush()">未完待续</div>
          </td>
        </tr>

      </table>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Admin",
    methods: {
      routerPush(url) {
        this.$router.push(url)
      }
    }
  }
</script>

<style scoped>
  #admin {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: #ffffff;

    overflow: scroll;
  }

  .menu {
    margin-top: 30%;
    width: 100%;
  }

  .menu-table {
    margin: 0 auto;
    width: 100%;
  }

  .menu-table tr {
    width: 100%;
    height: 50vw;
  }

  .menu-table, tr td {
    height: 50vw;
    width: 100vw;
  }

  .menu-item {
    background-color: #1298DB;

    border-radius: 10px;
    margin: 5px;
    line-height: 200px;
    text-align: center;
    color: #f2f2f2;
  }

</style>

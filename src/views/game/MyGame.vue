<template>
    <div id="game">
      <nav-bar class="game-nav-bar"><div slot="item-center">坚果赛事</div></nav-bar>

      <game-tab-bar class="game-tab-bar"/>

    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import GameTabBar from "components/content/GameTabBar";

    export default {
        name: "Game",
      components: {
        NavBar,
        GameTabBar
      }
    }
</script>

<style scoped>
  #game {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    height: 100vh;
    overflow: hidden;
    z-index: 9;
  }

  .game-nav-bar {
    background-color: var(--color-tint);
    color: #000000;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .2);

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .game-tab-bar {

    z-index: 9;
  }

</style>

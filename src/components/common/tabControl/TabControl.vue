<template>
  <div class="tab-control">
    <div v-for="(title, index) in titles"
         class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index)
      },
    }
  }
</script>

<style scoped>
  .tab-control {
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item.active span {
    padding: 3px;
    border-bottom: 2px solid var(--color-high-text);
  }

  .active {
    color: var(--color-high-text);
  }

</style>

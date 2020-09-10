<template>
<!--  <scroll id="tab-menu">-->
    <div class="menu-list">
      <div class="menu-list-item"
           :class="{active: active===item}"
           v-for="(item, index) in categories"
           :key="index"
           @click="itemClick(index,item)">
        {{item}}
      </div>
    </div>
<!--  </scroll>-->
</template>

<script>
  // import Scroll from 'common/scroll/Scroll'

	export default {
		name: "TabMenu",
    components: {
		  // Scroll
    },
    props: {
		  categories: {
		    type: Array,
        default() {
          return ['饮品','其他']
        }
      },
      active: {
		    type: String,
        default() {
          return '饮品'
        }
      }
    },
    data() {
		  return {
		    isActive: '饮品'
      }
    },
    methods: {
		  itemClick(index,item) {
        // this.isActive = this.categories[index]
        this.$bus.$emit('selectItem', index,item)
      },
    }
	}
</script>

<style scoped>
  .menu-list {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
    float: left;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>

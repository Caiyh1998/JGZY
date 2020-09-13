<template>
  <div id="home">

    <nav-bar class="home-nav-bar">
      <div slot="item-center">坚果桌游</div>
    </nav-bar>
    <tab-control v-show="isTabFixed" class="home-tab-control fixed" @tabClick="tabClick"
                 :titles="['剧本杀','飞行棋','卡牌类']" ref="tabControl1"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <div>
        <main-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" ref="hSwiper"/>
        <top-list :top3="top3">
          <div slot="top-list-title">Top榜</div>
        </top-list>
        <div class="category-view" @click="goGame">
          <img class="category-img" src="http://localhost:7001/public/JGZY_DATA/HOME_IMG/GameSignUp.jpeg">
        </div>
        <!--        <div slot="main-category-view" @click="goGame">坚果赛事，报名入口</div>-->
        <tab-control class="home-tab-control"
                     :titles="['剧本杀','飞行棋','卡牌类']"
                     @tabClick="tabClick"
                     ref="tabControl2"/>
        <goods-list :goodsList="showGoods"/>
        <!--        <prevent-blocking/>-->
      </div>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import MainSwiper from "components/content/MainSwiper";
  import TopList from "components/content/TopList";
  import MainCategory from "components/content/MainCategory";
  import TabControl from "components/common/tabControl/TabControl";
  import GoodsList from "components/common/goodslist/GoodsList";
  import Scroll from "components/common/bscroll/Scroll";
  import BackTop from "components/common/backtop/BackTop";
  import PreventBlocking from "components/common/preventblocking/PreventBlocking"

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils"


  export default {
    name: "Home",
    components: {
      NavBar,
      MainSwiper,
      TopList,
      MainCategory,
      TabControl,
      GoodsList,
      PreventBlocking,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        top3: [],
        // recommends: [],
        goods: {
          '饮品': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        goodsListPosition: {
          '饮品': -520,
          'new': -520,
          'sell': -520
        },
        currentType: '饮品',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('饮品')
      // this.getHomeGoods('new')
      // this.getHomeGoods('sell')
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    activated() {
      this.$refs.hSwiper.startTimer()
    },
    deactivated() {
      this.$refs.hSwiper.stopTimer()
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      goGame() {
        this.$router.push('/game')
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = '饮品';
            break
          case 1:
            this.currentType = 'new';
            break
          case 2:
            this.currentType = 'sell';
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index

        this.$refs.scroll.scrollTo(0, this.goodsListPosition[this.currentType], -1)
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000

        this.isTabFixed = (-position.y) > this.tabOffsetTop - 46

        if (-position.y > 520)
          this.goodsListPosition[this.currentType] = position.y
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.$refs.tabControl.$el.offsetTop);
      },

      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list;
          this.top3 = res.data.data.top3.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page++;

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;

    overflow: hidden;
  }

  .home-nav-bar {
    background-color: var(--color-tint);
    color: #000000;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .2);

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .category-view {
    padding: 0;
    border-top: 2px solid #333333;
    border-bottom: 2px solid #333333;
  }

  .category-img {
    width: 100%;
  }

  .home-tab-control {
    background-color: #ffffff;
    /*position: sticky;*/
    /*top: 44px;*/
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 45px;
    z-index: 9;
  }

  .content {
    height: calc(100% - 95px);
    overflow: hidden;
    margin-top: 45px;
  }

</style>

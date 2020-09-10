<template>
    <tab-bar>
        <tab-bar-item link="/home" activeColor="#1296db">
            <img slot="item-icon" src="../assets/img/tabbar/home.svg" alt="">
            <img slot="item-icon-active" src="../assets/img/tabbar/home_active.svg" alt="">
            <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item link="/shopcart">
            <img slot="item-icon" src="../assets/img/tabbar/shopcart.svg" alt="">
            <img slot="item-icon-active" src="../assets/img/tabbar/shopcart_active.svg" alt="">
            <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item link="/record">
            <img slot="item-icon" src="../assets/img/tabbar/record.svg" alt="">
            <img slot="item-icon-active" src="../assets/img/tabbar/record_active.svg" alt="">
            <div slot="item-text">订单</div>
        </tab-bar-item>
        <tab-bar-item link="/profile">
            <img slot="item-icon" src="../assets/img/tabbar/profile.svg" alt="">
            <img slot="item-icon-active" src="../assets/img/tabbar/profile_active.svg" alt="">
            <div slot="item-text">我的</div>
        </tab-bar-item>
    </tab-bar>
</template>

<script>
    import TabBar from "./tabbar/TabBar";
    import TabBarItem from "./tabbar/TabBarItem";

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
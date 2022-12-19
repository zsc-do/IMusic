<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    
    <van-tabbar v-model="active">
    <van-tabbar-item replace to="/index" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    data() {
    return {
      active: 0,
    };
  },
}
</script>

<style>

</style>
<template>
    <div>
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
          <van-cell v-for="(item,index) in songList" :key="index" 
          :title="item.name" :value="(item.artists)[0].name"
          @click="toPlayPage(item.id)"/>
      </van-list>
    </div>
  </template>
  
  <script>
  export default {
      data() {
      return {
        value: '',
        songList: [],
        loading: false,
        finished: false,
        limit:20,
        offset:0,
        curPage:1,
      };
    },
    methods:{
      searchSongs(){
          console.log(this)
  
          this.$http.apiGet("/search?keywords=" 
          + this.value + '&limit=' + this.limit +'&offset=' + this.offset)
          .then((res)=>{
              console.log(res)
              this.songList = res.result.songs;
              
              this.loading = false;
          })
      },
      toPlayPage(id){
          this.$router.push('/play?songId='+ id)
      },
  
      onLoad() {
  
        if(this.songList.length === 0){
          return;
        }
  
        // 异步更新数据
        this.curPage ++;
        this.offset = ( this.curPage -1) * this.limit;
        
        this.$http.apiGet("/search?keywords=" 
          + this.value + '&limit=' + this.limit +'&offset=' + this.offset)
          .then((res)=>{
              console.log(res)
              res.result.songs.forEach(item => { this.songList.push(item) })
  
              this.loading = false;
          })
      },
    },

    mounted() {
        this.value = this.$route.query.id
        this.searchSongs()
    },
  }
  </script>
  
  <style>
  
  </style>
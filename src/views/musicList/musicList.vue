<template>
  <div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell v-for="(item,index) in songList" :key="index" 
        :title="item.name"
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

        this.$http.apiGet("/playlist/track/all?id=" 
        + this.value + '&limit=' + this.limit +'&offset=' + this.offset)
        .then((res)=>{
            console.log(res.songs)

            let songList = []
            let tempList = res.songs;

            for (let i = 0; i < tempList.length; i++) {
                let songObj = {}
                songObj.id = tempList[i].id
                songObj.name = tempList[i].name

                songList.push(songObj)
            }
            this.songList = songList;


        })
    },
    toPlayPage(id){
        this.$router.push('/play?songId='+ id)
    },

    onLoad() {

      if( this.finished === true){
        return;
      }

      // 异步更新数据
      this.curPage ++;
      this.offset = ( this.curPage -1) * this.limit;
      
      this.$http.apiGet("/playlist/track/all?id=" 
        + this.value + '&limit=' + this.limit +'&offset=' + this.offset)
        .then((res)=>{

          
          if(res.songs.length === 0){
            this.finished = true
            return;
          }

          let tempList = res.songs;


          for (let i = 0; i < tempList.length; i++) {
              let songObj = {}
              songObj.id = tempList[i].id
              songObj.name = tempList[i].name

              this.songList.push(songObj)
          }

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
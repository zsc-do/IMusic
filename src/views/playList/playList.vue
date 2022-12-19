<template>
  <div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        >
        <van-cell v-for="(item,index) in playList" :key="index" 
        :title="item.name"
        @click="toMusicList(item.id)"/>
    </van-list>
  </div>
</template>

<script>
export default {

    data() {
        return {
        cat: '',
        playList: [],
        loading: true,
        finished: true,
        
        }
    },

    methods:{
        searchPlayList(){

            this.$http.apiGet("/top/playlist/highquality?cat=" 
            + this.cat + '&limit=20')
            .then((res)=>{

                let playList = []
                let tempList = res.playlists;

                for (let i = 0; i < tempList.length; i++) {
                    let playObj = {}
                    playObj.id = tempList[i].id
                    playObj.name = tempList[i].name

                    playList.push(playObj)
                }
                this.playList = playList;
            })
        },

        toMusicList(id){
            this.$router.push('/musicList?id='+ id)
        },
    },

    mounted() {
        this.cat = this.$route.query.cat
        this.searchPlayList()
    },
}
</script>

<style>

</style>
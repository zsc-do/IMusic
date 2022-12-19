<template>
  <div>
    <h3>播放页面</h3>
    <audio :src="musicUrl" id="aud" autoplay="autoplay" controls="controls" preload="auto"></audio>
    

    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="service-o">
        {{curLyric}}
    </van-notice-bar>
    <!-- <button @click="shij">测试</button> -->

    <comment :songId="songId"/>

</div>


</template>

<script>

import comment from '../comment/comment.vue'

export default {
    components: {
        comment
    },
    data(){
        return {
            songId:'',
            musicUrl:'',
            lyricManager:'',
            curLyric:'',
            timer:null
        }
    },

    mounted(){
        let songId = this.$route.query.songId
        this.songId = songId;
        this.$http.apiPost("/song/url?id=" + songId)
        .then((res)=>{
            //console.log((res.data)[0].url)
            this.musicUrl = (res.data)[0].url;
            
            this.getLyric(songId)

           
            this.timer = setInterval(() =>{
                let audio = document.getElementById('aud')
                let curTime = audio.currentTime


                let lastLyric = '';

                for(let key in this.lyricManager){
                    
                    if(this.lyricManager.hasOwnProperty){

                        // if(this.curLyric === ''){
                        //     this.curLyric = this.lyricManager[key];
                        //     break;
                        // }
                        

                        if(curTime < Number(key)){
                            this.curLyric = lastLyric;
                            break;
                        }

                        lastLyric = this.lyricManager[key];
                    }
                }

                

            },600)
        })

        
    },
    methods:{
        getLyric(songId){
            this.$http.apiPost("/lyric?id=" + songId)
            .then((res)=>{

                this.parselyric(res.lrc.lyric); // 解析获取到的歌词

                console.log(this.lyricManager)
            })
        },

        parselyric(lrc){    //传入歌词，解析参数   lrc


            var lyrics = lrc.split("\n");　　//去除空格

            var lrcobj = {};

            for(var i=0;i < lyrics.length;i++){


                
                var lyric = lyrics[i];

                if(lyric === ''){
                    continue;
                }

                var timereg = /\d+:\d+\.\d+/g;

               // console.log(lyric)
                var timeregexparr = lyric.match(timereg)[0];


                

                var clause = lyric.replace('[' + timeregexparr + ']','');

                let min = Number(timeregexparr.split(':')[0]);
                let sec = Number(timeregexparr.split(':')[1]);

                let time = min * 60 + sec;

                lrcobj[time] = clause;
                
            }

           // console.log(lrcobj)
            this.lyricManager =  lrcobj;
        },

        shij(){
            let audio = document.getElementById('aud')
            console.log(audio.currentTime)
        }

    },
    beforeDestroy() {
        console.log('销毁了')
        clearInterval(this.timer)
        this.timer = null;
    },


}
</script>

<style>

</style>
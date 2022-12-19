<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img :src="image" />
         </van-swipe-item>
    </van-swipe>

    <van-divider :style="{ color: 'black', borderColor: 'black', padding: '0 16px' }">歌单分类</van-divider>

    <van-grid>
        <van-grid-item v-for="(cat,index) in catagorys" :key="index" :text="cat"
        v-show="index > 11? isHide : true" 
        @click="toPlaylist(cat)" />

        
    </van-grid>


    <van-row>
        <van-col span="11"></van-col>
        <van-col span="6">
            <van-icon @click="changCatHide()" name="arrow-down" >加载更多</van-icon>
        </van-col>
    </van-row>


    <van-divider :style="{ color: 'black', borderColor: 'black', padding: '0 16px' }">推荐歌手</van-divider>


    
    <van-row>
        <van-col span="24">
            <van-field
            readonly
            clickable
            label="歌手类型"
            :value="singerType"
            placeholder="选择歌手类型"
            @click="showPicker = true"
            />
            <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                show-toolbar
                :columns="singerTypes"
                @cancel="showPicker = false"
                @confirm="changeSingerType"
            />
            </van-popup>
        </van-col>
        
    </van-row>

    <van-row>
        <van-col span="1"></van-col>
        <van-col span="4"><van-button @click="loadMoreSinger()" icon="replay" block  round  type="primary" /></van-col>
    </van-row>

    
    <van-grid>
        <van-grid-item v-for="(singer,index) in singers" :key="index" :text="singer.name" 
        @click="toMusicList(singer.id)" />
    </van-grid>

  </div>
</template>

<script>
export default {

    data() {
        return {
            images: [],
            catagorys:[],
            singers:[],
            limit:20,
            offset:0,
            curPage:1,

            singerType: '',
            showPicker: false,
            singerTypes: ['全部', '华语', '欧美', '日本','韩国','其他'],

            isHide:false
        }
    },

    methods: {
        getBanner(){
            this.$http.apiGet("/banner?type=1")
            .then((res)=>{
                console.log(res)
                

                for (let i = 0; i < res.banners.length; i++) {
                    this.images.push((res.banners)[i].pic)
                    
                }
            })
        },

        getCatagory(){
            this.$http.apiGet("/playlist/catlist")
            .then((res)=>{
                console.log(res)
                

                for (let i = 0; i < res.sub.length; i++) {
                    this.catagorys.push((res.sub)[i].name)
                    
                }
            })
        },

        getSinger(){
            this.$http.apiGet("/artist/list?limit=" +this.limit +'&offset=' + this.offset)
            .then((res)=>{
                console.log(res)
                

                for (let i = 0; i < res.artists.length; i++) {
                    let singer = {}
                    singer.id = (res.artists)[i].id
                    singer.name = (res.artists)[i].name
                    this.singers.push(singer)
                    
                }

                
            })
        },

        toPlaylist(cat){
            this.$router.push('/playList?cat='+ cat)
        },

        toMusicList(id){
            this.$router.push('/singerSong?id='+ id)
        },

        loadMoreSinger(){

            this.curPage ++;
            this.offset = ( this.curPage -1) * this.limit;

            let area = -1;
            if(this.singerType === '全部') area = -1
            else if(this.singerType === '华语') area = 7
            else if(this.singerType === '欧美') area = 96
            else if(this.singerType === '日本') area = 8
            else if(this.singerType === '韩国') area = 16
            else if(this.singerType === '其他') area = 0

            this.$http.apiGet("/artist/list?limit=" +
            this.limit +'&offset=' + this.offset + '&area=' + area) 
            .then((res)=>{
                console.log(res)
                
                this.singers = [];
                for (let i = 0; i < res.artists.length; i++) {
                    let singer = {}
                    singer.id = (res.artists)[i].id
                    singer.name = (res.artists)[i].name
                    this.singers.push(singer)
                    
                }
            })
        },

        changeSingerType(value) {
            this.singerType = value;
            this.showPicker = false;
        },

        changCatHide(){
            this.isHide = !this.isHide;
        }
    },

    mounted(){
        this.getBanner();
        this.getCatagory();
        this.getSinger()
    }
}
</script>

<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    height:200px;
    text-align: center;
    background-color: #39a9ed;
  }

  .my-swipe .van-swipe-item img{
    height:200px;
    width:100%;
  }
</style>
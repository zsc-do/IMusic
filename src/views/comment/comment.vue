<template>
  <div>
    <van-button plain type="primary" is-link @click="showPopup">查看评论</van-button>
    <van-popup v-model="show" closeable position="bottom" :style="{ height: '60%' }">
    
        <div>
            <van-cell-group
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                >
                <van-cell v-for="(item,index) in comments" :key="index" 
                 :title="item.nickname" :value="item.content" :icon="item.avatarUrl" >
                    
                 </van-cell>
            </van-cell-group>
        </div>
    </van-popup>

  </div>
</template>

<script>
export default {
    data() {
        return {
        show: false,
        comments:[],
        loading: false,
        finished: false,
        };
    },

    props: ['songId'],

    methods: {
        showPopup() {
            this.show = true;


            this.$http.apiPost("/comment/music?id=" + this.songId)
            .then((res)=>{
                let comments = res.comments;

                let finalComments = [];

                for (let i = 0; i < comments.length; i++) {

                    let comObj = {}
                    let com = comments[i];

                    comObj.content = com.content;
                    comObj.nickname = com.user.nickname;
                    comObj.avatarUrl = com.user.avatarUrl;

                    finalComments.push(comObj)
                
                }

                this.comments = finalComments;
            })
        },

        
    },
    
   
}
</script>

<style>

</style>
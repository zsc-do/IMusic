import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../layout/layout.vue'
import index from '../views/index/index.vue'
import search from '../views/search/search.vue'
import play from '../views/play/play.vue'
import musicList from '../views/musicList/musicList.vue'
import comment from '../views/comment/comment.vue'
import playList from '../views/playList/playList.vue'
import singerSong from '../views/singerSong/singerSong.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect:'/index',
    children:[
      {
        path: 'index',
        name: 'index',
        component: index
      },
      {
        path: 'search',
        name: 'search',
        component: search
      }
    ]
  },
  {
    path: '/play',
    name: 'play',
    component: play,
    children:[
      {
        path: 'comment',
        name: 'comment',
        component: comment
      }
    ]
  },
  {
    path: '/playList',
    name: 'playList',
    component: playList
  },
  {
    path: '/musicList',
    name: 'musicList',
    component: musicList
  },
  {
    path: '/singerSong',
    name: 'singerSong',
    component: singerSong
  }
]

const router = new VueRouter({
  routes
})

export default router

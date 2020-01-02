<template>
  <div id="home">
      <nav-bar id="home-bar">
        <div slot="center">购物街</div>
      </nav-bar>
    <tab-control 
      :titles = "['流行','新款' ,'精选']" 
      @tabClick = "tabClick"
      class="tabControl"
      v-show = "isShowTabControl"
      ref="tabControl1"
      ></tab-control>
    <scroll class="scroll" 
      ref="scroll" 
      :probeType = "3"
      @scroll = "scrollContent"
      @pullingUp = "loadMore" 
      :pullUpLoad = "true"
     >
      <home-swiper :banners = "banners" @swiperImgLoad = "swiperImgLoad"></home-swiper>
      <recommend-view :recommends = "recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control 
      :titles = "['流行','新款' ,'精选']" 
      @tabClick = "tabClick"
      ref="tabControl2"
      :class="{fixed: isShowTabControl}"
      ></tab-control>
      <goods-list :goods = "goods[currentType].list">
        <goods-list-item></goods-list-item>
      </goods-list>
    </scroll>
    <back-top @click.native = "backClick" v-show="isShowBackTop"/>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import GoodsListItem from 'components/content/goods/GoodsListItem'
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/common/backTop/BackTop'

import HomeSwiper from './childComp/HomeSwiper'
import RecommendView from './childComp/RecommendView'
import FeatureView  from './childComp/FeatureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin}  from 'common/mixin'


export default {
  name:'Home',
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0 ,list:[]},
        'new':{page:0 ,list:[]},
        'sell':{page:0 ,list:[]},
      },
      currentType : 'pop',
      // isShowBackTop : false,
      tabOffsetTop : 0,
      isShowTabControl : false,
      saveY : 0,
      // itemImgListener:null
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  components: {
    NavBar,
    TabControl,
    GoodsList,
    GoodsListItem,
    Scroll,
    // BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView
  },
  created(){
    //获取轮播图及推荐数据
    this.getHomeMultidata()

    //获取商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  
  destroyed(){
    console.log ('home destroy')
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    //1.获取Y值
    this.saveY =  this.$refs.scroll.getScrollY()
    // console.log(this.saveY)

    //2.取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  // mounted(){
  //   //监听图片加载完成
  //   const refresh = debounce(this.$refs.scroll.refresh,50)

  //   //对监听的事件进行保存
  //   this.itemImgListener = () =>{
  //     // this.$refs.scroll.refresh()
  //     refresh()
  //   }
  //   this.$bus.$on('itemImgLoad',this.itemImgListener)

  //   //获取tabControl的offsetTop的值，但不准确，要先获取轮播图的高度
  //   // console.log(this.$refs.tabControl.$el.offsetTop)  
  // },
  methods:{
    //事件监听的方法
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    // backClick(){
    //   this.$refs.scroll.scrollTo(0,0)
    // },

    scrollContent(position){
      //回到顶部的显示与隐藏
      // this.isShowBackTop = -(position.y) > 1000
      this.showBackTop(position)

      //tabControl是否吸顶
      this.isShowTabControl = -(position.y) > this.tabOffsetTop
    },

    // showBackTop(position){
    //   this.isShowBackTop = -(position.y) > 1000
    // },

    loadMore(){
      this.getHomeGoods(this.currentType)
      // console.log('上拉加载更多');
    },

    swiperImgLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop)
    },

    


    //网络请求的方法
    //获取轮播图及推荐数据
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },

    //获取商品数据
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)  //把res.data.list 塞进'pop':{page:0 ,list:[]},
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }

}
</script>

<style scoped >
  #home{
    height: 100vh;
    /* padding-top: 44px; */
  }
  #home-bar{
    background-color: var(--color-tint);
    color: #fff;
    /* position: relative; */
    /* position: fixed;
    top:0px;
    left: 0;
    right: 0; */
    z-index: 3;
  }
  .scroll{
    /* height: calc(100% - 44px - 49px);  */

    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
  .tabControl{
    position:relative; 
    z-index: 10;
    background-color: #fff; 
  
  }
  /* .fixed{
    position:fixed;
    left: 0px;
    right: 0px;
    top: 44px;
  } */
</style>

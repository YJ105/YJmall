import {debounce} from './utils'
import BackTop from 'components/common/backTop/BackTop'
import TabControl from 'components/content/tabcontrol/TabControl'

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener: null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('我是混入中的内容')
  }
}

export const backTopMixin = {
  components:{
    BackTop,
  },
  data(){
    return {
      isShowBackTop : false,
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }, 
    showBackTop(position) {
      this.isShowBackTop = -(position.y) > 1000
    },
  },
}

export const tabControlMixin = {
  components:{
    TabControl
  },
  data(){
    return {
      currentType:'pop'
    }
  },
  methods:{
    tabClick(index) {
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
      // this.$refs.tabControl1.currentIndex = index
      // this.$refs.tabControl2.currentIndex = index
      // console.log(this.currentType);
    }
  }
}
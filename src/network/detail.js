import {request} from './request'

export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

//轮播图下的商品信息
//iemInfo------desc  title   price    oldPrice===lowPrice     discountDesc   discountBgColor
//columns
//shopInfo  ----- services

export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.bgColor = itemInfo.discountBgColor
    this.discountDesc = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}


//店铺信息
//shopInfo-----shopLogo   name   score   cGoods   cSells

export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.score = shopInfo.score
    this.sells = shopInfo.cSells
    this.goodCount = shopInfo.cGoods
  }
}


//商品参数信息
//itemParams------info   rule
export class GoodsParams{
  constructor(info,rule){
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.image ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}




<template>
  <div class="shoplist_container">
    <ul v-if="shopListArr.length" type="1">
      <router-link :to="{path:'shop',query:{geohash,id:item.id}}" v-for="item in shopListArr" :key="item.id" tag="li" class="shop_li">
        <div>
          <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz%2Flxs3soT0HynSCeKaJ1tGVgV2iblWtEP569VwMlysQSibag3ZZyM24mD42tdlRyw5MKlOQRsaQdYDHzRGfsSjCgxA%2F0%3Fwx_fmt%3Djpeg&refer=http%3A%2F%2Fmmbiz.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618644836&t=c4756f5834d814e5eaf251e2c44daf0b" class="shop_img" alt="">
        </div>
        <div class="shop_right"> 
          <header class="shop_detail_header">
            <h4 :class="item.is_premium?'premium':''" class="shop_title ellipsis">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
            </ul>
          </header>
          <h5 class="rating_order_num">
            <div class="rating_order_num_left">
              <div class="rating_div">
                <rating-star :rating="item.rating"></rating-star>
                <span class="rating_num">{{item.rating}}</span>
              </div>
              <div class="order_num">
                月售{{item.recent_order_num}}单
              </div>
            </div>
            <div class="rating_order_num_right">
              <span :style="'background-color:#'+item.delivery_mode.color" class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
              <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
            </div>
          </h5>
          <h5 class="express_infor">
            <p class="fee">
              ${{item.float_minimum_order_amount}}起送
              <span class="segmentation">/</span>
              {{item.piecewise_agent_fee.tips}}
            </p>
            <p class="distance_time">
              <span v-if="Number(item.distance)">{{item.distance>1000 ? (item.distance/1000).toFixed(2) + 'km' : item.distance + 'm'}}
                <span>/</span>
              </span>
              <span v-else>{{item.distance}}</span>
              <span class="segmentation">/</span>
              <span class="order_time">{{item.order_lead_time}}</span>
            </p>
          </h5>
        </div>
      </router-link>
    </ul>
    <ul v-else class="animation_opacity">
      <li class="list_back_li" v-for="item in 10" :key="item">
        <img src="" alt="" class="list_back_svg">
      </li>
    </ul>
    <p v-if="touchend">没有更多了</p>
      <aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>
		<div ref="abc" style="background-color: red;"></div>
		<transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
  </div>
</template>

<script>
import ratingStar from './ratingStar'
import {shopList} from 'network/getDate'
import loading from './loading'
import {mapState} from 'vuex'
export default {
  components:{
    ratingStar,
    loading
  },
	props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
  data(){
    return{
      offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
			shopListArr:[], // 店铺列表数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: true, //显示加载动画
			touchend: false, //没有更多数据
			imgBaseUrl:"https://fuss10.elemecdn.com/",
      zhunStatus:Boolean
    }
  },  
  mounted(){
    this.initData();
  },
	computed: {
		...mapState([
			'latitude','longitude'
		])
	},
  methods:{
    async initData(){
      console.log(this.latitude);
      /* this.latitude = "21.667357"; */
      let res =  await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId)
      console.log('res',res);
      this.shopListArr =res.data;
      this.showLoading = false;
      console.log(this.shopListArr);
    },
    hideloading(){
      this.showLoading = false;
    },
    zhunshi(supports){
    let zhunStatus;
    if((supports instanceof Array) && supports.length){
      supports.forEach(item => {
        if(item.icon_name === '准'){
          zhunStatus = true;
        }
      });
    }else{
      zhunStatus = false;
    }
    console.log(zhunStatus);
    return zhunStatus
  }
  },
  watch:{
   /*  shoplist:function(){
      this.initData();
    } */
  }
  

}
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .shoplist_container{
    background-color: #fff;
    margin-bottom: 2rem;
    .shop_li{
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: .7rem .4rem;
      .shop_img{
      @include wh(3.5rem,3.5rem);
      display: block;
      margin-right: .4rem;
      }

    }
  }
  .list_back_li{
		height: 4.85rem;
		.list_back_svg{
			@include wh(100%, 100%)
		}
	}
  .shop_right{
    flex: auto;
    .shop_detail_header{
      @include fj;
      align-items: center;
      .shop_detail_ul{
        display: flex;
        align-items: center;
        .supports{
          border: 1px solid rgb(177, 177, 177);
          font-size: 1px;
          color: rgb(158, 158, 158);
        }
      }
      .shop_title{
        width: 9rem;
        color: #333;
        font-weight: 700;
      }
      .premium::before{
        content:'品牌';
        display: inline-block;
        font-size: .9rem;
        line-height: .9rem;
        color: #333;
        background-color: #ffd930;
        padding: 0 .1rem;
        border-radius: .1rem;
        margin-right:.3rem;
      }
    }
    .rating_div{
      display: flex;
      align-items: center;
      .rating_num{
        font-size: 3px;
        color: rgb(248, 64, 64);
      }
    }
    .rating_order_num{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .rating_order_num_left{
        display: flex;
        align-items: center;
        .order_num{
          transform: scale(.8);
        }
      }
      .rating_order_num_right{
        transform: scale(.7);
        margin-right: -.6rem;
        .delivery_style{
          border: .025rem solid #3190e8;
          border-radius:2px;
        }
        .delivery_left{
          color: #fff;
        }
        .delivery_right{
          color: #57A9FF;
          margin-left: .2rem;
        }
      }
    } .express_infor{
        display: flex;
        justify-content: space-between;
        .fee{
          transform: scale(.9);
        }
        .distance_time{
          transform: scale(.9);

        }
      }
  }




</style>
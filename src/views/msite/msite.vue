<template>
  <div>
    <head-top class="head-top" signUp="msite">
      <router-link to="/index" class="link_search" slot="search" >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </router-link>
      <router-link to="/index" slot="msite-title" class="msite_title ellipsis">
        <span class="title_text ">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <nav class="msite_nav"> 
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="(item,index) in foodTypes" :key="index">
        <router-link tag="li" :to="{path:'/food',query:{geohash,title:foodItem.title,restaurant_category_id:getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
          <figure>
            <img :src="imgBaseUrl + foodItem.image_url">
            <p>{{foodItem.title}}</p>
          </figure>
        </router-link>
      </swiper-slide>
      <template #pagination>
      <div class="swiper-pagination"></div>   
      </template>
    </swiper>
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg t="1616038845543" class="shop_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2149" width="128" height="128"><path d="M915.07007 224H109.07007c-24.3 0-44-19.7-44-44V77c0-24.3 19.7-44 44-44h806c24.3 0 44 19.7 44 44v103c0 24.2-19.7 44-44 44z m-786-64h766V97H129.07007v63z" fill="" p-id="2150"></path><path d="M980.07007 462.9v-44.8l-19.1 5.5-57.4-199.2H119.77007l-56.5 199-19.2-5.3V463c-13.5 0-26.1-6.2-34.5-17-8.6-11.1-11.6-25.3-8.2-39l0.2-0.9 69.7-245.6h880.3l71 246.5c3.5 13.7 0.5 27.9-8.2 39-8.2 10.7-20.8 16.9-34.3 16.9z m0-64c-6.3 0-12.2 2.9-16 7.7-3.6 4.6-4.8 10.4-3.4 16l19.4-4.9v-18.8zM44.07007 417.7l19.4 4.9c1.4-5.6 0.2-11.4-3.4-16-3.8-4.8-9.7-7.7-16-7.7v18.8z" fill="" p-id="2151"></path><path d="M152.47007 598.3c-41.1 0-79.6-16.1-108.5-45.3C15.57007 524.3 0.07007 486.3 0.57007 446.1c0-4.2-0.1-8.3-0.2-13-0.1-4.5-0.3-9.7-0.3-15.5 0-17.7 14.3-32 32-32s32 14.3 32 32c0 4.9 0.1 9.4 0.3 13.7 0.1 5 0.3 10.1 0.2 15.6-0.3 23 8.6 44.8 25 61.3 16.8 17 39.1 26.3 63 26.3 48.5 0 87.9-39.4 87.9-87.9 0-17.7 14.3-32 32-32s32 14.3 32 32c-0.1 83.6-68.3 151.7-152 151.7z" fill="" p-id="2152"></path><path d="M392.37007 598.3c-41.1 0-79.6-16.1-108.5-45.3-28.5-28.8-43.9-66.8-43.4-107 0.2-17.7 14.7-31.8 32.3-31.6 17.7 0.2 31.8 14.7 31.6 32.3-0.3 23 8.6 44.8 25 61.3 16.8 17 39.1 26.3 63 26.3 48.5 0 87.9-39.4 87.9-87.9 0-17.7 14.3-32 32-32s32 14.3 32 32c0 83.8-68.2 151.9-151.9 151.9z" fill="" p-id="2153"></path><path d="M631.37007 598.3c-41.1 0-79.6-16.1-108.5-45.3-28.5-28.8-43.9-66.8-43.4-107 0.2-17.5 14.5-31.6 32-31.6h0.4c17.7 0.2 31.8 14.7 31.6 32.3-0.3 23 8.6 44.8 25 61.3 16.8 17 39.1 26.3 63 26.3 48.5 0 87.9-39.4 87.9-87.9 0-17.7 14.3-32 32-32s32 14.3 32 32c-0.1 83.8-68.3 151.9-152 151.9z" fill="" p-id="2154"></path><path d="M871.67007 598.3c-83.8 0-151.9-68.1-151.9-151.9 0-17.7 14.3-32 32-32s32 14.3 32 32c0 48.5 39.4 87.9 87.9 87.9 23.9 0 46.2-9.3 63-26.3 16.3-16.5 25.2-38.3 25-61.3-0.1-5.5 0.1-10.6 0.2-15.6 0.1-4.3 0.3-8.8 0.3-13.7 0-17.7 14.3-32 32-32s32 14.3 32 32c0 5.9-0.1 11-0.3 15.6-0.1 4.7-0.3 8.8-0.2 13 0.4 40.2-15 78.2-43.4 107-29 29.3-67.5 45.3-108.6 45.3zM898.07007 992.2H126.07007c-34.2 0-62-27.8-62-62V558.1c0-17.7 14.3-32 32-32s32 14.3 32 32v370.1h768V649.1c0-17.7 14.3-32 32-32s32 14.3 32 32v281.1c0 34.1-27.8 62-62 62z" fill="" p-id="2155"></path></svg>
        <span>附近商家</span>
      </header>
      <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
    </div>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import shopList from 'components/common/shoplist'
import footNav from 'components/footer/foot_nav'
import {msiteAddress,msiteFoodsTypes} from 'network/getDate' 
import { swiper, swiperSlide} from 'vue-awesome-swiper'
import {mapMutations} from 'vuex'
import 'swiper/dist/css/swiper.css'
export default {
  components:{
    headTop,
    swiper,
    swiperSlide,
    shopList,
    footNav
  },
  data(){
    return {
    swiperOption: {
      /* autoplay:1000, */
      pagination  :{
        el:'.swiper-pagination',
        clickable:true
        },
      loop:true,
      },
      geohash:this.$route.query.geohash,
      msiteTitle:'请选择地址',
      foodTypes:[],
      imgBaseUrl:'https://fuss10.elemecdn.com',
      hasGetData:false
    }
  },
    async beforeMount(){
		this.geohash = this.$route.query.geohash || 'wtw3sm0q087';
		//保存geohash 到vuex
		this.SAVE_GEOHASH(this.geohash);
    let res = await msiteAddress(this.geohash);
    this.msietTitle = res.name;
    console.log(res.data);
    // 记录当前经度纬度
    this.RECORD_ADDRESS(res.data);

    this.hasGetData = true;
    },
  mounted(){
    msiteAddress(this.geohash).then(res =>{
      this.msiteTitle = res.data.address
      console.log(res.data.address);
    }),
    msiteFoodsTypes(this.geohash).then(res =>{
      let reslength = res.data.length;
      console.log(res.data);
      let resArr = res.data;
      console.log(resArr);
      let foodArr = []
      for(let i=0,j=0;i<reslength;i +=8,j++){
        foodArr[j]  =resArr.splice(0,8)
      }
      this.foodTypes = foodArr
      console.log(this.foodTypes);
    })

  },
  methods:{
    ...mapMutations(['RECORD_ADDRESS','SAVE_GEOHASH']),
    getCategoryId(url){
      let urlDate = decodeURIComponent(url.split("=")[1].replace("&&target_name",""));
      if(/restaurant_category_id/gi.test(urlDate)){
        /* console.log(typeof urlDate);
        console.log(JSON.parse(urlDate));
        console.log(urlDate.category_schema);
        console.log(urlDate.restaurant_category_id); */
        return urlDate;
      }else{
        return ''
      }
    }
  }
  
}
</script>

<style lang="scss" scoped>
  @import 'style/mixin';
  .head-top{
    .link_search{
      width: 20px;
      height: 20px;
      position: absolute;
      left: .5rem;
      top:.5rem;
    }
    .msite_title{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 50%;
    }
    
  }
  .msite_nav{
      padding-top:2.1rem;
      background-color: #fff;
      border-bottom: 0.025rem solid $bc;
      height: 11.6rem;
      .swiper-container{
        @include wh(100%,auto);
        padding: .6rem 0;
        .swiper-pagination{
          bottom: .2rem;
          width: 100%;
          height: 30px;
        }
        .food_type_container{
          display: flex;
          flex-wrap: wrap;
          .link_food{
            width: 25%;
            padding: .3rem 0rem;
            @include fj(center)
          }
        }
      }
    }
    .shop_list_container{
      margin-top: .4rem;
      border-top: 1px solid $bc;
      background-color: #fff;
      .shop_header{
        padding: .3rem 1rem;
        display: flex;
        align-items: center;
        font-size: 10px;
        span{
          margin-left: .3rem;
        }
      }
      .shop_icon{
        
        fill: rgb(126, 126, 126);
        @include wh(1.2rem,1.2rem);
      }
    }
    .swiper-slide{
      display: flex;
      flex-wrap: wrap;

    }
    .swiper-slide li{
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      
    }
    .swiper-slide li img{
      margin-bottom: 0.3rem;
      @include wh(2.5rem,2.5rem);
      
    }
    .swiper-slide li span{
      font-size: 5px;
    }
    .swiper-slide li figure{
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
</style>
<template>
  <div class="shop_detail">
    <head-top :head-title="name" goBack="true"></head-top>
    <section class="activities_container">
      <header>活动与属性</header>
      <ul class="activities_ul">
        <li v-for="item in shopDetail.activities" :key="item.id">
          <span :style="{backgroundColor:'#'+item.icon_color}">{{item.icon_name}}</span>
          <span>{{item.description}}</span>
        </li>
      </ul>
      <ul class="activities_ul">
        <li v-for="item in shopDetail.supports" :key="item.id">
          <span :style="{backgroundColor:'#'+item.icon_color}">{{item.icon_name}}</span>
          <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
    </section>
    <section class="safe_container">
      <router-link class="safe_link" to="/shop/shopDetail/shopSafe" tag="a"> 
        <span>商品监督安全公示</span>      
        <div>
          <span>企业认证详情></span>
        </div>
      </router-link>
      <section class="safe_detail">
        <div>
          <svg v-if="shopDetail.status == 1" t="1617414893747" class="icon_rate" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3189" width="128" height="128"><path d="M509.44 76.8A432.64 432.64 0 1 0 942.08 509.44 433.152 433.152 0 0 0 509.44 76.8zM282.112 420.45952a53.1712 53.1712 0 1 1 53.18144 53.1712A53.1712 53.1712 0 0 1 282.112 420.45952z m395.904 284.42112q-3.84 4.23424-7.88992 8.28416a227.54816 227.54816 0 0 1-321.408 0q-7.34208-7.34208-13.97248-15.29344a32.79872 32.79872 0 0 1 9.08288-49.152l0.48128-0.2816a32.71168 32.71168 0 0 1 41.5488 7.05536q4.64384 5.56032 9.79456 10.71104a161.09568 161.09568 0 0 0 227.54304 0q2.50368-2.49856 4.88448-5.12a33.28 33.28 0 0 1 42.45504-6.03136l0.44032 0.3072a32.8192 32.8192 0 0 1 7.05024 49.52064z m-17.32096-231.24992a53.1712 53.1712 0 1 1 53.1712-53.1712 53.1712 53.1712 0 0 1-53.16096 53.1712z" fill="#1afa29" p-id="3190"></path></svg>
          <svg v-else t="1617422546498" class="icon_rate" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2146" width="128" height="128"><path d="M512 1013.76C233.472 1013.76 7.168 787.456 7.168 508.928S233.472 4.096 512 4.096s504.832 226.304 504.832 504.832S790.528 1013.76 512 1013.76z m0-957.44C262.144 56.32 59.392 259.072 59.392 508.928S262.144 961.536 512 961.536s452.608-202.752 452.608-452.608S761.856 56.32 512 56.32z" fill="#d81e06" p-id="2147"></path><path d="M323.584 415.744m-59.392 0a59.392 59.392 0 1 0 118.784 0 59.392 59.392 0 1 0-118.784 0Z" fill="#d81e06" p-id="2148"></path><path d="M683.008 415.744m-59.392 0a59.392 59.392 0 1 0 118.784 0 59.392 59.392 0 1 0-118.784 0Z" fill="#d81e06" p-id="2149"></path><path d="M324.608 801.792c-5.12 0-10.24-1.024-14.336-5.12-11.264-8.192-14.336-24.576-6.144-35.84 47.104-67.584 124.928-107.52 206.848-107.52S675.84 695.296 720.896 760.832c8.192 11.264 5.12 27.648-6.144 35.84-12.288 8.192-27.648 5.12-35.84-6.144-35.84-52.224-101.376-84.992-166.912-84.992S385.024 737.28 348.16 791.552c-8.192 6.144-15.36 10.24-23.552 10.24z" fill="#d81e06" p-id="2150"></path></svg>
        </div>
        <div class="detail_infor">
          <p>监督检查结果：
            <span v-if="shopDetail.status == 1" class="status_well">良好</span>
            <span class="status_bad" v-else>差</span>
          </p>
          <p>检查日期：
            <span v-if="shopDetail.identification.identificate_date && shopDetail.identification.identificate_date.split('T')[0]" >{{shopDetail.identification.identificate_date && shopDetail.identification.identificate_date.split('T')[0]}}</span>
            <span v-else>商家未公示</span>
          </p>
        </div>
      </section>
    </section>
    <section class="shop_container">
      <header>商家信息</header>
      <ul>
        <li>{{shopDetail.name}}</li>
        <li>地址：{{shopDetail.address}}</li>
        <li>营业时间：{{shopDetail.opening_hours[0]}}</li>
        <li @click="showLicenseImg(shopDetail.license.business_license_image)">营业执照 <span>></span> </li>
        <li @click="showLicenseImg(shopDetail.license.catering_service_license_image)">餐饮服务许可证<span>></span></li>
      </ul>
    </section>
    <transition name="fade">
        <section class="license_container" v-if="showImg" @click="showImg = false">
            <img :src="imgBaseUrl + licenseImg">
        </section>
    </transition>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import {mapState} from 'vuex'

export default {
  name:'shopDetail',
  components:{
    headTop
  },
  data(){
    return {
      name:'商家详情',
      licenseImg:null,
      showImg:false
    }
  },
  computed:{
    ...mapState(['shopDetail'])
  },
  mounted(){
    console.log(this.shopDetail);
  },
  methods:{
    showLicenseImg(image){
      this.license_img = image;
      this.showImg = !this.showImg;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .shop_detail{
    position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ebebeb;
      z-index: 13;
      padding-top: 1.95rem;
  }
  .activities_container{
    background-color: #fff;
    margin: .8rem 0;
    padding: 0 .7rem;
    header{
      @include sc(1.05rem,rgb(0, 0, 0));
      font-weight: 200;
      line-height: 2.3rem;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: .3rem;
    }
    .activities_ul{
      li{
        padding: .5rem 0;
        span{
          &:nth-of-type(1){
            color: #fff;
            font-size: .3rem;
            padding:.2rem .15rem;
            border-radius: .2rem;
            margin-right: .5rem;
          }
          &:nth-of-type(2){
            @include sc(.8rem,rgb(0, 0, 0))
          }

        }
      }
    }
  }
  .safe_container{
    background-color: #fff;
    .safe_link{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0.025rem solid #f1f1f1;
      padding: .7rem .7rem;
      &>span{
        font-size: 1.05rem;
        font-weight: 200;
      }
      div>span{
        font-size: .9rem;
        color: #bbb;

      }
    }
    .safe_detail{
      display: flex;
      align-items: center;
      padding: .7rem .7rem;
      .icon_rate{
        width: 3.5rem;
        height: 3.5rem;
      }
    .detail_infor{
      margin-left: .5rem;
      p{
        padding: .3rem 0;
        @include sc(.6rem,#666);
        .status_well{
          color:green
        }
        .status_bad{
          color: red;
        }
      }
    }
    }
  }
  .shop_container{
    background-color: #fff;
    margin: .8rem 0;
    border-bottom: 0.025rem solid #f1f1f1;
    header{
      border-bottom: 0.025rem solid #f1f1f1;
      padding: .5rem .7rem;
      font-size: 1.05rem;
      font-weight: 200;
    }
    ul{
      li{
        padding: .8rem .7rem;
        @include sc(.6rem,#666);
        border-bottom: 0.025rem solid #f1f1f1;
      }
      li:nth-of-type(4),li:nth-of-type(5){
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .license_container{
    position:fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
  }
  .fade-enter, .fade-leave-active {
      opacity: 0;
  }
  .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
  }
</style>
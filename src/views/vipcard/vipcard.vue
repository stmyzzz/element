<template>
  <div class="vipcard_container">
    <head-top head-title="会员中心" goBack="true"></head-top>
    <div class="vipcard_detail">
      <p>为账户<span> {{userInfo.username}} </span>购买会员</p>      
      <div class="vip_quanli">
        <router-link to="/vipcard/vipDesc" class="vip_link" tag="header">
          <span>会员特权</span>
          <div class="vip_detail">
            <span>会员说明</span>
            <span>></span>
          </div>
        </router-link>
        <ul>
          <li class="quanli_li">
            <div class="item_left"><svg t="1617866280691" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3466" width="128" height="128"><path d="M506 925.5c-217.9 0-376.8-231.4-383.5-241.3l-6.2-9.2V97.7h791.3V682l-7.2 9.8c-7.2 9.5-177.9 233.7-394.4 233.7zM189.4 651.9c29.5 39.6 158.9 200.6 316.7 200.6 158.1 0 295.9-155.6 328.6-195.3V170.7H189.4v481.2z" p-id="3467" fill="#3190e8"></path><path d="M700.8 371.9c-8.5-15.5-22.4-33.6-39.5-52.2-37.3 41.1-89 73-147.7 97.6h179.7v273.5h-64.5v-17.6H418.3v20.3H357V464.6c-20.3 4.3-40 8-60.2 11.2-8-14.4-26.7-41.6-38.9-54.9 78.4-9.6 155.7-25.6 219.6-50.1V195.4h62.9v145c24.5-14.4 46.4-30.9 62.9-50.1l54.4 24.5c-20.8-23.5-44.8-46.9-66.6-66.6l50.1-30.4c41.6 34.1 91.7 83.2 115.2 119.4l-55.6 34.7zM437.5 239.6c-24 52.8-62.4 106.1-98.6 139.1-12.3-10.7-38.9-28.8-54.4-36.8 36.8-28.3 70.9-74.1 90.1-118.9l62.9 16.6z m191.4 225H418.3v23.5h210.6v-23.5z m-210.6 92.8h210.6v-26.1H418.3v26.1z m210.6 68.8V600H418.3v26.1h210.6z" p-id="3468" fill="#3190e8"></path></svg></div>
            <div class="item_right">
              <h3>减免配送费</h3>
              <p>每月减免30单，每日可减免3单，每单最高减4元</p>
              <p>蜂鸟专送专享</p>
            </div>
          </li>
        <li class="quanli_li">
          <div class="item_left"><svg t="1617866323343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4309" width="128" height="128"><path d="M856.869729 0.056886h-164.968612c-15.359147 0-30.661408 7.679573-34.529638 22.754291a153.02261 153.02261 0 0 1-283.916671 0 52.960613 52.960613 0 0 0-42.209211-22.754291h-164.968612A113.088828 113.088828 0 0 0 51.254041 115.136715v787.184712a113.088828 113.088828 0 0 0 115.136715 115.136714h172.534415q23.03872 0 34.529637-22.754291c26.850064-53.700128 80.550192-88.229765 138.118549-88.229765s111.268485 34.529637 138.118549 88.229765c7.679573 11.377146 19.170491 22.754291 34.529637 22.754291h172.648186a113.088828 113.088828 0 0 0 115.136715-115.136714V115.136715A115.478029 115.478029 0 0 0 856.869729 0.056886z" fill="#2589FF" p-id="4310" data-spm-anchor-id="a313x.7781069.0.i7" class=""></path><path d="M668.862397 567.321371a38.397867 38.397867 0 1 1 0 76.738848H553.782568v72.756847a38.397867 38.397867 0 0 1-76.738848 0v-72.756847H361.963891a38.397867 38.397867 0 1 1 0-76.738848h115.079829V490.582523H361.963891a38.397867 38.397867 0 1 1 0-76.738848h92.041109L373.454808 325.61391c-15.359147-15.359147-11.377146-38.340981 3.811344-53.700127s38.397867-11.377146 53.757013 3.811343l80.550192 88.400423a3.754458 3.754458 0 0 0 3.86823 3.811343 3.754458 3.754458 0 0 1 3.811343-3.811343l84.418422-88.286651a37.999667 37.999667 0 0 1 53.700127 53.700128L572.953058 413.843675h95.909339a38.397867 38.397867 0 1 1 0 76.738848H553.782568v76.738848z" fill="#ffffff" p-id="4311" data-spm-anchor-id="a313x.7781069.0.i6" class="selected"></path></svg></div>
            <div class="item_right">
              <h3>减免配送费</h3>
              <p>每月减免30单，每日可减免3单，每单最高减4元</p>
              <p>蜂鸟专送专享</p>
            </div>
        </li>
        </ul>
      </div>
      <div class="vip_apply">
        <header>开通会员</header>
        <div class="vip_apply_buy">
          <div class="buy_left">
            <span>1个月</span>
            <span>￥20</span>
          </div>
          <div class="buy_right">
            <span>购买</span>
          </div>
        </div>
      </div>
      <router-link to="/vipcard/useCart" class="vip_link vip_outside"   tag="header">
        <span>兑换会员</span>
        <div class="vip_detail">
          <span>使用卡号卡密 </span>
          <span>></span>
        </div>
      </router-link>
      <router-link to="/vipcard/payHistory" class="vip_link vip_outside"  tag="header">
        <span>购买记录</span>
        <div class="vip_detail">
          <span>开发票 </span>
          <span>></span>
        </div>
      </router-link>
    </div>
    <transition name="router-slid">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import {mapState} from 'vuex'
export default {
  name:'vipcard',
  data(){
    return {

    }
  },
  mounted(){
    console.log(this.userInfo);
  },
  components:{
    headTop
  },
  computed:{
    ...mapState(['userInfo'])
  },
  watch:{
    /* userInfo:function(){
      this.
    } */
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .vipcard_container{
    padding-top: 2.4rem;
    .vipcard_detail{
      >p{
        padding: .9rem .8rem;
        @include sc(.9rem,#666);
        span{
          @include sc(.5rem,#000);
          font-weight: bold;
        }
      }
      .vip_quanli{
        background-color: #fff;
        ul{
          .quanli_li{
            display: flex;
            padding: 1.2rem .6rem;
            border-top: 1px solid #f5f5f5;
            .item_left{
              flex:1;
              .icon{
                width: 2.8rem;
                height: 2.8rem;
              }              
            }
            .item_right{
              flex: 5;
              h3{
                @include sc(1rem,#000)
              }
              p{
                @include sc(.6rem,rgb(134, 133, 133))
              }              
            }

          }
        }
      }
      .vip_link{
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: .7rem .8rem;
        justify-content: space-between;
        .vip_detail{
          display: flex;
          span{
          @include sc(.7rem,rgb(139, 139, 139));            
          }
        }
      }
      .vip_apply{
        background-color: #fff;
        margin-top: .8rem;
        padding: 0 .8rem;
        header{
          padding: .8rem 0;
          border-bottom: 1px solid #f5f5f5;
        }
        .vip_apply_buy{
          display: flex;
          justify-content: space-between;
          padding: .8rem 0;
          .buy_left{
            span{
              &:nth-of-type(1){
                @include sc(1rem,#000)
              }
              &:nth-of-type(2){
                @include sc(1rem,#f60);
                font-weight: bold;
              }
            }
          }
          .buy_right{
            border:1px solid #f60;
            padding: .2rem 1rem;
            border-radius: .3rem;
            span{
              @include sc(.5rem,#f60)
            }
          }
        }
      }
      .vip_outside{
        margin-top: 1.1rem;

      }
    }
  }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
  .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }

</style>
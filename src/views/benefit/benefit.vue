<template>
  <div class="benefit_container">
    <head-top :head-title="benefitTitle" goBack="true"></head-top>
  <section class="change_show_type">
    <div>
      <span :class="{activity_show:ChangeShowType =='hb'}" @click="ChangeShowType='hb'">红包</span>
    </div>
    <div>
      <span :class="{activity_show:ChangeShowType =='djq'}" @click="ChangeShowType='djq'">商家代金券</span>
    </div>
  </section>
  <transition name="router-fade">
    <section class="hongbao_container" v-if="ChangeShowType == 'hb'">
      <header>
        <section class="hongbao_num">有<span>3</span>个红包即将到期</section>
        <section class="hongbao_description">
          <svg t="1617541681761" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2011" width="128" height="128"><path d="M518.826667 42.666667C256 42.666667 44.373333 256 44.373333 518.826667S256 993.28 518.826667 993.28s476.16-213.333333 476.16-476.16S781.653333 42.666667 518.826667 42.666667z m29.013333 703.146666c-8.533333 6.826667-18.773333 11.946667-29.013333 11.946667-10.24 0-20.48-3.413333-27.306667-11.946667-8.533333-6.826667-11.946667-17.066667-11.946667-29.013333s3.413333-20.48 11.946667-29.013333c6.826667-6.826667 17.066667-11.946667 27.306667-11.946667 10.24 0 20.48 3.413333 29.013333 11.946667 6.826667 6.826667 11.946667 17.066667 11.946667 29.013333 0 10.24-5.12 20.48-11.946667 29.013333z m104.106667-274.773333c-6.826667 6.826667-25.6 22.186667-59.733334 46.08-11.946667 8.533333-20.48 18.773333-29.013333 30.72-6.826667 11.946667-11.946667 25.6-11.946667 39.253333v10.24H477.866667v-10.24c0-22.186667 3.413333-40.96 13.653333-56.32 10.24-17.066667 35.84-40.96 80.213333-73.386666l11.946667-11.946667c11.946667-13.653333 18.773333-27.306667 18.773333-44.373333 0-20.48-6.826667-37.546667-20.48-49.493334-13.653333-11.946667-34.133333-18.773333-58.026666-18.773333-30.72 0-54.613333 8.533333-68.266667 25.6-11.946667 13.653333-18.773333 35.84-18.773333 61.44h-75.093334c0-44.373333 15.36-78.506667 44.373334-102.4 29.013333-25.6 69.973333-37.546667 121.173333-37.546667 46.08 0 81.92 10.24 109.226667 32.426667 27.306667 20.48 40.96 49.493333 40.96 85.333333 0 29.013333-8.533333 52.906667-25.6 73.386667z m0 0" p-id="2012" fill="#3190e8"></path></svg>
          <router-link tag="a" to="/benefit/hbdesc" >红包说明</router-link>
        </section>
      </header>
      <ul>
        <li v-for="(item,index) in hongbaoList" :key="index" class="hongbao_list_li">
          <section class="list-item">
            <div class="list_item_left">
              <span>¥</span>
              <span>{{String(item.amount).split('.')[0]}}</span>
              <span>.</span>
              <span>{{String(item.amount).split('.')[1] || 0}}</span>
              <p>{{item.description_map.sum_condition}}</p>
            </div>
            <div class="list_item_center">
              <p>{{item.name}}</p>
              <p>{{item.description_map.validity_periods}}</p>
              <p>{{item.description_map.phone}}</p>
            </div>
            <div class="list_item_right">
              {{item.description_map.validity_delta}}
            </div>
          </section>
        </li>
      </ul>
      <footer>
        <p>限品类：快餐便当、特色菜系、小吃夜宵、甜品饮品、异国料理</p>
      </footer>
      <router-link to="/benefit/hbHistory" class="history_hongbao">
        <span class="check_history">查看历史红包></span>
      </router-link>
      <footer class="hongbao_footer">
        <router-link class="footer_link" to="/benefit/exchange">
          兑换红包
        </router-link>
        <router-link class="footer_link" to="/benefit/commend">
          推荐有奖
        </router-link>
      </footer>   
    </section>
  </transition>
  <transition name="router-slid" mode="out-in">
    <router-view></router-view>
  </transition>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import {getHongbaoNum} from 'network/getDate'
import { mapState } from 'vuex'
export default {
  name:'benefit',
  components:{
    headTop,
    
  },
  data(){
    return {
      benefitTitle:'我的优惠',
      ChangeShowType:'hb',
      hongbaoList:null,
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  mounted(){
    this.initData();
  },
  methods:{
    async initData(){
      if (this.userInfo) {
        let hongbao2 = await getHongbaoNum(this.userInfo.user_id);
        this.hongbaoList = hongbao2.data;
        console.log('123');

      }
    }  
  },
  watch:{/* 监听 */
    userInfo:function(){
      this.initData()
    }
  }

}
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .benefit_container{
    padding-top: 2.2rem;
  }
  .change_show_type{
  display: flex;
  background-color: #fff;
  padding: .8rem .5rem;
  border-bottom: 1px solid #ebebeb;
  text-align: center;
  div{
    flex: 1;
    span{
      font-size: 1rem;
    }
    .activity_show{
      border-bottom: 2px solid #3190e8;
      color: #3190e8;
    }
  }
  }
  .hongbao_container{
    padding: .6rem .7rem;
    header{
      display: flex;
      justify-content: space-between;
      height: 3rem;
      line-height: 3rem;
      .hongbao_num{
        @include sc(.7rem,#666);
        span{
          color:red
        }
      }
      .hongbao_description{
        display: flex;
        align-items: center;
        .icon{
          width: 1rem;
          height: 1rem;
        }
        span{
          @include sc(.5rem,#3190e8);
          margin-left: .3rem;
        }
      }
    }
    .hongbao_list_li{
      background:#fff url('../../images/hongbao.png') repeat-x;
      background-size: .7rem .3rem;
      border-radius: .5rem;
      .list-item{
        padding: 1.5rem 1rem;
        display: flex;
        .list_item_left{
          flex: 2;
          border-right: 0.025rem dotted #ccc;
          span{
            &:nth-of-type(1){
              @include sc(1rem,red);
              font-weight: bold;
            }
            &:nth-of-type(2){
              @include sc(2rem,red);
              font-weight: 400;
            }
            &:nth-of-type(3){
              @include sc(1.5rem,red);
              font-weight: bold;
            }
            &:nth-of-type(4){
              @include sc(1.1rem,red);
              font-weight: bold;
            }
          }
          p{
            @include sc(.3rem,#666)
          }
        }
        .list_item_center{
          flex: 4;  
          margin-left: .5rem;
          :not(p:nth-of-type(1)){
            @include sc(.3rem,#999);

          }
        }
        .list_item_right{
          flex: 1;
          @include sc(1rem,red)
        }
      }
    }
    footer{
      p{
        @include sc(.5rem,#999);
        width: 90%;
        margin: .8rem auto;
      }
    }
  }
  .history_hongbao{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.2rem;
    span{
      @include sc(.5rem,#999);
    }
  }
  .hongbao_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    .footer_link{
      flex: 1;
      text-align: center;
     /*  height: 2rem; */
      line-height: 2.4rem;
    }
  }
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter,.router-slid-leave-active{
    transform: translate3d(2rem,0,0);
    opacity: 0;
  }
</style>
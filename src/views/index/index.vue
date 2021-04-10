<template>
  <div>
    <head-top signUp='index'> 
      <span slot="logo" class="head_logo" @click="reload">element</span>
    </head-top>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准确，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityid" class="guess_city">
        <span>{{guessCity}}</span>
        <svg t="1615622834899" class="icon arrow_right" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1599" width="128" height="128"><path d="M345.642667 822.592c12.629333 12.544 33.130667 12.544 45.76 0L678.613333 536.384c6.741333-6.698667 9.6-15.573333 9.173333-24.384 0.448-8.768-2.410667-17.664-9.173333-24.384L391.402667 201.429333c-12.629333-12.565333-33.130667-12.565333-45.76 0s-12.629333 32.981333 0 45.546667L611.648 512 345.642667 777.045333C333.013333 789.632 333.013333 810.005333 345.642667 822.592z" p-id="1600">
        </path></svg>
      </router-link>
    </nav>
    <section id="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="city_list clear">
        <router-link tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id" >
          {{item.name}}
        </router-link>
      </ul>
    </section>
    <section class="group_city_container">
      <ul class="city_tag">
        <li  v-for="(value,key,index) in sortgroupcity" :key="key" class="city_tag_li">
          <h4 class="city_title">
            {{key}}<span v-if="index ==0">(按字母排序)</span>
          </h4>
          <ul class="city_list_container clear" >
            <router-link class="city_item ellipsis" tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id">
              {{item.name}}
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import {cityGuess,hotcity,groupcity} from 'network/getDate'
export default {
  components:{
    headTop
  },
  methods:{
    reload(){
      window.location.reload()
    }
  },
  data(){
    return {
      guessCity:'',
      guessCityid:'',
      hotcity:[],
      groupcity:[]
    }
  },
  mounted(){
    console.log('mounted');
    cityGuess().then(res =>{
      this.guessCity = res.data.name;
      this.guessCityid = res.data.id
      console.log(res);
    })
    hotcity().then(res =>{
      this.hotcity = res.data
    })
    groupcity().then(res =>{
      this.groupcity = res.data
    })
  },
  computed:{
    sortgroupcity(){
      let sortObj = {};
      for(let i=65;i<=90;i++){
        if(this.groupcity[String.fromCharCode(i)]){
          sortObj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
        }
      }
      return sortObj;
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'style/mixin.scss';
    .head_logo{
        left: 0.4rem;
        font-weight: 400;
        @include sc(1rem, #fff);
        @include wh(2.3rem, 1.7rem);
        @include ct;
    }
    .city_nav{
        padding-top: 2.95rem;
        border-top: 1px solid $bc;
        background-color: #fff;
        margin-bottom: 0.4rem;
        .city_tip{
            @include fj;
            line-height: 1.65rem;
            padding: 0 0.45rem;
            span:nth-of-type(1){
                @include sc(0.55rem, #666);
            }
            span:nth-of-type(2){
                font-weight: 900;
                @include sc(0.475rem, #9f9f9f);
            }
        }
        .guess_city{
            @include fj;
            align-items: center;
            height: 3rem;
            padding: 0 0.45rem;
            border-top: 1px solid $bc;
            border-bottom: 2px solid $bc;
            @include font(1.1rem, 1.8rem);
            span:nth-of-type(1){
                color: $blue;
            }
            .arrow_right{
                @include wh(1.2rem, 1.2rem);
                fill: rgb(90, 90, 90);
            }
        }
    }
    #hot_city_container{
        background-color: #fff;
        margin-bottom: .4rem;
    }
    .city_list{
        li{
            float: left;
            text-align: center;
            color: $blue;
            border-bottom: 0.025rem solid $bc;
            border-right: 0.025rem solid $bc;
            @include wh(25%, 2.4rem);
            @include font(0.8rem, 2.4rem);
        }
        li:nth-of-type(4n){
            border-right: none;
        }
    }
    .city_title{
        color: #666;
        font-weight: 400;
        text-indent: 0.45rem;
        border-top: 2px solid $bc;
        border-bottom: 1px solid $bc;
        @include font(0.35rem,1.45rem,"Helvetica Neue");
        @include wh(100%,2rem);
        span{
          @include sc(0.55rem, rgb(49, 49, 49));
        }
    }
    .group_city_container{
      background-color: #fff;
      .city_tag{
        .city_tag_li{
          h4{
            border-top: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
            @include wh(100%,2rem);
            @include font(13px,2rem);
            span{
              margin-left: 12px;
              color:#999;
            }
          }
          .city_list_container{
            .city_item{
              text-align: center;
              float: left;
              @include wh(25%,2.3rem);
              border-right: 1px solid #e4e4e4;
              border-bottom: 1px solid #e4e4e4;
              @include font(13px,2.3rem);
              color: #666;
              
            }

          }
        }
      }
    }
    
    

</style>
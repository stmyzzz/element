<template>
  <div class="city_container" >
    <head-top class="header-top" :headTitle="cityname" :go-back="true">
      <router-link to="/index" slot="changecity" class="change_city" >切换城市</router-link>
    </head-top>
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input type="search" name="city" class="city_input" placeholder="输入学校，商务楼，地址" require v-model="inputValue">
      </div>
      <div>
        <input type="submit" name="submit" class="city_submit input_style" @click="postfrom" value="提交">
      </div>
    </form>
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getform">
      <li v-for="(item,index) in placelist" :key="index" @click="nextPage(index, item.geohash)">
        <h4 class="from_name">{{item.name}}</h4>
        <p class="from_detail ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <footer v-if="historytitle&&placelist.length" @click="clearAll">清空历史记录</footer>
    <p class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</p>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import  {currentcity,searchplace} from 'network/getDate'
import {getStore,removeStore,setStore} from 'config/mUtils';
import {mapMutations} from 'vuex'
export default {
  data(){
    return {
      cityname:'',
      cityid:'',
      historytitle:true,
      inputValue:'',
      placeNone:false,
      placelist:[],
      placeHistory:[]
    }
  },
  components:{
    headTop
  },
  methods:{
  /*   ...mapMutations(['RECORD_ADDRESS'], */
    initData(){
      if(getStore('placeHistory')){
        this.placelist = JSON.parse(getStore('placeHistory'));
      }else{
        this.placelist = []
      }
    },
    postfrom(){
      if(this.inputValue){
        searchplace(this.cityid,this.inputValue).then(res =>{
          this.historytitle = false;
          this.placelist = res.data;
          this.placeNone = res.data.length ? false : true;
          console.log(res);
        })
      }
    },
    clearAll(){
      removeStore('placeHistory');
      this.initData()
    },
    nextPage(index,geohash){
      let history = getStore('placeHistory');
      let choosePlace = this.placelist[index];
      if(history){
        let checkrepeat = false;
        this.placeHistory = JSON.parse(history)
        this.placeHistory.forEach(item => {
          if(item.geohash == geohash){
            checkrepeat = true;
          }
        });
        if(!checkrepeat){
          this.placeHistory.push(choosePlace)
        }
      }else{
        this.placeHistory.push(choosePlace)
      }
      setStore('placeHistory',this.placeHistory);
      this.$router.push({path:'/msite',query:{geohash}}) /* 路由跳转 */
    }
  },
  mounted(){
    this.cityid = this.$route.params.cityid;
    currentcity(this.cityid).then(res =>{
      this.cityname = res.data.name;
      console.log(res);
    }),
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
  @import 'style/mixin';
  .city_container{
    padding-top: 2.3rem;
    .header-top{
    right: .4rem;
    @include sc(0.6rem, #fff);
    @include fj(space-between) ;
    align-items: center;
    .change_city{
      margin-right: .4rem;
      color: #fff;
    }
    } 
    .city_form{
      background-color: #fff;
      margin-top: .6rem;
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      div{
        width: 90%;
        margin: 0 auto;
      }
      .city_input,
      .city_submit{
        width: 100%;
        height: 2.3rem;
      }
      .city_submit{
        background-color: $blue;
        color: #fff;
      }
      .city_input{
        border: 1px solid #e4e4e4;
        padding: 0 .4rem;
        margin-bottom: .8rem;
      }
    }
    .pois_search_history{
      @include sc(.6rem,black);
      padding-left:10px;
    }
    .getform{
      background-color: #fff;
      li{
        border-bottom: 1px solid #e4e4e4;
        border-top: 1px solid #e4e4e4;
        padding-top: .65rem;
        h4,p{
          width: 90%;
          margin: 0 auto .65rem;
        }
        p{
          color:#a4a4a4;
          font-size: 10px;
        }
        h4{
          font-size: 15px;
        }
      }
    }
    footer{
      line-height: 3rem;
      font-size: 16px;
      background-color: #fff;
      text-align: center;
    }

  }


</style>
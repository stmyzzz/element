<template>
  <div class="search_container">
    <head-top head-title="搜索" goBack="true"></head-top>
    <form class="search_form">
      <input type="search" class="search_input" v-model="inputAddress" required placeholder="请输入商家或美食" >
      <div class="input_submit" @click="inputSubmit" >提交</div>
    </form>
    <div class="history_search">
      <p v-if="historytitle">搜索历史</p>
      <ul>
        <li @click="goMsite(index,item.geohash)" v-for="(item,index) in placeList" :key="index">
          <div class="place_container">
          <h4 class="item_name ellipsis">{{item.name}}</h4>
          <p class="item_address ellipsis">{{item.address}}</p>            
          </div>
            <svg t="1617803668010" @click.stop="deleteHistory(index)"  class="icon_delete" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2001" width="128" height="128"><path d="M 512 620.544 l 253.338 253.338 a 76.6976 76.6976 0 1 0 108.544 -108.544 L 620.646 512 l 253.235 -253.338 a 76.6976 76.6976 0 1 0 -108.544 -108.544 L 512 403.354 L 258.662 150.118 a 76.6976 76.6976 0 1 0 -108.544 108.544 L 403.354 512 L 150.118 765.338 a 76.6976 76.6976 0 1 0 108.544 108.544 L 512 620.646 Z" fill="#3190e8" p-id="2002"></path></svg>            
        </li>
      </ul>
      <p class="clearAllHistory" @click="clearAllHistory">清除搜索历史</p>
      <p v-if="placeNone">没有搜索到结果</p>
    </div>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import footNav from 'components/footer/foot_nav'
import {searchplace} from 'network/getDate'
import {getStore,removeStore,setStore} from 'config/mUtils'
export default {
  name:'search',
  data(){
    return {
      placeHistory:[],
      placeList:[],
      showHistory:false,
      placeNone:false,
      historytitle:false,
      inputAddress:''
    }
  },
  components:{
    headTop,
    footNav,
  },
  mounted(){
    this.geohash = this.$route.params.geohash;
    this.initData();
  },
  methods:{
    initData(){
      if(getStore('placeHistory')){
        this.placeList = JSON.parse(getStore('placeHistory'));
        this.showHistory = true
      }else{
        this.placeList = []
      }
      /* console.log(this.placeHistory); */
    },
    goMsite(index,geohash){
      let history = getStore('placeHistory');
      let choosePlace = this.placeList[index];
      if(history){
        let checkrepeat = false;
        this.placeHistory = JSON.parse(history);
        this.placeHistory.forEach(item => {
          if(item.geohash ==  geohash){
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
        console.log(this.placeHistory);
        console.log('start')
        this.$router.push({path:'/msite',query:{geohash}})
    },
    inputSubmit(){
        if (this.inputAddress) {
          searchplace(this.cityid, this.inputAddress).then(res => {
            this.historytitle = false;
            this.placeList = res.data;
            console.log(this.placeList);
            this.placeNone = res.length? false : true;
          })
        }
    },
    deleteHistory(index){
      this.placeHistory.splice(index,1);
      setStore('placeHistory',this.placeHistory)
    
    },
    clearAllHistory(){
      this.placeHistory = [],
      setStore('placeHistory',this.placeHistory)
    }
  },
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
  .search_container{
    padding-top: 2.2rem;
  .search_form{
    display: flex;
    padding:.9rem .6rem;
    background-color: #fff;
    .search_input{
      flex: 4;
      padding: .4rem .5rem;
      border: none;
      outline: none;
      background-color: #f2f2f2;
      font-weight: bold;
      height: 2.2rem;
    }
    .input_submit{
      flex: 1;
      background-color:#3190e8;
      display: flex;
      align-items: center;
      justify-content: center;
      @include sc(.9rem,rgb(255, 255, 255));
      font-weight: bold;
      border-radius: .2rem;
      margin-left: .3rem;
      height: 2.2rem;
      padding: .2rem .4rem;
    }
  }
  .history_search{
    >p{
      padding: .3rem .5rem;
      font-weight: bold;      
    }
    .clearAllHistory{
      text-align: center;
      background-color: #fff;
      padding: .5rem 0;
    }
    ul{
      background-color: #fff;
      li{
        border-bottom: 1px solid #e4e4e4;
        padding: .5rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h4{
          margin: .2rem 0 .3rem 0;
          @include sc(1rem,rgb(37, 37, 37))
        }
        p{
          @include sc(.5rem,#666)
        }
        .ellipsis{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .icon_delete{
          width: 1rem;
          height: 1rem;
        }
      }
    }

    
  }
  }

</style>
<template>
  <div class="exchange_container">
    <head-top head-title="兑换红包" goBack='true'></head-top>
    <form class="exchange_code">
      <input class="exchange_input" type="text" placeholder="请输入兑换码" v-model="changecode">
      <section class="input_code">
        <input class="code_input" type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        <div class="code_img">
          <img :src="CodeImg" alt="">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <div class="finish" @click="exchange" :class="{active:status}">兑换</div>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import {mapState} from 'vuex'
import {getcode, exChangeHongbao} from 'network/getDate'
import alertTip from 'components/common/alertTips'
export default {
  name:'exchange',
  data(){
    return{
      showAlert:false,
      alertText:null,
      changecode:'',
      codeNumber:'',    
      CodeImg:null
    }
  },
  components:{
    headTop,
    alertTip
  },
  mounted(){
    this.getCaptchaCode()
  },
  computed:{
    ...mapState(['userInfo']),
    status:function(){
      let status = (/^\d+$/gi.test(this.changecode)) && (/^\w{4}$/gi.test(this.codeNumber));
      return status;
    }
  },
  methods:{
    async getCaptchaCode(){
      let res = await getcode();
      this.CodeImg = res.data.code;
      console.log(res);
    },
    async exchange(){
      if(this.status){
        let res = await exChangeHongbao(this.userInfo.user_id, this.changecode, this.codeNumber);
        console.log(res);
        if(res.data.message){
          this.getCaptchaCode();
          this.showAlert = true;
          this.alertText = res.data.message;
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .exchange_container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f1f1f1;
    z-index: 999;
    padding-top: 2.3rem;
    .exchange_code{
      margin-top: 1rem;
      padding: 0 .6rem;
      .exchange_input{
        width: 100%;
        @include sc(1rem,#666);
        padding: .9rem .5rem;
        border: none;
        outline: none;
        border-radius: .25rem;
      }
      .input_code{
        display: flex;
        align-items: center;
        margin-top: 1.2rem;
        height: 3rem;
        .code_input{
          flex: 3;
          padding: 1rem .5rem;
          border: none;
          outline: none;
          border-radius: .25rem;
          margin-right: .6rem;
        }
        .code_img{
          background-color: #fff;
          flex: 2;
          display: flex;
          height: 100%;
          align-items: center;
          padding: .2rem;
          border-radius: .25rem;
          img{
            width: 5rem;
            height: 2.6rem;
          }
          .change_img{
            p{
              &:nth-of-type(1){
              @include sc(.6rem,#666)                
              }
              &:nth-of-type(2){
              @include sc(.6rem,rgb(3, 128, 185))                
              }
            }
          }

        }
      }
    }
    .finish{
      margin: 1rem .6rem;
      background-color: #ccc;
      color: #fff;
      height: 2.5rem;
      line-height: 2.5rem;
      text-align: center;
      border-radius: .25rem;
    }
    .active{
      background-color: green;
    }
  }


</style>
<template>
  <div class="useCart_container">
    <head-top head-title="兑换会员" goBack="true"></head-top>
    <header class="">成功兑换后将关联到当前账号：<span>{{userInfo.username}}</span></header>
    <div class="form_style">
      <input v-model="cartNumber" maxlength="10" type="text" placeholder="请输入10位卡号">
      <input v-model="passWord" maxlength="6" type="text"  placeholder="请输入6位卡密">
    </div>
    <p @click="submitPay" class="useCart_exchange" :class="couldPay ? 'active':''">兑换</p>
    <div class="vipcard_say">
      <p>——温馨提示——</p>
      <p>新兑换的会员服务，权益以「会员说明」为准。</p>
      <p>月卡：<b>30次</b>减免配送费。</p>
      <p>季卡：<b>90次</b>减免配送费。</p>
      <p>年卡：<b>360</b>次减免配送费。</p>
      <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
    </div>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import {mapState} from 'vuex'
import alertTip from 'components/common/alertTips'
import {vipCart} from 'network/getDate'
export default {
  name:'userCart',
  components:{
    headTop,
    alertTip
  },
  data(){
    return {
      cartNumber : null,
      passWord : null,
      showAlert : false,
      alertText : null
    }
  },
  computed:{
    ...mapState(['userInfo']),
    couldPay:function(){
      return (/^\d{10}$/.test(this.cartNumber) && (/^\d{6}$/.test(this.passWord)));
    }
  },
  methods:{
    async submitPay(){
      if(this.couldPay){
        let res =  await vipCart(this.userInfo.id,this.cartNumber,this.passWord);
        
        if(res.data.message){
          this.showAlert = true;
          this.alertText = res.data.message;
        }else if(res.data.name){
          this.showAlert = true;
          this.alertText = res.data.name
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .useCart_container{
    background-color: #f5f5f5;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    padding-top: 2.4rem;
    header{
      padding:1rem 1.2rem;
      @include sc(.85rem,#666);
      span{
        font-weight: bold;
      }
    }
    .form_style{
      display: flex;
      flex-direction: column;
      padding: 0 .8rem;
      background-color: #fff;
      input{
        width: 100%;
        height: 2.7rem;
        font-size: .9rem;
        padding: 0 .3rem;
        border: none;
        outline: none;
      }
    }
    .useCart_exchange{
      padding: .6rem .8rem;
      margin: 1rem 1.2rem;
      text-align: center;
      background-color: rgb(204, 204, 204);
      border-radius: .2rem;
      @include sc(1rem,#fff);
      font-weight: bold;
    }
    .active{
      background-color: green;
    }
    .vipcard_say{
      p:nth-of-type(1){
        text-align: center;
        margin-bottom: .8rem;
        @include sc(.9rem,#aaa)
      }
      :not(p:nth-of-type(1)){
        @include sc(.7rem,#aaa);
        padding: 0 1.2rem;
      }
    }
  }

</style>
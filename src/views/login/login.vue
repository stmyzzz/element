<template>
  <div class="login_container">
    <head-top class="head_top" goBack="true" :headTitle="headTitle" >
    </head-top>
    <form class="login_form">
      <div>
        <input type="text" placeholder="账号" v-model="userAccount">
      </div>
      <div>
        <input v-if="!showPassword" type="password" v-model="passWord" placeholder="密码">
        <input v-else v-model="passWord" placeholder="密码" type="text" >
        <div class="button_switch" :class="{change_to_text:showPassword}">
          <div :class="{change_to_right:showPassword,circle_button:!showPassword}" @click="showPassWord"></div>
        </div>
      </div>
      <div>
        <input type="text"  placeholder="验证码" maxlength="4"  v-model="codeNumber">
        <div class="img_code">
          <img v-show="CodeImg" :src="CodeImg" alt="">
          <div class="img_change">
            <p>看不清</p>
            <p @click="changeImgCode">换一张</p>
          </div>
        </div>
      </div>
    </form>
    <p class="login_tips">
      温馨提示：未注册过的账号，登录时将自动注册
    </p>
    <p class="login_tips">
      注册过的用户可凭账号密码登录
    </p>'
    <div class="login_buttton" @click="mobile_login">
      登录
    </div>
    <router-link to="/forget" class="to_forget">
    </router-link>
    <alert-tips v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tips>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import alertTips from 'components/common/alertTips'
import {getcode,accountLogin} from 'network/getDate'
import {mapState, mapMutations} from 'vuex'
export default {
  name:'login',
  components:{
    headTop,
    alertTips,

  },
  data(){
    return {
      headTitle:'密码登录',
      showPassword:false,
      passWord:null,
      userAccount:null,
      CodeImg:null,
      phoneNumber:null,
      codeNumber:null,
      alertText:null,
      showAlert:false,
      userInfo: null,
      }
  },
  created(){
    this.getCaptchaCode()
  },
  computed:{
    rightPhoneNumber(){
      return /^1\d{10}&/gi.test(this.phoneNumber)
    }
  },
  methods:{
    ...mapMutations([
      'RECORD_USERINFO'
    ]),
    showPassWord(){
      this.showPassword = !this.showPassword
    },
    getCaptchaCode(){
      getcode().then(res =>{
        this.CodeImg = res.data.code
        console.log(res);
      })
    },
    changeImgCode(){
      this.getCaptchaCode()
    },
    closeTip(){
      this.showAlert = false
    },
    mobile_login(){
      if(!this.userAccount){
        this.showAlert = true;
        this.alertText = "请输入手机号/邮箱/用户名"
      }else if(!this.passWord){
        this.showAlert = true;
        this.alertText = "请输入密码"
      }else if(!this.codeNumber){
        this.showAlert = true;
        this.alertText = "请输入验证码"
      }
      accountLogin(this.userAccount,this.passWord,this.codeNumber).then(res =>{
        this.userInfo = res.data;
      });
      if (!this.userInfo.user_id) {
      this.showAlert = true;
      this.alertText = this.userInfo.message;
    }else{
      this.RECORD_USERINFO(this.userInfo)
      this.$router.go(-1);
    }
  }
}
}
</script>

<style lang="scss" scoped>
  @import 'style/mixin.scss';
  .login_container{
    padding-top:38px;
  }
  .head_top{
      @include fj(space-between) ;
    align-items: center;
  }
  .login_form{
    margin-top: 10px;
    background-color: #fff;
    & > div{ /* 选择子div */
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e4e4e4;
      padding: 13px 15px;
    }
    div input{
      font-size: 16px;
      width: 100%;
      outline: none;
      border: none;
    }
    .button_switch{
      display: flex; 
      align-items: center;
      position: relative;
      background-color: #ccc;
      width: 3.5rem;
      height: 1rem;
      border-radius: 2rem;
      .circle_button{
        position: absolute;
        width: 25px;
        height: 25px;
        left: 0;
        background-color: #8b8b8b;
        border-radius: 50%;
      }
    }
    .change_to_text{
      background-color: green;  
      .change_to_right{
        position: absolute;
        width: 25px;
        height: 25px;
        right: 0;
        background-color: #8b8b8b;
        border-radius: 50%;
    }
    }
    .img_code{
      display: flex;
      align-items: center;
      img{
        width: 4.5rem;
        height: 2rem;
      }
      .img_change{
        display: flex;
        width: 3rem;
        flex-wrap: wrap;
        justify-content: center;
        font-size: 10px;
        p:last-of-type{
          color:$blue;
        }
        
      }
    }
  }
  .login_tips{
    padding:.4rem .6rem;
    font-size: .5rem;
    color: red;
    line-height: 1rem;
    
  }
</style>  
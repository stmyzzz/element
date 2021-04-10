<template>
  <div class="forget_container">
    <head-top head-title="重置密码" goBack="true"></head-top>
    <form class="reset_form">
      <section class="input_container phone_number">
        <input type="text" placeholder="账号" name="phone" maxlength="11" v-model="phoneNumber" @input="inputPhone" >
      </section>
      <section class="input_container">
        <input type="text" placeholder="旧密码" name="oldPassWord" v-model="oldPassWord">
      </section>
      <section class="input_container">
        <input type="text" placeholder="旧密码" name="oldPassWord" v-model="oldPassWord">
      </section>
      <section class="input_container">
        <input type="text" placeholder="请输入新密码" name="newPassWord" v-model="newPassWord">
      </section>
      <section class="input_container">
        <input type="text" placeholder="重复输入新密码" name="renewPassWord" v-model="renewPassWord">
      </section>
      <section class="input_container code_container">
        <input type="text" placeholder="验证码" name="mobilePhone" v-model="mobilecode">
        <div class="img_change">
          <img v-show="isCodeImg" :src="CodeImg" alt="">
          <div class="change_img" @click="getCode" >
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <div @click="resetButton" class="login_container">
      确认修改
    </div>
    <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText" ></alert-tip>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import {getcode,changePassWord} from 'network/getDate'
export default {
  name:'forget',
  components:{
    headTop
  },
  data(){
    return {
      phoneNumber:null,
      oldPassWord:null,
      newPassWord:null,
      renewPassWord:null,
      CodeImg:'',
      isCodeImg:'',
      showAlert:false,
      alertText:null,
    }
  },
  methods:{
    async getCodeImg(){
      let res = await getcode();
      this.CodeImg = res.data;
    },
    async resetButton(){
      if(!this.phoneNumber){
        this.showAlert = true;
        this.alertText = '请输入正确的账号'
      }else if(!this.oldPassWord){
        this.showAlert = true;
        this.alertText = '请输入旧密码'
      }else if(!this.newPassWord){
        this.showAlert = true;
        this.alertText = '请输入新密码'
      }else if(!this.renewPassWord){
        this.showAlert = true;
        this.alertText = '请再次输入新密码'
      }else if(this.newPassWord !== this.renewPassWord){
        this.showAlert = true;
        this.alertText = '两次输入的密码不一致';
        return
      }
      let res =  await changePassWord(this.phoneNumber, this.oldPassWord, this.newPassWord, this.confirmPassWord, this.mobileCode);
      if(res.data.message){
        this.showAlert = true;
        this.alertText = res.message;
        this.getCodeImg();
        return
      }else{
        this.showAlert = true;
        this.alertText = "密码修改成功"
      }
    },
    closeTip(){
      this.showAlert = false;
    }
    


  }
}
</script>

<style lang="scss" scoped>
  @import 'style/mixin';
  .forget_container{
    padding-top: 2.4rem;
  }
</style>
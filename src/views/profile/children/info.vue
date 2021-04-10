<template>
  <div class="info_container">
    <head-top head-title="账户信息" goBack="true"></head-top>
    <div class="profile_info">
      <div class="profile_img">
        <input class="change_img" type="file" @change="uploadAvatar" >
        <p>头像</p>
        <div class="img_infor">
          <img :src="imgBaseUrl + userInfo.avatar" alt="">
          <span>></span>
        </div>
      </div>
      <router-link to="/profile/info/updatename">
      <div  class="profile_username">
        <p>用户名</p>
        <div class="username">
          <span>{{userInfo.username}}</span>
          <span>></span>
        </div>
      </div>        
      </router-link>
      <div class="profile_username">
        <p>收货地址</p>
          <span>></span>
      </div>
      <p class="profile_add">账号绑定</p>
      <div class="profile_username" @click="changePhone">
        <p>手机</p>
        <span>></span>
      </div>
      <p class="profile_add">安全设置</p>
      <router-link to="/forget">
        <div class="profile_username">
          <p>登录密码</p>
          <div class="username">
            <span>修改</span>
            <span>></span>
          </div>
        </div>        
      </router-link>
      <p class="info_exit">退出登录</p>
    </div>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import {mapState,mapMutations} from 'vuex'
import axios from 'axios'
import alertTip from 'components/common/alertTips'

export default {
  name:'info',
  components:{
    headTop,
    alertTip
  },
  data(){
    return {
      imgBaseUrl:'//elm.cangdu.org/img/',
      showAlert : false,
      alertText :null
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  mounted(){
    console.log(this.userInfo);
  },
  methods:{
    async uploadAvatar(){
    if (this.userInfo){
      let input = document.querySelector('.change_img')
      let data = new FormData();
      data.append('file', input.files[0]);
      try{
          let response = await axios.post('/eus/v1/users/' + this.userInfo.user_id + '/avatar', {
              credentials: 'include',
              body: data
              })
              console.log(response);
          let res = await response.json();
          if (res.status == 1) {
              this.userInfo.avatar = res.image_path;
          }
      }catch (error) {
          this.showAlert = true;
          this.alertText = '上传失败';
          console.log('error');
          throw new Error(error);
          
      }
    }
    },
    changePhone(){
      this.showAlert = true;
      this.alertText = '请在手机APP中设置'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'style/mixin';
  .info_container{
    background-color: #f5f5f5;
    z-index: 101;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 2.4rem;
    .profile_info{
      background-color: #fff;
      border-top: 1px solid #ddd;
      height: 4.5rem;
      margin-top: .8rem;
      .profile_img{
        padding: .2rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        p{
          @include sc(.9rem,rgb(0, 0, 0))
        }
        .change_img{
          position: absolute;
          display: block;
          width: 100%;
          left: 0;
          height: 4.5rem;
          outline: none;
          opacity: 0;
        }          
        .img_infor{
        
          display: flex;
          align-items: center;
          justify-content: space-between;
          img{  
            width:2.7rem;
            height: 2.7rem;      
            border-radius: 50%;
            margin-right: .3rem;
          }
        }
      }
    }
    .profile_username{
      display: flex;
      align-items: center;
      padding: .5rem 1rem;
      justify-content: space-between;
      height: 3rem;
      background-color: #fff;
      border-top: 1px solid #ddd;
      @include sc(.9rem,#000);
      .username{
        span{
        @include sc(.9rem,#666);          
        
        }
      }
    }
    .profile_add{
      height: 2rem;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      @include sc(.7rem,#666)
    }
    .info_exit{
      display: flex;
      background-color: #d8584a;
      margin: 2rem .5rem 0 .5rem;
      @include sc(.8rem,#fff);
      height: 2.3rem;
      border-radius: .3rem;
      display: flex;
      align-items: center;
      justify-content: center;
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
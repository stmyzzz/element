<template>
  <div id="header_top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <section class="head_goback" v-if="goBack"  @click="$router.go(-1)">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </section>
    <router-link :to="userInfo? '/profile':'/login'"  v-if="signUp" class="head_login">
      <svg t="1616413083538" class="icon user_avatar" v-if="userInfo" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2032" width="128" height="128">
          <path d="M582.352706 568.885667c-3.173009-1.033003-23.208068-10.067029-10.688031-48.126141l-0.173001 0c32.628096-33.602098 57.568169-87.703257 57.568169-140.945413 0-81.88124-54.45416-124.788366-117.727345-124.788366-63.311185 0-117.455344 42.908126-117.455344 124.788366 0 53.458157 24.803073 107.775316 57.627169 141.295414 12.792037 33.563098-10.08603 46.021135-14.873044 47.77614-66.271194 23.96307-144.009422 67.648198-144.009422 110.771325l0 16.157047c0 58.755172 113.910334 72.111211 219.332643 72.111211 105.578309 0 218.047639-13.356039 218.047639-72.111211l0-16.157047C730.001139 635.229861 651.87491 591.897734 582.352706 568.885667L582.352706 568.885667zM582.352706 568.885667" p-id="2033" fill="#FFFFFF"></path>
          <path d="M511.308498 958.895809c-246.714723 0-447.417311-200.702588-447.417311-447.423311 0-246.714723 200.702588-447.417311 447.417311-447.417311 246.721723 0 447.423311 200.702588 447.423311 447.417311C958.731809 758.194221 758.029221 958.895809 511.308498 958.895809L511.308498 958.895809zM511.308498 128.259376c-211.307619 0-383.213123 171.905504-383.213123 383.213123 0 211.279619 171.905504 383.219123 383.213123 383.219123 211.279619 0 383.219123-171.939504 383.219123-383.219123C894.527621 300.165879 722.588117 128.259376 511.308498 128.259376L511.308498 128.259376zM511.308498 128.259376" p-id="2034" fill="#FFFFFF"></path>
      </svg>
      <span class="login_span" v-else>登录/注册</span>
    </router-link>
    <section class="title_head ellipsis" v-if="headTitle">
      <span class="title_text">{{headTitle}}</span>
    </section>
    <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changecity"></slot>
    <slot name="changelogin"></slot>
    <!-- 全是插槽 区分不同的插槽  -->
  </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        data(){
            return{

            }
        },
        mounted(){
            //获取用户信息
            
            this.getUserInfo();
            
            
        },
        props: ['signUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState([
                'userInfo'
            ]),
            
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),
        },

    }

</script>

<style lang="scss" scoped>
@import 'style/mixin';
#header_top{
  background-color: $blue;
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  @include wh(100%,2.5rem);
  display: flex;
  align-items: center;
}
.head_goback{
  left: 20px;
  @include wh(20px,20px);
  margin-left: .4rem;
}
.head_login{
  right: 0.55rem;
  @include sc(0.65rem,#fff);
  @include ct;  
  .user_avatar{
    fill: #fff;
    @include wh(1.5rem,1.5rem)
  }
  .login_span{
    color: #fff;
 /*    font-size:  */
  }
}
.title_head{
  @include center;
  width: 50%;
  text-align: center;
  .title_text{
    @include sc(1rem,#fff);
    text-align:center;
    font-weight: bold;
  }
}
</style>
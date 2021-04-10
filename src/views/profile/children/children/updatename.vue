<template>
  <div class="update_name">
    <head-top head-title="修改用户名" goBack="true"></head-top>
    <div class="form_name">
      <input class="name_input" :class="{'isShowBorder' : borderColor}" v-model="inputValue" placeholder="输入用户名" @input="inputThing" type="text">
      <p v-if="earning">用户名只能修改一次（5-24字符之间）</p>
      <p class="unlikep" v-else>用户名长度在5到24位之间</p>
      <div :class="{'opaticysub':opaticysubmit}" class="reset" @click="resetName">确认修改</div>
    </div>
    <alert-tip v-if="showAlert"></alert-tip>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import alertTip from 'components/common/alertTips'
import {mapState,mapMutations} from 'vuex'
export default {
  name:'updatename',
  components:{
    headTop,
    alertTip
  },
  data(){ 
    return {
      showAlert:false,
      inputValue:'',
      isShowBorder:false,
      earning:true,
      opaticysubmit:true
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods:{
    ...mapMutations('RETSET_NAME'),
    inputThing(){
      if(this.inputValue.length <5 || this.inputValue.length > 24){
        this.earning = true;
        this.borderColor = true;
        this.opaticysubmit = true;
        return false;
      }else{
        this.earning = false;
        this.borderColor = false;
        this.opaticysubmit = false;
        return true;
      }
    },
    resetName(){
      let checksubmit = this.inputThing();
      if(!checksubmit){
        return /* 终止函数的执行，返回undefined */
      }
      this.RESERT_NAME(this.inputValue);
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss">
  .update_name{
    background-color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 2.4rem;
    z-index: 110;
  }
</style>
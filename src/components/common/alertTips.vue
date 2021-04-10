<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confirm" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      
    } 
  },
  props:['alertText'],
  methods:{
    closeTip(){
      this.$emit('closeTip')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'style/mixin.scss';
  @keyframes tipMove{
    0%{transform: scale(1);}
    35%{transform: scale(.8);}
    70%{transform: scale(1.1);}
    100%{transform: scale(1);}
  }
  .alert_container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:200;
  }
  .tip_text_container{
    position:absolute;
    left: 50%;
    top: 50%;
    margin-top: -8rem;
    margin-left: -8rem;
    width:16rem;
    height: 11rem;
    animation: .4s tipMove;
    border: 1px;
    border-radius:5px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    }
  .tip_icon{
    @include wh(4.5rem,4.5rem);
    border: 3px solid rgb(240, 240, 56);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span:nth-of-type(1){
      @include wh(.1rem,2rem);
      background-color: rgb(240, 240, 56);
    }
    span:nth-of-type(2){
    @include wh(.3rem, .3rem);
    border: 2px;
    border-radius: 50%;
    margin-top: .2rem;
    background-color: rgb(240, 240, 56);
    }
    }
    .tip_text{
      margin:23px;
    }
    .confirm{
      background-color: rgb(31, 248, 128);
      width: 100%;
      border-radius:5px;
      text-align: center;
      line-height: 2.5rem;
      font-size: 18px;
      font-weight: 700;
      color: #fff;
    }

</style>
<template>
  <div class="service_detail">
    <head-top head-title="服务说明" goBack="true"></head-top>
    <p>
      {{question}}
    </p>
  </div>
  
</template>

<script>
import headTop from 'components/header/header'
import {mapState} from 'vuex'
export default {
  name:'serviceDetail',
  components:{
    headTop
  },
  computed:{
    ...mapState(['question'])
  }
}
</script>

<style lang="scss" scoped>
  .service_detail{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 999;
  }
  
</style>
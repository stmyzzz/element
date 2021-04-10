<template>
  <div class="order_container">
    <head-top head-title="订单列表" goBack="true"></head-top>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import footNav from 'components/footer/foot_nav'
export default {
  name:'order',
  data(){
    return {}
  },
  components:{
    headTop,
    footNav
  }
}
</script>

<style>

</style>
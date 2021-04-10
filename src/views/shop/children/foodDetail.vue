<template>
  <div class="food_detail">
    <head-top :head-title="name" goBack="true"></head-top>
    <div class="header_img">
      <img :src="imgBaseUrl + image_path" class="food_img">
    </div>
    <p class="description">{{description}}</p>
    <div class="food_detail_container">
      <div class="detail_left">
        <p>{{name}}</p>
        <div class="rating-sale">
          <span class="rating_name">评分</span>
          <rating-star :rating="rating"></rating-star>         
          <span class="rating_num">{{rating.toFixed(1)}}</span>
        </div>
        <p class="sell_num">
          <span>月售 {{month_sales}}单</span>
          <span>售价 ¥{{foods.specfoods[0].price}}</span>
          <span v-if="foods.specfoods.length">起</span>
        </p>
        <p class="say_num">
          <span>评论数 {{rating_count}}</span>
          <span>好评率 {{satisfy_rate}}%</span>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import headTop from 'components/header/header'
import ratingStar from 'components/common/ratingStar'
export default {
  name:'foodDetail',
  data(){
    return {
      image_path: null,
      description: null,
      month_sales: null,
      name: null,
      rating: null,
      rating_count: null,
      satisfy_rate: null,
      foods: null,
      shopId: null,
      imgBaseUrl:'//elm.cangdu.org/img/',
    }
  },
  created(){
    console.log(this.image_path);
    this.image_path = this.$route.query.image_path;
    this.description = this.$route.query.description;
    this.month_sales = this.$route.query.month_sales;
    this.name = this.$route.query.name;
    this.rating = this.$route.query.rating;
    this.rating_count = this.$route.query.rating_count;
    this.satisfy_rate = this.$route.query.satisfy_rate;
    this.foods = this.$route.query.foods;
    this.shopId = this.$route.query.shopId;
  },
  components:{
    headTop,
    ratingStar
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .food_detail{
    position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      z-index: 12;
      padding-top: 1.95rem;
  }
  .header_img{
    width: 100%;
  }
  .header_img img{
    width: 100%;
  }
  .description{
    padding: 0 .7rem;
    margin-top: .5rem;
    @include sc(.8rem,#666);
  }
  .food_detail_container{
    display: flex;
    align-items: center;
    padding: .7rem;
    .detail_left{
      display: flex;
      flex-direction: column;
      .rating-sale{
        display: flex;
        align-items: center;
        margin: .3rem 0;
        .rating_name{
          @include sc(.8rem,#666,);
        }
        .rating_num{
          @include sc(.6rem,#f60);
          margin-left: .3rem;
        }
      }
      .sell_num{
        display: flex;
        align-items: center;
        span{
          &:nth-of-type(1){
            @include sc(.8rem,#666);
            margin-right: .5rem;
          }
          &:nth-of-type(2){
            @include sc(.8rem,#f60);
            margin-right: .3rem;
          }
          &:nth-of-type(3){
            @include sc(.8rem,#f60);
          }
        }
      }
      .say_num{
        margin-top: .2rem;
        span{
          &:nth-of-type(1){
            @include sc(.8rem,#666);
          }
          &:nth-of-type(2){
            @include sc(.8rem,#666);
          }
        }
      }
    }
  }
</style>
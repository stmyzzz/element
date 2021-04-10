<template>
  <div class="cart_container">
    <section v-if="!foods.specifications.length" class="cart_button">
      <transition name="showReduce">
        <svg t="1617285042701" @click="removeCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id)" v-if="foodNum" class="cart_remove" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1601" width="128" height="128"><path d="M512 0C229.180952 0 0 229.180952 0 512s229.180952 512 512 512 512-229.180952 512-512S792.380952 0 512 0z m0 926.47619c-229.180952 0-414.47619-185.295238-414.47619-414.47619S282.819048 97.52381 512 97.52381s414.47619 185.295238 414.47619 414.47619-185.295238 414.47619-414.47619 414.47619z" fill="#3190e8" p-id="1602"></path><path d="M704.609524 475.428571h-390.095238c-26.819048 0-48.761905 21.942857-48.761905 48.761905s21.942857 48.761905 48.761905 48.761905h390.095238c26.819048 0 48.761905-21.942857 48.761905-48.761905s-21.942857-48.761905-48.761905-48.761905z" fill="#3190e8" p-id="1603"></path></svg>
      </transition>
      <transition name="fade">
        <div class="cart_num" v-if="foodNum">{{foodNum}}</div>
      </transition>
    <svg t="1617346709654" class="cart_add" @click="addCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock)" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8852" width="128" height="128"><path d="M511.41 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#3190e8" p-id="8853" data-spm-anchor-id="a313x.7781069.0.i20" class="selected"></path><path d="M778.08 565.33H564.75v213.33c0 29.33-24 53.33-53.33 53.33s-53.33-24-53.33-53.33V565.33H244.75c-29.33 0-53.33-24-53.33-53.33s24-53.33 53.33-53.33h213.33V245.33c0-29.33 24-53.33 53.33-53.33s53.33 24 53.33 53.33v213.33h213.33c29.33 0 53.33 24 53.33 53.33 0.01 29.34-23.99 53.34-53.32 53.34z" fill="#FFFFFF" p-id="8854"></path></svg>
    </section>
    <section v-else class="cart_guige">
      <transition name="showReduce">
        <svg t="1617285042701" class="icon_reduce" v-if="foodNum" @click="showReduceTip" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1601" width="128" height="128"><path d="M512 0C229.180952 0 0 229.180952 0 512s229.180952 512 512 512 512-229.180952 512-512S792.380952 0 512 0z m0 926.47619c-229.180952 0-414.47619-185.295238-414.47619-414.47619S282.819048 97.52381 512 97.52381s414.47619 185.295238 414.47619 414.47619-185.295238 414.47619-414.47619 414.47619z" fill="#3190e8" p-id="1602"></path><path d="M704.609524 475.428571h-390.095238c-26.819048 0-48.761905 21.942857-48.761905 48.761905s21.942857 48.761905 48.761905 48.761905h390.095238c26.819048 0 48.761905-21.942857 48.761905-48.761905s-21.942857-48.761905-48.761905-48.761905z" fill="#3190e8" p-id="1603"></path></svg>
      </transition>
      <transition name="fade">
        <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
      </transition>
      <span class="show_chooseList" @click="showChooseList(foods)">选规格</span>
    </section>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return {
      showMoveDot:[]
    }
  },
  computed:{
    ...mapState(['cartList']),
    shopCart: function (){
      return Object.assign({},this.cartList[this.shopId]);
    },
    foodNum(){
      let category_id  =this.foods.category_id;
      let item_id = this.foods.item_id;
      if(this.shopCart&&this.shopCart[category_id]&&this.shopCart[category_id][item_id]){
        let num = 0;
        Object.values(this.shopCart[category_id][item_id]).forEach((item,index)=>{
          num += item.num;
        })
        return num;
      }else{
        return 0;
      }
    }
  },
  mounted(){
  },
  props:['foods','shopId'],
  methods:{
    ...mapMutations(['ADD_CART','REDUCE_CART']),
    removeCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock){
      if(this.foodNum>0){
        this.REDUCE_CART({shopId:this.shopId,category_id, item_id, food_id,name, price, specs, packing_fee, sku_id, stock})
      }
    },
    addCart(category_id,item_id,food_id,name,price,specs,packing_fee,sku_id,stock,event){
    this.ADD_CART({shopId:this.shopId,category_id,item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
    },
    showChooseList(foodScroll){
      this.$emit('showChooseList',foodScroll)
    },
    showReduceTip(){
      this.$emit('showReduceTip')
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'style/mixin';
    .cart_button{
      display: flex;
      align-items: center;
      justify-content: center;
      .cart_guige{
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cart_remove{
        width: 19px;
        height: 19px;
      }
      .cart_add{
        width: 21px;
        height: 21px;
      }
      .cart_num{
        min-width: 1rem;
        text-align: center;
      }
    }
    .cart_guige{
      display: flex;
      align-items: center;
      .icon_reduce{
        width: 19px;
        height: 19px;
      }
      .cart_num{
        min-width: 1rem;
        text-align: center;
      }
      .show_chooseList{
        background-color: #3190e8;
        border-radius: .2rem;
        border: 1px solid #3190e8;
        color: #fff;
        display: block;
        font-size: .5rem;
        padding: .2rem .3rem;
      }

    }

    .showReduce-enter-active, .showReduce-leave-active {
        transition: all .3s ease-out;
    }
    .showReduce-enter, .showReduce-leave-active {
        opacity: 0;
        transform: translateX(1rem);
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .3s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .fadeBounce-enter-active, .fadeBounce-leave-active {
        transition: all .3s;
    }
    .fadeBounce-enter, .fadeBounce-leave-active {
        opacity: 0;
        transform: scale(.7);
    }

</style>
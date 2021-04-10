<template>
<div>
<section v-if="!showLoading" class="shop_container">
  <nav class="goback" @click="goback">
    <svg t="1616141346654" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2108" width="128" height="128"><path d="M778.671 926.323a56.811 56.811 0 1 1-80.33 80.331L243.85 552.165a56.811 56.811 0 0 1 0-80.33l454.49-454.49a56.811 56.811 0 1 1 80.33 80.331L364.348 512 778.67 926.323z" p-id="2109" fill="#ffffff"></path></svg>
  </nav>
  <header class="shop_detail_container">
    <div class="header_overflow">
      <img :src="imgBaseUrl + shopDetailData.image_path " alt="">
    </div>
    <div class="shop_header">
    <router-link class="header_link" tag="a" to="/shop/shopDetail">
      <div   class="header_left">
        <img :src="imgBaseUrl + shopDetailData.image_path " alt="">
      </div>          
      <div class="header_right">
        <h4 class="right_h4">{{shopDetailData.name}}</h4>
        <p class="right_service">商家配送/{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}</p>
        <p class="description_promotion ellipsis">公告：{{shopDetailData.promotion_info}}</p>
      </div>
      <svg t="1616639507392" class="icon icon_arrow" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2008" width="128" height="128"><path d="M793.61 515.719L291.36 13.45l-60.97 62.59 440.149 439.096-440.149 441.75 60.975 61.103z" fill="#ffffff" p-id="2009"></path></svg>
    </router-link>
    <footer v-if="shopDetailData.activities.length"  class="shop_footer" @click="isShowactivities">
      <p class="ellipsis">
        <span class="tip_icon" :style="{backgroundColor:'#'+shopDetailData.activities[0].icon_color,borderColor:'#'+shopDetailData.activities[0].icon_color}">{{shopDetailData.activities[0].icon_name}}</span>
        <span> {{shopDetailData.activities[0].description}}（APP专享）</span>
      </p>
      <p>{{shopDetailData.activities.length}}个活动
      <svg t="1616639507392" class="icon icon_arrow" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2008" width="128" height="128"><path d="M793.61 515.719L291.36 13.45l-60.97 62.59 440.149 439.096-440.149 441.75 60.975 61.103z" fill="#ffffff" p-id="2009"></path></svg></p>
    </footer>      
    </div>
  </header>
  <transition name="fade">
    <section class="activities_details" v-if="showActivies">
      <h3 class="activities_name">{{shopDetailData.name}}</h3>
      <p class="activities_ratingstar">
        <rating-star :rating="shopDetailData.rating"></rating-star>
      </p>
      <section class="activites_list">
        <header class="activities_title_style">
          <span>优惠信息</span>
        </header>
        <ul>
          <li class="activities_li" v-for="item in shopDetailData.activities" :key="item.id">
            <span class="activities_icon" :style="{backgroundColor:'#'+item.icon_color,borderColor:'#'+item.icon_color}">
              {{item.icon_name}}</span>
            <span> {{item.description}}（APP专享）</span>
          </li>
        </ul>
      </section>
      <section class="activites_list">
        <header class="activities_title_style">
          <span>商家公告</span>
        </header>
        <p>{{shopDetailData.promotion_info}}</p>      
        <svg t="1617108304256" @click="isShowactivities" class="icon icon_close" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2022" width="128" height="128"><path d="M512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z m0-975.36C257.024 48.64 48.64 257.024 48.64 512c0 254.976 207.872 463.36 463.36 463.36S975.36 767.488 975.36 512 766.976 48.64 512 48.64z" fill="#dbdbdb" p-id="2023"></path><path d="M548.864 512l195.072-195.072c9.728-9.728 9.728-25.6 0-36.864l-1.536-1.536c-9.728-9.728-25.6-9.728-35.328 0L512 475.136 316.928 280.064c-9.728-9.728-25.6-9.728-35.328 0l-1.536 1.536c-9.728 9.728-9.728 25.6 0 36.864L475.136 512 280.064 707.072c-9.728 9.728-9.728 25.6 0 36.864l1.536 1.536c9.728 9.728 25.6 9.728 35.328 0L512 548.864l195.072 195.072c9.728 9.728 25.6 9.728 35.328 0l1.536-1.536c9.728-9.728 9.728-25.6 0-36.864L548.864 512z" fill="#dbdbdb" p-id="2024"></path></svg>
      </section>

    </section>
  </transition>
  <section class="change_show_type">
    <div>
      <span :class="{activity_show:ChangeShowType =='food'}" @click="ChangeShowType='food'">商品</span>
    </div>
    <div>
      <span :class="{activity_show:ChangeShowType =='rating'}" @click="ChangeShowType='rating'">评价</span>
    </div>
  </section>
  <transition name="fade">
    <section v-show="ChangeShowType == 'food'" class="food_container">
      <section class="menu_container">
        <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
          <ul>
            <li v-for="(item,index) in foodSort" class="menu_left_li" :class="{activity_menu:index == menuIndex}" @click="chooseMenu(index)" :key="index">
              <img v-if="item.icon_url" :src="icon_url" alt="">
              <span>{{item.name}}</span>
              <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
            </li>
          </ul>
        </section>
        <section class="menu_right" id="wrapper_menu" ref="menuFoodsList">
          <ul>
            <li v-for="(item,index) in foodSort" :key="index">
              <header class="menu_header">
                <section class="menu_header_left">
                  <strong class="menu_item_title">{{item.name}}</strong>
                  <span class="menu_item_description">{{item.description}}</span>
                </section>
                <span class="menu_header_right" @click="showTitleDetail(index)">...</span>
                <p class="description_tip" v-if="index == TitleDetailIndex">
                  <span>{{item.name}}</span>
                  {{item.description}}
                </p>
              </header>
              <section class="menu_detail_list" v-for="(foods,foodindex) in item.foods" :key="foodindex">
                <router-link :to="{path:'shop/foodDetail',query:{image_path:foods.image_path,description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}" class="menu_detail_link" tag="div">
                  <section class="menu_food_img">
                    <img :src="imgBaseUrl + foods.image_path" alt="">
                  </section>
                  <section class="menu_food_description">
                    <h3 class="food_description_head">
                      <strong class="description_foodname">{{foods.name}}</strong>
                      <ul v-if="foods.attributes.length" class="attributes_ul">
                        <template v-for="(attribute, foodindex) in foods.attributes">
                          <li v-if="attribute" :key="foodindex" :style="{color:'#'+attribute.icon_color,borderColor:'#'+attribute.icon_color}" :class="{attributes_new:attribute.icon_name == '新'}" >
                            <p :style="{color:attribute.icon_name == '新'?'#fff':'#' + attribute.icon_color}">{{attribute.icon_name == '新'? '新品':attribute.icon_name}}</p>
                          </li>
                        </template>
                      </ul>
                    </h3>
                    <p class="food_description_content">{{foods.description}}</p>
                    <p class="foods_description_rate">
                    <span>月售{{foods.month_sales}}份 </span>
                    <span>好评率{{foods.satisfy_rate}}%</span>
                    </p>
                    <p v-if="foods.activity" class="food_activity">
                      <span :style="{color:'#'+foods.activity.image_text_color,borderColor:'#'+foods.activity.icon_color }">{{foods.activity.image_text}}</span>
                    </p>
                  </section>
                </router-link>
                <footer class="menu_detail_footer">
                  <section class="food_price">
                    <span>💴</span>
                    <span>{{foods.specfoods[0].price}}</span>
                    <span v-if="foods.specifications.length">起</span>
                  </section>
                  <section>
                    <!-- 按钮和规格 -->
                    <buy-cart :shopId='shopId' :foods="foods" @showChooseList="showChooseList" @showReduceTip="showReduceTip"></buy-cart>                    
                  </section>
                </footer>
              </section>
            </li>
          </ul>
        </section>
      </section>
      <div class="buy_cart_container">
        <div class="cart_icon" :class="totalPrice>0?'cart_active':''" @click="toggleCartList">
          <svg t="1617108866054" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2062" width="128" height="128"><path d="M317.952 311.808l61.44 293.376 480.768-13.312 38.4-274.432z" fill="#ffffff" p-id="2063"></path><path d="M901.12 250.88L266.752 244.736l-25.088-118.784c-3.584-15.872-17.408-27.136-33.792-26.624l-80.384 3.072c-18.432 0.512-33.28 15.872-32.256 34.304 0.512 18.432 15.872 32.768 34.304 32.256l52.224-1.536 98.304 460.288 4.096 18.432c0 0.512 0 0.512 0.512 1.024l19.456 91.648c-43.52 11.776-75.776 51.2-75.776 98.304 0 56.32 45.568 101.888 101.888 101.888 56.32 0 101.888-45.568 101.888-101.888 0-12.288-2.56-24.064-6.144-35.328l262.656-0.512c-4.096 11.264-6.656 23.04-6.656 35.84 0 56.32 45.568 101.888 101.888 101.888 56.32 0 101.888-45.568 101.888-101.888 0-41.472-16.896-65.536-31.232-77.824-15.36-13.312-35.328-21.504-58.368-23.552-3.072-1.024-6.144-1.024-9.216-1.024l-416.768 0.512-13.312-63.488 496.64-13.824c16.384-0.512 30.208-12.8 32.256-28.672l47.104-339.968c0-1.536 0.512-3.072 0.512-4.096 1.024-18.944-13.824-34.304-32.256-34.304zM330.24 872.448c-19.456 0-35.328-15.872-35.328-35.328s15.872-35.328 35.328-35.328c19.456 0 35.328 15.872 35.328 35.328 0 19.456-15.872 35.328-35.328 35.328z m454.144 0c-19.456 0-35.328-15.872-35.328-35.328 0-19.456 15.872-35.328 35.328-35.328 29.184 0 35.328 13.312 35.328 35.328 0 19.968-15.872 35.328-35.328 35.328z m39.936-280.576l-480.768 13.312-61.44-293.376L862.72 317.44l-38.4 274.432z" fill="#ffffff" p-id="2064"></path></svg>
        </div>
        <div class="cart_num" >
          <div class="totalPrice">{{totalPrice}}</div>
          <div class="deliveryFee">配送费¥{{deliveryFee}}</div>
        </div>
        <div class="cart_sum" :class="minGo<=0?'jiesuan':''">
          <span v-if="minGo>0">还差{{minGo}}起送</span> 
          <span v-else>立即结算</span>
        </div>
      </div>
      <!-- 弹出遮罩层 -->
      <transition name="fade">
        <div @click="showChooseList" v-if="showSpecs" class="specs_cover">
        </div>
      </transition>
      <!-- 弹出规格 -->
      <transition name="fadeBounce">
        <div v-if="showSpecs" class="specs_list">
          <header>
            <h4 class="specs_name">{{chooseFoods.name}}</h4>
            <svg @click="showChooseList" t="1617262658537" class="icon specs_close" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2089" width="128" height="128"><path d="M217.82708 851.418089m-22.627417-22.627417l0 0q-22.627417-22.627417 0-45.254834l588.312842-588.312842q22.627417-22.627417 45.254834 0l0 0q22.627417 22.627417 0 45.254834l-588.312842 588.312842q-22.627417 22.627417-45.254834 0Z" fill="#026BFF" p-id="2090"></path><path d="M172.572246 217.850413m22.627417-22.627417l0 0q22.627417-22.627417 45.254834 0l588.312842 588.312842q22.627417 22.627417 0 45.254834l0 0q-22.627417 22.627417-45.254834 0l-588.312842-588.312842q-22.627417-22.627417 0-45.254834Z" fill="#026BFF" p-id="2091"></path></svg>
          </header>
          <section class="specs_detail">
            <h5>{{chooseFoods.specifications[0].name}}</h5>
            <ul>
              <li v-for="(item,index) in chooseFoods.specifications[0].values" :key="index" class="specs_li" :class="{specs_active:index == specsIndex}" @click="choosespecs(index)">{{item}}</li>
            </ul>
          </section>
          <footer class="specs_footer">
            <div class="specs_price">
              <span>$</span>
              <span>{{chooseFoods.specfoods[specsIndex].price}}</span>
            </div>
            <div class="specs_addCart" @click="addSpecs(chooseFoods.category_id, chooseFoods.item_id, chooseFoods.specfoods[specsIndex].food_id, chooseFoods.specfoods[specsIndex].name, chooseFoods.specfoods[specsIndex].price, chooseFoods.specifications[0].values[specsIndex], chooseFoods.specfoods[specsIndex].packing_fee, chooseFoods.specfoods[specsIndex].sku_id, chooseFoods.specfoods[specsIndex].stock)">
              加入购物车
            </div>
          </footer>
        </div>
      </transition>
      <!-- 弹出警告 -->
      <transition name="fade">
        <div v-if="isShowTip" class="ReduceTip">多规格商品只能从购物车里删除噢</div>
      </transition>
      <!-- 购物车遮罩层 -->
      <transition name="fade">
        <div v-show="showCartList&&cartFoodList.length" class="cart_cover" @click="toggleCartList"></div>
      </transition>
      <!-- 购物车上滑 -->
      <transition name="toggle-cart">
        <section class="cart_food_list" v-show="showCartList&&cartFoodList.length">
          <header>
            <h4>购物车</h4>
            <div @click="clearCart">
              <span class="clear_cart">清空</span>
            </div>
          </header>
          <section class="cart_food_details">
            <ul>
              <li class="cart_food_li" v-for="(item,index) in cartFoodList" :key="index">
                <div class="cart_list_name">
                  <p class="ellipsis">{{item.name}}</p>
                  <p class="ellipsis">{{item.specs}}</p>
                </div>
                <div class="cart_list_price">💴{{item.price}}</div>
                <section class="cart_list_control">
                  <svg t="1617285042701" @click="removeCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)" class="icon cart_add" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1601" width="128" height="128"><path d="M512 0C229.180952 0 0 229.180952 0 512s229.180952 512 512 512 512-229.180952 512-512S792.380952 0 512 0z m0 926.47619c-229.180952 0-414.47619-185.295238-414.47619-414.47619S282.819048 97.52381 512 97.52381s414.47619 185.295238 414.47619 414.47619-185.295238 414.47619-414.47619 414.47619z" fill="#3190e8" p-id="1602"></path><path d="M704.609524 475.428571h-390.095238c-26.819048 0-48.761905 21.942857-48.761905 48.761905s21.942857 48.761905 48.761905 48.761905h390.095238c26.819048 0 48.761905-21.942857 48.761905-48.761905s-21.942857-48.761905-48.761905-48.761905z" fill="#3190e8" p-id="1603"></path></svg>
                  <span class="cart_num">{{item.num}}</span>
                  <svg t="1617346709654" class="cart_remove" @click="addCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8852" width="128" height="128"><path d="M511.41 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#3190e8" p-id="8853" data-spm-anchor-id="a313x.7781069.0.i20" class="selected"></path><path d="M778.08 565.33H564.75v213.33c0 29.33-24 53.33-53.33 53.33s-53.33-24-53.33-53.33V565.33H244.75c-29.33 0-53.33-24-53.33-53.33s24-53.33 53.33-53.33h213.33V245.33c0-29.33 24-53.33 53.33-53.33s53.33 24 53.33 53.33v213.33h213.33c29.33 0 53.33 24 53.33 53.33 0.01 29.34-23.99 53.34-53.32 53.34z" fill="#FFFFFF" p-id="8854"></path></svg>
                </section>
              </li>
            </ul>
          </section>
        </section>
      </transition>
      <!-- 加载 -->
      <loading class="loading" v-show="showLoading"></loading>
    </section>
  </transition>
  <transition name="fade">
    <section v-show="ChangeShowType == 'rating'" class="rating_container" >
      <header class="rating_header">
        <section class="rating_left">
          <p>{{shopDetailData.rating}}</p>
          <p>综合评价</p>
          <p>高于周边商家{{(ratingScoresData.compare_rating*100).toFixed(1)}}%</p>
        </section>
        <section class="rating_right">
          <p>服务态度 <rating-star class="rating_star" :rating='ratingScoresData.service_score'></rating-star><span class="rating_num">{{ratingScoresData.service_score.toFixed(1)}}</span></p>
          <p>菜品评价 <rating-star class="rating_star"  :rating='ratingScoresData.service_score' ></rating-star><span class="rating_num">{{ratingScoresData.food_score.toFixed(1)}}</span></p>
          <p>送达时间 {{shopDetailData.order_lead_time}}分钟</p>
        </section>

      </header>        
      <ul class="tag_list_ul">
        <li v-for="(item,index) in ratingTagsList" :key="index" :class="{unsatisfied:item.unsatisfied,tag_active:ratingTagIndex == index}" @click="isratingTagIndex(index)">{{item.name}}({{item.count}})</li>
      </ul>
      <ul class="rating_list_ul">
        <li class="rating_list_li" v-for="(item,index) in ratingList" :key="index">
          <img class="user_avater" v-if="item.avatar" src="imgBaseUrl + item.avater" alt="">
          <svg v-else t="1617526046216" class="user_avater" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1500" width="128" height="128"><path d="M956.696128 512.75827c0 245.270123-199.054545 444.137403-444.615287 444.137403-245.538229 0-444.522166-198.868303-444.522166-444.137403 0-188.264804 117.181863-349.108073 282.675034-413.747255 50.002834-20.171412 104.631012-31.311123 161.858388-31.311123 57.297984 0 111.87909 11.128455 161.928996 31.311123C839.504032 163.650197 956.696128 324.494489 956.696128 512.75827L956.696128 512.75827M341.214289 419.091984c0 74.846662 38.349423 139.64855 94.097098 171.367973 23.119557 13.155624 49.151443 20.742417 76.769454 20.742417 26.64894 0 51.773154-7.096628 74.286913-19.355837 57.06467-31.113625 96.650247-96.707552 96.650247-172.742273 0-105.867166-76.664054-192.039781-170.936137-192.039781C417.867086 227.053226 341.214289 313.226864 341.214289 419.091984L341.214289 419.091984M513.886977 928.114163c129.883139 0 245.746984-59.732429 321.688583-153.211451-8.971325-73.739445-80.824817-136.51314-182.517917-167.825286-38.407752 34.55091-87.478354 55.340399-140.989081 55.340399-54.698786 0-104.770182-21.907962-143.55144-57.96211-98.921987 28.234041-171.379229 85.823668-188.368158 154.831344C255.507278 861.657588 376.965537 928.114163 513.886977 928.114163L513.886977 928.114163M513.886977 928.114163 513.886977 928.114163z" p-id="1501" fill="#1296db"></path></svg>
          <section class="rating_list_details">
            <div class="details_infor">
              <span>{{item.username}}</span>
              <span>{{item.rated_at}}</span>
            </div>
            <div class="rating_list_num">
              <span class="num_star"><rating-star :rating="item.rating_star"></rating-star></span>
              <span class="time_spent_desc">{{item.time_spent_desc}}</span>
            </div>
            <ul class="food_img_ul">
              <li v-for="(item,index) in item.item_ratings" :key="index">
                <img :src="getImgPath(item.image_hash)" alt="">
              </li>
            </ul>
            <ul class="food_tag_ul">
              <li v-for="(item,index) in item.item_ratings" :key="index" class="ellipsis">{{item.food_name}}</li>
            </ul>
          </section>

        </li>
      </ul>
    </section>
  </transition>
</section>
<section>
  
</section>
  <transition name="router-slid" mode="out-in">
      <router-view></router-view>
  </transition>
</div>
</template>

<script>
import {shopDetails,foodSort,msiteAddress,getRatingList,ratingScores,ratingTags} from 'network/getDate'
import {mapState,mapMutations} from 'vuex'
import loading from 'components/common/loading'
import buyCart from 'components/common/buyCart'
import ratingStar from 'components/common/ratingStar'
import BScroll from 'better-scroll'
import {getImgPath} from 'components/common/mixin.js'
export default {
  components: { ratingStar,buyCart,loading },
  mixins:[getImgPath],
data(){
return {
  geohash:'',
  shopId:null,
  shopDetailData:null,
  ChangeShowType:'food', /* 切换标签 */
  imgBaseUrl:'//elm.cangdu.org/img/',  /* img服务器url */
  showLoading:true,
  foodSort:[],
  menuIndex:0,
  menuindexChange:true,
  TitleDetailIndex:null,
  foodScroll:null,
  shopListTop:[], /* 商品列表高度集合 */
  showActivies:false,
  totalPrice:0,
  cartFoodList:[],
  showSpecs:false,
  chooseFoods:null,
  specsIndex:0,
  isShowTip:false,
  showCartList:false,
  ratingScoresData:null,
  ratingList:null,
  ratingOffset:0,
  ratingTagsList:null,
  ratingTagIndex:0,
  categoryNum:[] //右上角的数量
}
},
created(){
this.geohash = this.$route.query.geohash;
this.shopId = this.$route.query.id;
this.INIT_CART();
},
mounted(){
this.initData();
},
computed:{
  ...mapState([
  'latitude','longitude','cartList'
  ]),
  shopCart: function (){
    return {...this.cartList[this.shopId]};
  },
  deliveryFee:function(){
    if(this.shopDetailData){
      return this.shopDetailData.float_delivery_fee;
    }else{
      return null;
    }
  },
  minGo:function(){
    if(this.shopDetailData){
      return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
    }else{
      return null;
    }
  }
},
methods:{
  ...mapMutations(['ADD_CART','CLEAR_CART','INIT_CART','REDUCE_CART','RECORD_ADDRESS','RECORD_SHOPDETAIL']),
  async initData(){ /* 初始化*/
  if(!this.latitude){
    msiteAddress(this.geohash).then(res=>{
      this.RECORD_ADDRESS(res.data);
    })
    }
    /* 这里需要优化 */
    let shopDetail = await shopDetails(this.shopId,this.latitude,this.longitude);
    this.shopDetailData = shopDetail.data;
    let foodSor = await foodSort(this.shopId);
    this.foodSort = foodSor.data
    console.log(this.foodSort);
    this.RECORD_SHOPDETAIL(this.shopDetailData)
    let ratingList2 = await getRatingList(this.shopId, this.ratingOffset);
    this.ratingList = ratingList2.data;
    console.log(this.ratingList);
    let ratingScoresData2 = await ratingScores(this.shopId);
    this.ratingScoresData = ratingScoresData2.data;
    let ratingtag = await ratingTags(this.shopId);
    this.ratingTagsList = ratingtag.data;
    this.hideLoading();
    console.log('DOM渲染完成');
},
  hideLoading(){
      this.showLoading = false;
  },
  /* 得到每个食物类别的高度 */
  getFoodListHeight(){
    const listContainer = this.$refs.menuFoodsList;
    if(listContainer){
      const listArr = Array.from(listContainer.children[0].children);
      listArr.forEach((item,index)=>{
        this.shopListTop[index] = item.offsetTop;
      });
      console.log(listArr);
      this.listenScroll(listContainer)
    }
  },
/* 监听滚动事件 */
  listenScroll(element){
    this.foodScroll = new BScroll(element,{
      probeType: 3,
      deceleration: 0.001,
      bounce: false,
      swipeTime: 2000,
      click: true,
    })
    const wrapperMenu = new BScroll('#wrapper_menu', {
        click: true,
    });
    const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
    this.foodScroll.on('scroll',(pos)=>{
      if(!this.$refs.wrapperMenu){
        return
      }
      this.shopListTop.forEach((item,index) => {
        if(this.menuindexChange && Math.abs(Math.round(pos.y)) >= item){
          this.menuIndex = index;
          const menuList = this.$refs.wrapperMenu.querySelectorAll('.activity_menu');
          const el = menuList[0];
          wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight/2 - 50));
        }
      })
    })
  },
  goback(){
    this.$router.go(-1);
  },
  chooseMenu(index){
    this.menuIndex = index;
    this.menuindexChange  =false;
    this.foodScroll.scrollTo(0,-this.shopListTop[index],400);
    this.foodScroll.on('scrollEnd',()=>{
    this.menuindexChange = true;
    })
  },
  isShowactivities(){
    this.showActivies = !this.showActivies;
  },
  showTitleDetail(index){
    if(this.TitleDetailIndex == index){
      this.TitleDetailIndex = null;
      console.log(this.TitleDetailIndex);
    }else{
    this.TitleDetailIndex = index;        
    }
  },
  /* 初始化购物车 */
  initCategoryNum(){
    let newArr = [];
    let cartFoodNum = 0;
    this.totalPrice = 0;
    this.cartFoodList = [];
    console.log('1');
    this.foodSort.forEach((item,index)=>{
      if(this.shopCart&&this.shopCart[item.foods[0].category_id]){
        let num = 0;
        Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid=>{
          Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid =>{
            let foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid];
            num += foodItem.num;
            if(item.type ==1){
              this.totalPrice += foodItem.num*foodItem.price;
              console.log(this.totalPrice);
              if(foodItem.num > 0){
                this.cartFoodList[cartFoodNum] = {};
                this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id;
                this.cartFoodList[cartFoodNum].item_id = itemid;
                this.cartFoodList[cartFoodNum].food_id = foodid;
                this.cartFoodList[cartFoodNum].num = foodItem.num;
                this.cartFoodList[cartFoodNum].price = foodItem.price;
                this.cartFoodList[cartFoodNum].name = foodItem.name;
                this.cartFoodList[cartFoodNum].specs = foodItem.specs;
                cartFoodNum++;
              }
            }
          })
        })
        newArr[index] = num; /* 组类别 */
      }else{
        newArr[index] = 0;
      }
    })
    this.totalPrice = this.totalPrice.toFixed(2);
    this.categoryNum = [...newArr];
  },
  showChooseList(foods){
    console.log(foods);
    if(foods){
      this.chooseFoods = foods;
    }
      this.showSpecs = !this.showSpecs;
      this.specsIndex = 0;
    
  },
  choosespecs(index){
    this.specsIndex = index;
  },
  addSpecs(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock){
    this.ADD_CART({shopId:this.shopId,category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
    this.showChooseList();
  },
  showReduceTip(){
    this.isShowTip =true;
    var timer = setTimeout(()=>{
      this.isShowTip =false;
      clearTimeout(timer)
    },2000)
  },
  toggleCartList(){
    console.log('123');
    console.log(this.cartFoodList.length);
    this.cartFoodList.length ? this.showCartList = !this.showCartList : true;
  },
  clearCart(){
    this.toggleCartList();
    this.CLEAR_CART(this.shopId);

  },
  /* 添加购物车某商品的数量 */
  addCart(category_id, item_id, food_id, name, price, specs){
    this.ADD_CART({shopId:this.shopId,category_id, item_id, food_id, name, price, specs});
  },
  /* 删除购物车某商品的数量 */
  removeCart(category_id, item_id, food_id, name, price, specs){
        this.REDUCE_CART({shopId: this.shopId, category_id, item_id, food_id, name, price, specs});
  },
  isratingTagIndex(index){
    this.ratingTagIndex = index;
  }
},
watch:{/* 监听事件函数 */
  showLoading: function (value){
      console.log('123');
      if (!value) {
          this.$nextTick(() => {
              this.getFoodListHeight();
              this.initCategoryNum();
          })
      }
  },
  shopCart: function (value){
      this.initCategoryNum();
  },
}
}
</script>

<style lang="scss" scoped>
@import 'style/mixin';
body,html{
  width: 100%;
  height: 100;
}
.goback{
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 2rem;
z-index:12;
padding-top: .3rem;
padding-left: .3rem;
}
.shop_container{
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.shop_detail_container{
  position:relative;
  z-index: 11;
  .header_left{
    margin-right: .4rem;
  }
  .header_left img{
  width: 4.5rem;
  height: 4.5rem;
  border-radius: .5rem;
  } 
  .header_overflow{
  position: absolute;
  z-index:-1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img{
    width: 100%;
    filter: blur(7px);
  }
  }  
  .shop_header{
    padding: .7rem .6rem;  
    z-index: 11;
    background-color: rgba(119,103,137,.38);
  }
  .header_link{
  display: flex;

  .icon_arrow{
    position: absolute;
    width: 15px;
    height: 15px;
    top: 45%;
    right: .6rem;
  }
  }
  .header_right{
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    .right_h4{
      font-weight: bold;
      color: #fff;
    }
    .right_service{
      font-size: 10px;
      color: #fff;
    }
    .description_promotion{
      font-size: 13px;
      color: #fff;
      width: 16.1rem;
    }
  }
  .shop_footer{
    padding-top: .3rem;
    @include fj;
    align-items: center;
    p:nth-of-type(2){
      @include sc(.7rem,#fff);
    }
    .ellipsis span{
      @include sc(.7rem,#fff);
      padding: .1rem;
    }
    .icon_arrow{
      @include wh(.55rem,.55rem)
    }

  }
  .ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.goback svg{
width: 20px;
height: 20px;
}
.change_show_type{
display: flex;
background-color: #fff;
padding: .8rem .5rem;
border-bottom: 1px solid #ebebeb;
text-align: center;
div{
  flex: 1;
  span{
    font-size: 1rem;
  }
  .activity_show{
    border-bottom: 1px solid #3190e8;
    color: #3190e8;
  }
}
}
.food_container{
  display: -webkit-flex;
  display: flex;
  -webkit-flex: 1;
  flex: 1;
  padding-bottom: 3rem;
  overflow: hidden;
.menu_container{
display:flex;
flex: 1;
overflow: hidden;
position: relative;
.menu_left{
  width: 5rem;
  .menu_left_li{
    padding: 1.2rem .5rem;
    font-size: 14px;
    border-left: .15rem solid #F5F5F5;
    span{
      color: #666;
    }
  }
  .activity_menu{
  border-left: .15rem solid #3190e8;
  background-color: #fff;
  span{
    font-weight: 600;
  }
  }      
}
.menu_right{
  flex: 4;
  overflow-y: auto;
  overflow-x: hidden;
  .menu_header{
    width: 100%;
    @include fj;
    align-items: center;
    justify-content: space-between;
    padding: .7rem;
    position: relative;
    .menu_header_left{
      width: 11rem;
      white-space: nowrap;
      overflow: hidden;
        .menu_item_title{
          @include sc(1rem,#666);
          font-weight: bold;
        }
        .menu_item_description{
          @include sc(.6rem,rgb(165, 165, 165));
          width: 30%;
        }
    }
      .description_tip{
      position: absolute;
      background-color: #666;
      opacity: .9;
      @include sc(.5rem,#fff);
      top:3rem;
      z-index: 14;
      width: 10rem;
      right: .3rem;
      padding: .5rem .4rem;
      border: 1px;
      border-radius: .2rem;
      span{
        color: #fff;
        line-height: .6rem;
        font-size: .6rem;
      }
      }
  }
  .menu_detail_list{
    background-color: #fff;
    position: relative; 
    padding: .8rem .6rem; 
    border-bottom: 1px solid rgb(182, 182, 182);
    overflow: hidden;
    .menu_detail_link{
      display: flex;
      .menu_food_img{
        margin-right: .4rem;
        img{
          @include wh(3rem,3rem);
          display: block;
        }
      }
      .menu_food_description{
        width: 100%;
        .food_description_head{
          display: flex;
          @include fj;
          margin-bottom: .2rem;
          .description_foodname{
            @include sc(1rem,#333);
            font-weight: bold;
          }
          .attributes_ul{
            display: flex;
            li{
              font-size: .3rem;
              border: 1px solid #666;
              padding: .1rem;
              border-radius: .5rem;
              transform: scale(.8);
              margin-right: .5rem;
            }
            p{
              white-space: nowrap;
            } 
            .attributes_new{
            position: absolute;
            @include wh(3rem,3rem);
            @include fj;
            align-items: flex-end;
            top: 0;
            left: 0;
            z-index: 8;
            background-color: #4cd964;
            transform: rotate(-45deg) translate(0rem, -2.2rem);
            border-radius: 0;
            border: 0;
            p{
              flex: 1;
              transform: scale(.8);
              text-align: center;
            }
          }
          }
        }
        .food_description_content{
          @include sc(.4rem,rgb(182, 178, 178))
        }
        .foods_description_rate{
          @include sc(.4rem,#666)
        }
        .food_activity{
          span{
            font-size:.2rem;
            border:1px solid red;
            padding: .1rem;
            border-radius: .5rem;
            display: inline-block;
            transform: scale(.8);
            margin-left:-.3rem;
          }
        }
      }
    }    
    .menu_detail_footer{
      @include fj;
      justify-content: space-between;
      margin-left: 3.4rem;
      .food_price{
        span{
          font-family: 'Helvetica Neue',Tahoma,Arial;
        }
        span:nth-of-type(1){
          font-size: .2rem;
        }
        span:nth-of-type(2){
          @include sc(1rem,red);
          font-weight: bold;
          margin-right: .2rem;
        }
        span:nth-of-type(3){
          font-size: .3rem;
        }
        
      }
    }
  }
  .food_activity span{
    border: 1px solid;
    border-radius: .5rem;
  }

}  

}
.buy_cart_container{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  background-color: #3d3d3f;
  z-index: 13;
  .cart_icon{
    border: 0.24rem solid #444;
    display: flex;
    border-radius: 50%;
    padding: 8px;
    position: absolute;
    top:-.8rem;
    left: .8rem;
    background-color: #3d3d3f;
    .icon{
      width: 33px;
      height: 33px;
    }
  }
  .cart_active{
    background-color: #3190e8;
  }
  .cart_num{
    position: absolute;
    left: 5rem;
    div{
          color: #fff;
    }
    .totalPrice{
      font-weight: bold;
      font-size: 1.1rem;
    }
    .deliveryFee{
      font-size: .8rem;
    }
  }
  .cart_sum{
    position: absolute;
    right: 0;
    background-color: #535356;
    width: 7rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      @include sc(1rem,#fff);
      font-weight: bold;
    }
  }
  .jiesuan{
    background-color: rgb(73, 192, 3);
  }
}
}
.activities_details{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #262626;
    z-index: 200;
    padding: 2rem;
    .activities_name{
      color: #fff;
      text-align: center;
    }
    .activities_ratingstar{
      text-align: center;
      height:30px;
    }
    .activites_list{
      p{
        @include sc(.5rem,#fff)
      }     
      .icon_close{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 2rem;
        width: 40px;
        height: 40px;
      }
    }
    .activities_title_style{
      text-align: center;
      margin-top:1.5rem;
      margin-bottom: 1rem;
      span{
        border: 1px solid rgba(240, 240, 240, 0.185);
        border-radius: .7rem;
        @include sc(.1rem,#fff);
        padding: .3rem;
      }
 
    }
    .activities_li{
      span{
        @include sc(.5rem,#fff)
      }

    }



}    
  .specs_cover{
    position: fixed;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    background-color: rgba(124, 124, 124, 0.438);
    z-index: 13;
  }
  .specs_list{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 70%;
    background-color: #fff;
    z-index: 14;
    border-radius: 10px;
    .specs_name{
      padding: .5rem;
      text-align: center;
    }
    .specs_close{
      position: absolute;
      top: .5rem;
      right: .5rem;
      width: 22px;
      height: 22px;
    }
    .specs_detail{
      padding: .5rem;
      h5{
        color: #666;
        font-size: 12px;
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        padding: .8rem 0;
      }
      ul .specs_li{
        border: 1px solid #3199e8;
        padding: .3rem .5rem;
        border-radius: 5px;
        color: #3199e8;
        font-size: 10px;
        margin-left: .5rem;
        margin-top: .3rem;
      }
      ul .specs_active{
        background-color: #3199e8;
        color: #fff;
      } 
    }
    .specs_footer{
      background-color: #f9f9f9;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: .8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .specs_price{
        span{
          @include sc(1.1rem,#ff6000);
          font-weight: bold;
        }
      }
      .specs_addCart{
        width: 5.5rem;
        height: 2rem;
        background-color: #3199e8;
        @include sc(.8rem,#fff);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
      }
    }
  }
  .ReduceTip{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 220px;
    height: 30px;
    background-color: rgb(54, 54, 54);
    border-radius: 5px;
    color: #fff;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cart_cover{
    position: fixed;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    background-color: rgba(124, 124, 124, 0.438);
    z-index: 12;
  }
  .cart_food_list{
    position: fixed;
    width: 100%;
    padding-bottom: 48px;
    z-index: 12;
    bottom: 0;
    background-color: #fff;
    header{
      background-color: #eceff1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .8rem .8rem;
    }
    .cart_food_details{
      max-height: 20rem;
      overflow-y: auto;
      .cart_food_li{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem .8rem;
        .cart_list_name{
          width: 55%;
          .ellipsis{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p{
            font-weight: bold;
          color: #666;
          }
        }
        .cart_list_price{
          @include sc(1rem,#f60);
          font-weight: bold;
        }
        .cart_list_control{
          display: flex;
          justify-content: center;
          align-items: center;
          .cart_add{
            width: 18px;
            height: 18px;
          }
          .cart_remove{
            width: 21px;
            height: 21px;
          }
          .cart_num{
            min-width: 1.7rem;
            text-align: center;
          }
        }
      }
    }
  }
  .rating_container{
    .rating_header{
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 1rem 1rem;
      .rating_left{
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 3;
        p{
          &:nth-of-type(1){
            @include sc(1.5rem,#f60);
          }
          &:nth-of-type(2){
            @include sc(.9rem,#666);
            margin-bottom: .2rem;
          }
          &:nth-of-type(3){
            @include sc(.3rem,#999);
            margin-bottom: .2rem;
          }
        }
      }
      .rating_right{
        flex:4;
        p{
          display: flex;
          align-items: center;
          span{
            @include sc(.7rem,#f60);
            margin-left: .3rem;
          }
          &:nth-of-type(1){
            @include sc(.9rem,#666);
            margin-bottom: .1rem;
          }
          &:nth-of-type(2){
            @include sc(.9rem,#666);
            margin-bottom: .1rem;
          }
          &:nth-of-type(3){
            @include sc(.9rem,#666);
            margin-bottom: .1rem;
          }
        }
      }
    }
    .tag_list_ul{
      background-color: #fff;
      margin-top: .7rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: .5rem 1rem;
      li{
        background-color: #ebf5ff;
        border-radius: 0.2rem;
        border: 1px;
        margin: 0 .6rem .2rem 0;
        @include sc(.5rem,#6d7885);
        padding: .4rem;
        border-radius: .2rem;
      }
      .unsatisfied{
        background-color: #f5f5f5;
      }
      .tag_active{
        background-color: #3190e8;
        color: #fff;
      }
    }
    .rating_list_ul{
      background-color: #fff;
      .rating_list_li{
        display: flex;
        border-top: 1px solid #f1f1f1; 
        padding: .5rem 1rem;
        .user_avater{
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
          margin-right: 1rem;
        }
        .rating_list_details{
          display: flex;
          flex-direction: column;
          width: 100%;
          .details_infor{
            display: flex;
            justify-content: space-between;
            span{
              &:nth-of-type(1){
                @include sc(.7rem,#666)
              }
              &:nth-of-type(2){
                @include sc(.7rem,#999)
              }
            }
          }
          .rating_list_num{
            display: flex;
            align-items: center;
            .time_spent_desc{
              @include sc(.6rem,#555);
            }
          }
          .food_img_ul{
            display: flex;
            margin-bottom: .5rem;
            li{
              margin-right: .5rem;
              img{
                width: 4rem;
                height: 4rem;
                display: block;
              }
            }
          }
          .food_tag_ul{
            display: flex;
            li{
              width: 3rem;
              @include sc(.5rem,#999);
              border: 0.025rem solid #ebebeb;
              border-radius: 0.15rem;
              margin-right: .3rem;
              margin-bottom: 4px;
            }
            .ellipsis{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        
      }
    }
  }
  .loading{
    z-index: 999;
  }
  .fade-choose-enter-active, .fade-choose-leave-active {
      transition: opacity .5s;
  }
  .fade-choose-leave, .fade-choose-leave-active {
      display: none;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
  .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
  .toggle-cart-enter-active, .toggle-cart-leave-active {
      transition: all .3s ease-out;
  }
  .toggle-cart-enter, .toggle-cart-leave-active {
      transform: translateY(100%);
  }


</style>
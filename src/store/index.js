import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex)

import {
	getUser
}from 'network/getDate'

import{
	RECORD_ADDRESS, RECORD_USERINFO,GET_USERINFO,SAVE_GEOHASH,ADD_CART,REDUCE_CART,INIT_CART,CLEAR_CART,RECORD_SHOPDETAIL,SAVE_QUESTION,RETSET_NAME
} from './mutation-types.js'
import {setStore,getStore} from 'config/mUtils'

const state = {
  latitude: '', // 当前位置纬度 1
	longitude: '', // 当前位置经度 1
	cartList: {}, // 加入购物车的商品列表
	shopDetail: null, //商家详情信息
	userInfo:null, //用户信息
	shopid: null,//商铺id
	remarkText: null,//可选备注内容
	inputText: '',//输入备注内容
	invoice: false,//开发票
	newAddress: [], //确认订单页新的地址
	searchAddress: null,//搜索并选择的地址
	geohash: '',//地址geohash值
	choosedAddress: null,//选择地址
	addressIndex: null,//选择地址的索引值
	needValidation: null,//确认订单时是否需要验证
	cartId: null, //购物车id
	sig: null,//购物车sig
	orderParam: null,//订单的参数
	orderMessage: null, //订单返回的信息
	orderDetail: null, //订单详情
	login: true,//是否登录
	imgPath:null,//头像地址
	removeAddress:[],//移除地址
	addAddress:'',		//新增地址
	question: null,//问题详情
	cartPrice: null, //会员卡价格
}

const store = new Vuex.Store({
	state,
	/* getters, */
	actions:{
		async getUserInfo({
			commit,state
		}){
			let res = await getUser(); /* getStore中 */
			commit(GET_USERINFO,res)
		},
		/* async saveAddress({
			commit,
			state
		}){
			if(state.removeAddress.length>0) return;
			let address 
		} */
	},
	mutations:{
		/* 记录选中的经纬度 */
		[RECORD_ADDRESS](state,{
			latitude,
			longitude
		}){
			state.latitude = latitude;
			state.longitude = longitude;
		},
		/* 记录用户信息 */
		[RECORD_USERINFO](state,info){
			state.userInfo = info;
			state.login = true;
			setStore('user_id',info.user_id)
		},
		/* 获取用户信息存入vuex */
		[GET_USERINFO](state,info){
			if(state.userInfo && (state.userInfo.username !== info.username)){
				return 
			}
			if(!state.login){
				return
			}
			if(!info.message){ /* ! */
			state.userInfo = {...info.data};
			} else{
				state.userInfo = null;
			}
		},
		[SAVE_GEOHASH](state,geohash){
			state.geohash = geohash
		},
		[ADD_CART](state,{
			shopId,
			category_id,
			item_id,
			food_id,
			name,
			price,
			specs,
			packing_fee,
			sku_id,
			stock
		}){
			let cart = state.cartList;
			console.log(cart);
			/* shopid 店铺id */
			/* category_id 分类id */
			/* item_id 每个食物的id */
			let shop = cart[shopId] = (cart[shopId] || {});
			let category = shop[category_id] = (shop[category_id] || {}); 
			let item = category[item_id] = (category[item_id] || {});
			if(item[food_id]){
				item[food_id]['num']++;
			}else{
				item[food_id] = {
					"num":1,
					"id":food_id,
					"name":name,
					"price":price,
					"specs":specs,
					"packing_free":packing_fee,
					"sku_id":sku_id,
					"stock":stock
				}
			}
			state.cartList = {...cart}; 
			setStore('buyCart',state.cartList) /* 缓存 */
		},
		[REDUCE_CART](state,{
			shopId,
			category_id,
			item_id,
			food_id,
		}){
			let cart = state.cartList;
			let shop = (cart[shopId] || {});
			let category = (shop[category_id] || {});
			let item = (category[item_id] || {});
			if(item&&item[food_id]){
				if(item[food_id]['num']>0){
					item[food_id]['num']--;
					state.cartList = {...cart};
					setStore('buyCart',state.cartList)
				}else{
					item[food_id] = null;
				}
			}
		},
		[INIT_CART](state){
			let initCart = getStore('buyCart');
			if(initCart){
				state.cartList = JSON.parse(initCart)
			}
		},
		[CLEAR_CART](state,shopId){
			state.cartList[shopId] = null;
			state.cartList = {...state.cartList};
			setStore('buyCart',state.cartList)
		},
		[RECORD_SHOPDETAIL](state,shop){
			state.shopDetail = shop;
		},
		[SAVE_QUESTION](state,title){
			state.question = title
		},
		[RETSET_NAME](state,username){
			state.userInfo = Object.assign({},state.userInfo,{username})
		}
		


	}
})

export default store
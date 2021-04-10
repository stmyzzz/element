	import axios from 'axios'
	import {getStore} from 'config/mUtils'
	axios.defaults.baseURL = 'https://elm.cangdu.org'
	axios.defaults.withCredentials=true
	/* import {getStore} from '../config/mUtils'
	*/
	/* 
	获取定位地
	*/
	export const cityGuess = () => axios.get('/v1/cities?type=guess')

	/* 热门城市 */
	export const hotcity = ()=>axios.get('/v1/cities?type=hot');

	/* 首页所有城市 */
	export const groupcity = ()=> axios.get('/v1/cities?type=group')

	export const currentcity = number => axios.get('/v1/cities/' + number);

	export const searchplace = (cityid,value) => axios.get('/v1/pois',{
		params:{
		type:'search',
		city_id: cityid,
		keyword: value,
		}	
	})

	export const msiteAddress = geohash => axios.get('/v2/pois/'+geohash)

	export const msiteFoodsTypes = () => axios.get('/v2/index_entry')

	export const getcode = () => axios.post('/v1/captchas',{credentials: 'include'});

	export const accountLogin = (username, password, captcha_code) => axios.post('/v2/login', {username, password, captcha_code});
	
	/* 可传可不传 就是="" */
	export const shopList = (latitude,longitude,offset,restaurant_category_id='')=>
		/* let supportStr = ''; 
		support_ids.forEach(item => {
			if (item.status) {
				supportStr += '&support_ids[]=' + item.id;
			}
			});
			let data = {
			latitude,
			longitude,
			offset,
			limit: '20',
			'extras[]': 'activities',
			keyword: '',
			restaurant_category_id,
			'restaurant_category_ids[]': restaurant_category_ids,
			order_by,
			'delivery_mode[]': delivery_mode + supportStr
		}; */
		axios.get('/shopping/restaurants', {
			params:{
			latitude:latitude,
			longitude:longitude,
			offset:offset,
			limit:'20',
			restaurant_category_id:restaurant_category_id,	
			}

	});

	export const shopDetails = (shopid, latitude, longitude) => axios.get('/shopping/restaurant/' + shopid, {
		latitude,
		longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
	});

	export const getUser = () => axios.get('/v1/user',{user_id:getStore('user_id')});

	export const foodSort = (restaurant_id) => axios.get('/shopping/v2/menu',{
		params:{
			restaurant_id
		}
	})
	export const getRatingList = (shopid,offset,tag_name="") =>axios.get('/ugc/v2/restaurants/'+shopid+'/ratings',{
		has_content: true,
		offset,
		limit: 10,
		tag_name
	});
	export const ratingScores = shopid => axios.get('/ugc/v2/restaurants/' + shopid + '/ratings/scores')
	export const ratingTags = shopid => axios.get('/ugc/v2/restaurants/' + shopid + '/ratings/tags')

	export const getHongbaoNum = id => axios.get('/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0')

	export const getDated = id => axios.get('/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0')

	export const exChangeHongbao = (id, exchange_code, captcha_code) => axios.post('/v1/users/' + id + '/hongbao/exchange',{
		exchange_code,
		captcha_code,
	})

	export const payRequest = (merchantOrderNo, userId) => axios.get('/payapi/payment/queryOrder', {
		merchantId: 5,
		merchantOrderNo,
		source: 'MOBILE_WAP',
		userId,
		version: '1.0.0',
	});

	export const vipCart = (id, number, password) => axios.post('/member/v1/users/' + id + '/delivery_card/physical_card/bind',{
		number,
		password
	})

	export const getService = () => axios.get('/v3/profile/explain')
  
	export const changePassWord = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => axios.post('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code})


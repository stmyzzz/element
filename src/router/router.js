import App from '../App'

const index = r => require.ensure([],()=>r(require('../views/index/index')),'index')
const city = r => require.ensure([],()=>r(require('../views/city/city')),'city')
const msite = r => require.ensure([],()=>r(require('../views/msite/msite')),'msite')
const login = r => require.ensure([],()=>r(require('../views/login/login')),'login')
const shop = r => require.ensure([],()=>r(require('../views/shop/shop')),'shop')
const profile = r => require.ensure([],()=>r(require('../views/profile/profile')),'profile')
const foodDetail = r =>require.ensure([],()=>r(require('../views/shop/children/foodDetail')),'foodDetail')
const shopDetail = r =>require.ensure([],()=>r(require('../views/shop/children/shopDetail')),'shopDetail')
const shopSafe = r =>require.ensure([],()=>r(require('../views/shop/children/children/shopSafe')))
const balance = r =>require.ensure([],()=>r(require('../views/balance/balance')))
const detail = r =>require.ensure([],()=>r(require('../views/balance/children/detail')))
const benefit = r =>require.ensure([],()=>r(require('../views/benefit/benefit')))
const hbHistory = r =>require.ensure([],()=>r(require('../views/benefit/children/hbHistory')))
const exchange = r =>require.ensure([],()=>r(require('../views/benefit/children/exchange')))
const commend = r =>require.ensure([],()=>r(require('../views/benefit/children/commend')))
const hbdesc = r =>require.ensure([],()=>r(require('../views/benefit/children/hbDesc')))
const points = r =>require.ensure([],()=>r(require('../views/points/points')),'points')
const detail2 = r =>require.ensure([],()=>r(require('../views/points/children/detail')))
const order = r =>require.ensure([],()=>r(require('../views/order/order')))
const search = r =>require.ensure([],()=>r(require('../views/search/search')))
const vipcard = r =>require.ensure([],()=>r(require('../views/vipcard/vipcard')),'vipcard')
const vipDesc = r =>require.ensure([],()=>r(require('../views/vipcard/children/vipDesc')))
const useCart = r =>require.ensure([],()=>r(require('../views/vipcard/children/useCart')))
const payHistory = r =>require.ensure([],()=>r(require('../views/vipcard/children/payHistory')))
const service = r =>require.ensure([],()=>r(require('../views/service/service')),'service')
const serviceDetail = r =>require.ensure([],()=>r(require('../views/service/children/serviceDetail')),'serviceDetail')
const download = r =>require.ensure([],()=>r(require('../views/download/download')),'download')
const info = r => require.ensure([],()=>r(require('../views/profile/children/info')))
const updatename = r => require.ensure([],()=>r(require('../views/profile/children/children/updatename')))
const forget = r => require.ensure([],()=>r(require('../views/forget/forget')),'forget')
export default [{
  path:'/',
  component:App,
  children:[
    {
      path:'',
      redirect:'/index'
    },
    {
      path:'/index',
      component:index
    },
    {
      path:'/city/:cityid',
      component:city
    },
    {
      path:'/msite',
      component:msite
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/shop',
      component:shop,
      children:[{
        path:'foodDetail',
        component:foodDetail,
      },
      {
        path:'shopDetail',
        component:shopDetail,
        children:[{
          path:'shopSafe',
          component:shopSafe,
        }]
      }]

    },
    {
      path:'/profile',
      component:profile,
      children:[
        {
          path:'info',
          component:info,
          children:[
            {
              path:'updatename',
              component:updatename
            }
          ]
        }
      ]
    },
    {
      path:'/balance',
      component:balance,
      children:[{
        path:'detail',
        component:detail,
      }]
    },
    {
      path:'/benefit',
      component:benefit,
      children:[{
        path:'hbHistory',
        component:hbHistory
      },
      {
        path:'exchange',
        component:exchange
      },
      {
        path:'commend',
        component:commend
      },{
        path:'hbdesc',
        component:hbdesc
      }]
    },
    {
      path:'/points',
      component:points,
      children:[{
        path:'detail',
        component:detail2
      }]
    },
    {
      path:'/order',
      component:order
    },
    {
      path:'/search',
      component:search
    },
    {
      path:'/vipcard',
      component:vipcard,
      children:[
        {
          path:'vipDesc',
          component:vipDesc
        },
        {
          path:'useCart',
          component:useCart
        },
        {
          path:'payHistory',
          component:payHistory
        }
      ]
    },
    {
      path:'/service',
      component:service,
      children:[
        {
          path:'serviceDetail',
          component:serviceDetail
        }
      ]
    },
    {
      path:'/download',
      component:download
    },
    {
      path:'/forget',
      component:forget
    }
  ]
}]
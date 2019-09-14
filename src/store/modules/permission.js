import { asyncRoutes, currencyRoutes } from '@/router'

const state = {
  routes: [],//完整路由表
  addRoutes: []//用户动态添加的权限路由
}
const mutations = {
  SET_ROUTES(state, payload) {//payload过滤后的结果
    state.routes = [...currencyRoutes, ...payload]//currencyRoutes.concat(payload) 拼接
    state.addRoutes = payload
  }
}
// 遍历asyncRoutes动态路由 递归过滤，routes：权限路由 roles用户路由
export function forSearchArr(routes, roles) {
  let arrNew = []
  for (let item of routes) {
    let itemNew = { ...item } //解决浅拷贝共享同一内存地址
    if (roles.includes(itemNew.name)) {
      if (itemNew.children) {
        itemNew.children = forSearchArr(itemNew.children, roles)
      }
      arrNew.push(itemNew)
    }
  }
  return arrNew

  // const res = []
  // routes.forEach(route => {
  //   //复制一份路由
  //   const tmp = {...route};
  //   //如果拥有访问权，则添加到res中
  //   //判断当前用户角色数组中是否包含tmp中要求的角色
  //   if(hasPermission(roles,tmp)){
  //     //递归
  //     if(tmp.children){
  //       tmp.children = forSearchArr(tem.children,rolse)
  //     }
  //     res.push(tmp)
  //   }
  // })
  // return res;
}
function hasPermission(roles,route){
  if(roles.meta && roles.meta.roles){
    //在roles里面寻找复合role.meta.roles要求的，有一个即可
    return roles.some(role => route.meta.roles.includes(role))
  }else{
    //没有设置roles，无需判断即可访问
    return true
  }
}

const actions = {
  getAsyncRoutes({ commit, rootGetters }, roles) {
    return new Promise(resolve => {
      //根据用户角色过滤出能够访问的动态路由
      let routes = []
      if (rootGetters.userName === 'admin') {
        routes = asyncRoutes || ''
      } else {
        routes = forSearchArr(asyncRoutes, roles)
      }
      commit('SET_ROUTES', routes)
      resolve(routes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

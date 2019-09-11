// //登录状态 登录动作
// const state = {
//     token:localStorage.getItem('token'),
//     //其他用户信息
// };
// const mutations = {
//     SET_TOKEN:(state,token) => {
//         state.token = token;
//     }
// };
// const actions = {
//     //模拟用户登录
//     login({commit},userInfo){
//         const {username} = userInfo;
//         return new Promise((resolve,reject) => {
//             setTimeout(() => {
//                 if(username === 'admin' || username === 'jerry'){
//                     commit("SET_TOKEN",username);
//                     localStorage.setItem('token',username);
//                     resolve();
//                 }else{
//                     reject("用户名、密码错误");
//                 }
//             },1000)
//         })
//     }
// }
// export default{
//     namespaced:true,
//     state,
//     mutations,
//     actions
// }

import {login,getInfo} from '@/api/login'
import {Message} from 'element-ui'
import router,{resetRouter} from '@/router'

const state = {
    token:localStorage.getItem('token')?localStorage.getItem('token'):'',//认证凭据
    userName:'',
    roles:[],
    introduce:''
}
const mutations = {
    SET_TOKEN(state,val){
        state.token = val
        localStorage.setItem('token',val)
    },
    DEL_TOKEN(state){
        state.token = ''
        state.userName = ''
        state.role = ''
        state.introduce = ''
        localStorage.removeItem('token')
    },
    SET_ROLES(state,payload){
        state.roles = payload
    },
    SET_NAME(state,payload){
        state.userName = payload
    },
    SET_INTRODUCE(state,payload){
        state.introduce = payload
    }
}
const actions = {
    //use login
    _login({commit},formdatas){
        return new Promise((resole,reject) => {
            login(formdatas)
                .then(res => {
                    if(res.code === 0){
                        if(res.data.success){
                            Message.success(res.data.msg)
                            commit('SET_TOKEN',res.data.token)
                        }else{
                            Message.error(res.data.msg)
                        }
                        resolve(res) 
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    loginOut({commit}){
        commit('DEL_TOKEN')
        resetRouter()
        router.push({
            path:'/login',
            query:{
                redirect:router.currentRouter.fullPath
            }
        })
    },
    _getInfo({commit}){
        return new Promise((resolve,reject) => {
            getInfo()
                .then(res => {
                    if(res.code === 0){
                        const {name,roles,introduce} = res.data
                        commit('SET_ROLES',roles)
                        commit('SET_NAME',name)
                        commit('SET_INTRODUCE',introduce)
                    }else{
                        Message.error(res.msg)
                    }
                    resolve(res.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}
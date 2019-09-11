<template>
    <div class="login">
        <div class="slideShadow" v-show="showSlide">
            <transition>
                <div class="slideSty animated bounce">
                    <slide-verify
                        @success="onSuccess"
                        @fail="onFail"
                        :sliderText="text"
                        :w="350"
                        :h="175"
                        ref="slideDiv">
                    </slide-verify>
                    <div class="iconBtn">
                        <i class="el-icon-circle-close" @click="showSlide = false"></i>
                        <i class="el-icon-refresh" @click="refresh"></i>
                    </div>
                </div>
            </transition>
        </div>
        <div class="loginBox">
            <h2 class="loginH2">
                <strong>Vue</strong>后台管理系统
            </h2>
            <div class="loginCon">
                <div class="titleDiv">
                    <h3>Sign up now</h3>
                    <p>Enter your username and password to log on:</p>
                    <i class="el-icon-key"></i>
                </div>
                <el-form ref="loginForm" :rules="rules" :model="ruleForm">
                    <el-form-item prop="user">
                        <el-input
                            placeholder="请输入账号"
                            prefix-icon="el-icon-user"
                            v-model="ruleForm.user">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            placeholder="请输入密码"
                            prefix-icon="el-icon-lock"
                            v-model="ruleForm.password"
                            show-password>
                        </el-input>
                    </el-form-item>
                    <el-button
                        type="primary"
                        class="loginBtn"
                        @click="loginYz('loginForm')">
                        登录</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import SlideVerify from '@/components/SlideVerify'
export default{
    data(){
        return {
            notifyObj:null,
            text:'向右滑动',
            showSlide:false,
            ruleForm:{
                user:'admin',
                password:'123456'
            },
            rules:{
                user:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:3,max:15,message:'长度在3到5个字符',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                ]
            }
        }
    },
    mounted(){
        this.shopTip()
    },
    methods:{
        onSuccess(){
            this.showSlide = false
            this._login()
        },
        onFail(){
            this.$message.error('验证失败')
        },
        refresh(){
            this.$refs.slideDiv.reset()
        },
        loginYz(form){
            this.$refs[form].validate(valid => {
                if(valid){
                    this.showSlide = true
                }else{
                    return
                }
            })
        },
        _login(){

        },
        shopTip(){
            
        }
    },
    components:{
        SlideVerify
    }
}
</script>
<style scoped>

</style>
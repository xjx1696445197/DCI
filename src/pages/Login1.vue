<template>
    <div class="page" style="background-image: linear-gradient(#9A4192, #73267E);">
<!--        <div class="HEADER">-->
<!--            <div class="HEADER_BACK" @click="this.$back"></div>-->
<!--        </div>-->
<!--        <div class="header">-->
<!--            <div class="logo"></div>-->
<!--        </div>-->
        <div class="login_top">
            <div class="logo mauto"></div>
        </div>
        <div class="login_bottom">
            <div class="FORM" style="background: #fff">
                <div class="INPUT" v-focus>
                    <input
                            type="text"
                            v-validate:username="validateOtions.username"
                            :placeholder="$t('login.login_enterAccount')"
                            v-model="formData.username"
                    >
                </div>
                <div class="INPUT" v-focus>
                    <input
                            type="password"
                            v-validate:password="validateOtions.password"
                            :placeholder="$t('login.login_enterPassword')"
                            v-model="formData.password"
                    >
                </div>
                <div class="INPUT" v-focus>
                    <input
                            type="text"
                            v-validate:captcha="validateOtions.captcha"
                            :placeholder="$t('login.login_enterPode')"
                            v-model="captchaCode"
                    >
                    <div class="captcha" id="captcha"></div>
                </div>
                <div class="forget">
                    <div class="forget_txt" @click="toFindPass">{{$t('login.login_forgetPassword')}}</div>
                </div>

            </div>


            <div
                    class="button LONGBTN"
                    @click="toValidate"
            >{{$t('login.login_title')}}</div>
        </div>




        <nlayer
            :maskCancel="false"
            maskBackgroundColor="rgba(0,0,0,0.1)"
            :visible="loadingVisible"
            class="NLOADING"
        >
            <div class="LOADING">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve" width="0.8rem" height="0.8rem">
                    <path opacity="0.1" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
                    <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
                <p class="LOADING_TXT">{{$t('layerdate.layerdate_loading')}}</p>
            </div>
        </nlayer>


        <nlayer
                :maskCancel="false"
                maskBackgroundColor="rgba(0,0,0,0)"
                :autoClose="1200"
                :visible="tipsVisible"
                @close="tipsClosed"
                class="NTOAST ANIMATITE_SCALE_TO_BIG"
        >
            <div class='TOAST' v-text="tips"></div>
        </nlayer>
    </div>
</template>

<script>


    import Nlayer from '@/components/Nlayer'
    import { mapActions, mapGetters } from 'vuex'
    import urlUtil from '../util/apiUtil.js';
    import jsonAjax from '../util/restUtil.js';



    export default {
        name: "Login",
        components: {
            Nlayer
        },
        data(){
             return{
                 captchaInstance: '',
                 tips: '',
                 tipsVisible: false,
                 loadingVisible: false,
                 captchaCode: '',
                 formData: {
                     username: '',
                     password: ''
                 },
                 loginSuccess: false
             }
        },
        computed: {
            users(){
                return this.getUsers()
            },
            Sidebars(){
                return this.getSidebars()
            },
            fail(){
            	return this.$t('login.login_failure')
            },
            validateOtions(){
                // 验证格式及错误信息
                const res = {
                    username: {
                        rules:{
                            required: true
                        },
                        msg:{
                            required: this.$t('validate.validate_account')
                        }
                    },
                    password: {
                        rules:{
                            required: true
                        },
                        msg:{
                            required: this.$t('validate.validate_password')
                        }
                    },
                    captcha: {
                        rules:{
                            required: true
                        },
                        msg:{
                            required: this.$t('validate.validate_code')
                        }
                    }
                }

                return res
            }
        },
        mounted(){
            this.setDefaultUname()
            this.createCaptcha()
        },
        methods: {
            ...mapGetters(['getUsers','getSidebars']),
            ...mapActions(['setUserinfo', 'setUserNoticeState', 'setUsers','setSidebars']),
            // 设置默认用户名
            setDefaultUname(){
                if( this.users.length > 0 ){
                    this.formData.username = this.users[this.users.length-1]
                }
            },
            // 去找回密码
            toFindPass(){
                this.$push({
                    path: '/newForgetPassword'
                })
            },
            // 创建一个验证码
            createCaptcha(){
                this.captchaInstance = new GVerify("captcha")
            },
            // 验证码是否正确
            validateCaptcha(){
                if( this.captchaInstance.validate(this.captchaCode) ){
                    this.submit()
                } else {
                    this.showTips(this.fail)
                    this.captchaCode = ''
                }
            },
            // 去验证格式
            toValidate(){
                const pass = this.$validator.checkAll()


                if( pass ){
                    // 数据格式通过验证
                    this.validateCaptcha()
                } else {
                    // 没通过验证
                    const errors = this.$validator.errors.errors
                    const errorMsg = errors[0].msg

                    this.showTips(errorMsg)
                }
            },
            // 提交信息
            submit(){
                const {
                    username,
                    password
                } = this.formData

                // 打开加载层
                this.showLoading()

                var that = this

                jsonAjax.post(urlUtil.getApiUrl("login"), {
                    userName: username,
                    password: password,
                }, function (result) {
                    console.log(result)
                    // 关闭加载层
                    that.closeLoading()
                    if( result.returnCode == 1 ){
                        const { customer } = result.resultData
                        const userinfo = customer
                        userinfo.transPass = result.resultData.transPass
                        // 更新userinfo信息 加入实名认证
                        userinfo.certification = result.resultData.certification
                        userinfo.showCode = result.resultData.status
                        userinfo.parentAccount = result.resultData.parentAccount
                        const { token } = customer.customerToken
                        localStorage.setItem('transPass', result.resultData.transPass)
                        localStorage.setItem('certification', result.resultData.certification)
                        localStorage.setItem('googleVerification', result.resultData.googleVerification)

                        // 设置消息状态
                        that.setUserNoticeState()
                        // 保存用户信息
                        that.setUserinfo({
                            ...userinfo,
                            token
                        })
                        // 保存用户名
                        that.setUsers(userinfo.userName)
                    //    跳转创建页面
                        setTimeout(() => {
                            that.$replace({
                                path: '/walletindex'
                            })
                        }, 300)
                        that.loginSuccess = true
                        that.showTips(data.message, false)
                    }else{
                        that.showTips(data.message)
                        that.captchaCode = ''
                    }
                })

                return
                // 新的登录页面
                this.$http.post("app/login/userLogin", {
                    userName: username,
                    userPass: password,
                    __HEADERSAUTH: true
                }).then((res) => {
                    console.log(res)
                    const { data } = res

                    // 关闭加载层
                    this.closeLoading()

                    setTimeout(() => {
                        if( data.success ){
                            const userinfo = data.result
                            const { token } = res.headers

                            // 设置消息状态
                            this.setUserNoticeState()
                            // 保存用户信息
                            this.setUserinfo({
                                ...userinfo,
                                token
                            })
                            // 保存用户名
                            this.setUsers(userinfo.userName)

                            // 设置侧边栏数据
                            if(JSON.stringify(this.Sidebars).indexOf(JSON.stringify(userinfo.userName)) === -1 || this.Sidebars.length == 0){
                                // 设置
                                this.setSidebars({
                                    username:userinfo.userName,
                                    active:true
                                })
                            }else{
                                // 无需设置
                                this.Sidebars.forEach((item, i)=>{
                                    if(item.username == userinfo.userName){
                                        item.active = true
                                    }else{
                                        item.active = false
                                    }
                                })
                            }


                            this.loginSuccess = true
                            this.showTips(data.message, false)
                        } else {
                            this.showTips(data.message)
                            this.captchaCode = ''
                        }
                    }, 300)

                })
            },
            // 打开消息提示
            showTips(msg, refresh=true){
                this.tips = msg
                this.tipsVisible = true

                refresh && this.captchaInstance.refresh()
            },
            // 打开加载
            showLoading(){
                this.loadingVisible = true
            },
            // 监听消息提示关闭
            tipsClosed(){
                this.msg = ''
                this.tipsVisible = false

                if( this.loginSuccess ){
                    this.$replace({
                        name: 'My'
                    }, false)
                }
            },
            // 关闭加载层
            closeLoading(){
                this.loadingVisible = false
            }
        }
    }
</script>

<style scoped>
    .page{
        background: #fff;
    }
    .login_bottom{
        position: absolute;
        top: 4rem;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
    }
    .HEADER{
        background: none;
    }
    .header{
        position: relative;
        height: 5rem;
        background: url("../static/images/login/login_bg.png") no-repeat center center / cover;
    }
    .logo{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 1rem;
        width: 2.2rem;
        height: 2.2rem;
        background: url("../static/images/newWallet/dci_logo.png") no-repeat center center / cover;
        /*background: #fff;*/
        border-radius: 100%;
    }
    .FORM{
        margin-top: 1rem;
        padding: 0 1rem;
    }
    .captcha{
        width: 1.5rem;
        height: .5rem;
    }
    .button{
        margin-top: .5rem;
    }
    .forget{
        margin-top: 0.18rem;
        height: 0.4rem; align-items: center;
        display: flex;
        flex-direction: row-reverse;
    }
    .forget_txt{
        font-size: .26rem;
        color: #8E398C;
    }
</style>

<template>
    <div class="page" style="background-image: linear-gradient(#9A4192, #73267E);">
        <div class="HEADER">
            <div class="HEADER_BACK_WHITE" @click="this.$back"></div>
            <p class="HEADER_TITLE HEADER_TITLE_WAITE">找回密码</p>
        </div>
<!--        <div class="header">-->
<!--            <div class="logo"></div>-->
<!--        </div>-->
        <div class="login_top">
            <div class="logo mauto"></div>
        </div>
        <div class="login_bottom">

            <div class="FORM" style="background: #fff">
                <div class="clearfix">
                    <p class="login_bottom_txt fl">邮箱找回</p>
                    <p class="login_bottom_txt fr" style="color: #8E398C"
                        @click="toNewForgetTel"
                       v-if="type != 2"
                    >手机号找回</p>
                </div>

                <div class="INPUT" v-focus>
                    <input
                            type="text"
                            :placeholder="$t('login.login_enterAccount')"
                            v-model="account"
                            disabled="disabled"
                    >
                </div>
                <div class="INPUT" v-focus>
                    <input
                            type="text"
                            v-validate:email="validateOtions.email"
                            :placeholder="$t('register.register_enterMailbox')"
                            v-model="formData.email"
                    >
                </div>
                <div class="INPUT" v-focus>
                    <input
                    type="text"
                    v-validate:captcha="validateOtions.captcha"
                    :placeholder="$t('register.register_mailboxCode')"
                    v-model="formData.captcha"
                    >
                <div
                    class="sendCaptcha radius-half BUTTON_BG"
                    @click="sendCaptcha"
                    >{{captchaTips}}</div>
                </div>
                <div class="INPUT" v-focus>
                    <input
                            type="password"
                            v-validate:pwd="validateOtions.pwd"
                            :placeholder="$t('register.register_password')"
                            v-model="formData.pwd"
                    >
                </div>
                <div class="INPUT" v-focus>
                    <input
                            type="password"
                            v-validate:confirmPwd="validateOtions.confirmPwd"
                            :placeholder="$t('register.register_rePassword')"
                            v-model="formData.confirmPwd"
                    >
                </div>

            </div>


            <div
                    class="button LONGBTN"
                    @click="toValidate"
            >下一步</div>
        </div>

        <nlayer
                :visible="noBindDigVisible"
                @close="noBindDigClose"
                class="ANIMATITE_TOP_TO_BOTTOM_SMALL NDIALOG"
                width="80%"
                :zIndex="1002"
        >
            <div class='DIALOG'>
                <div class='DIALOG_TITLE'>
                    {{$t('layerdate.layerdate_tips')}}
                </div>
                <div class='DIALOG_CONTENT'>
                    当前账号没有绑定手机号/邮箱，<br>
                    不能进行找回密码操作。
                </div>
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
        name: "NewForgetPasswordSecoundEmail",
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
                     email: '',
                     captcha: '',
                     pwd: '',
                     confirmPwd: ''
                 },
                 loginSuccess: false,
                 noBindDigVisible:false
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
            type(){
                return this.$route.query.type
            },
            account(){
                return this.$route.query.account
            },
            captchaTips(){
                if( this.sended ){
                    return this.time >= 10 ? this.time+this.$t('register.register_seconds')+this.$t('register.register_again') : '0'+this.time +this.$t('register.register_seconds')+this.$t('register.register_again')
                } else {
                    return this.$t('register.register_getCode')
                }
            },
            validateOtions(){
                // 验证格式及错误信息
                const res = {
                    account: {
                        rules:{
                            required: true,
                            account: true
                        },
                        msg:{
                            required: this.$t('validate.validate_account'),
                            account: this.$t('validate.validate_accountText')
                        }
                    },
                    email: {
                        rules:{
                            required: true,
                            email: true
                        },
                        msg:{
                            required: this.$t('validate.validate_email'),
                            email: this.$t('validate.validate_emailFormat')
                        }
                    },

                    captcha: {
                        rules:{
                            required: true
                        },
                        msg:{
                            required: this.$t('validate.validate_code')
                        }
                    },

                    pwd: {
                        rules:{
                            required: true,
                            sPassword: true
                        },
                        msg:{
                            required: this.$t('validate.validate_newPassword'),
                            sPassword: this.$t('validate.validate_passwordFormat')
                        }
                    },
                    confirmPwd: {
                        rules:{
                            required: true
                        },
                        msg:{
                            required: this.$t('validate.validate_newPasswordAgain')
                        }
                    },


                    inviteAccount: {
                        rules:{
                            required: true
                        },
                        msg:{
                            required: this.$t('register.register_invitationCode')
                        }
                    },

                }

                return res
            },
        },
        mounted(){
            this.setDefaultUname()
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
                    path: '/findPass'
                })
            },
            // 去手机找回
            toNewForgetTel(){
                this.$replace({
                    path: '/newForgetPasswordSecound',
                    query:{
                        account:this.account,
                        type:3
                    }
                })
            },
            // 邮箱发送验证码
            sendCaptcha(){
                const pass = this.$validator.checkAll()

                const errors = this.$validator.errors.errors
                const emailError = errors.filter((item) => {
                    return item.name == 'email'
                })
                const hasEmailError = emailError.length > 0 ? true : false

                if( hasEmailError ){
                    this.showTips(emailError[0].msg)
                    return
                }

                console.log(this.sended)
                if( !this.sended ){
                    var that = this
                    jsonAjax.post(urlUtil.getApiUrl("getEmailSecurityCode"), {
                        email: that.formData.email,
                        requestType:6
                    }, function (result) {
                        that.showTips(result.message)
                        this.setTimer()
                    })

                }
                this.sended = true
            },
            // 验证码是否正确
            validateCaptcha(){
                this.submit()
                // if( this.captchaInstance.validate(this.captchaCode) ){
                //     this.submit()
                // } else {
                //     this.showTips(this.fail)
                //     this.captchaCode = ''
                // }
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
                    pwd,
                    email,
                    captcha,
                    confirmPwd
                } = this.formData

                if( pwd != confirmPwd ){
                    this.showTips('两次密码不一致！')
                    return
                }else{
                    console.log(this.pwd)
                    console.log(this.confirmPwd)
                }

                // 打开加载层
                this.showLoading()

                var that = this

                jsonAjax.post(urlUtil.getApiUrl("dci_changePasswordSecond"), {
                    verification:captcha,
                    accounts:that.account,
                    password:pwd,
                    type:2
                }, function (result) {
                    console.log(result)
                    // return
                    // 关闭加载层
                    that.closeLoading()
                    if( result.returnCode == 1 ){
                        //    跳转创建页面
                        setTimeout(() => {
                            that.$replace({
                                path: '/login'
                            })
                        }, 300)
                    }else{
                        that.showTips(result.message)
                    }
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
            },
            // 监听无密码框关闭
            noBindDigClose(){
                this.noBindDigVisible = false
            },
        }
    }
</script>

<style scoped>
    .page{
        background: #fff;
    }
    .login_bottom{
        position: absolute;
        top: 3rem;
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
        width: 1.5rem;
        height: 1.5rem;
        background: url("../static/images/newWallet/dci_logo.png") no-repeat center center / cover;
        border-radius: 100%;
    }
    .FORM{
        margin-top: 0.6rem;
        padding: 0 1rem;
    }
    .captcha{
        width: 1.5rem;
        height: .5rem;
    }
    .button{
        margin-top: 1.5rem;
    }
    .forget{
        margin-top: 0.18rem;
        height: 0.4rem; align-items: center;
        display: flex;
        flex-direction: row-reverse;
    }
    .forget_txt{
        font-size: .26rem;
        color: #e08222;
    }
    .login_bottom_txt{
        font-size: 0.28rem;
        color: #333;
        font-weight: bold;
        line-height: 0.5rem;
        padding-bottom: 0.3rem;
    }
    .sendCaptcha{
        width: auto;
        height:0.5rem;
        box-sizing: border-box;
        padding: 0 0.2rem;
        font-size: 0.22rem;
        color: #fff;
        line-height: 0.5rem;
        text-align: center;
    }
</style>

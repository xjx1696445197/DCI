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
                <p class="login_bottom_txt">请输入您的账号</p>
                <div class="INPUT" v-focus>
                    <input
                            type="text"
                            v-validate:username="validateOtions.username"
                            :placeholder="$t('login.login_enterAccount')"
                            v-model="formData.username"
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
                    path: '/findPass'
                })
            },
            // 创建一个验证码
            createCaptcha(){
                this.captchaInstance = new GVerify("captcha")
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
                    username
                } = this.formData

                // 打开加载层
                this.showLoading()

                var that = this

                jsonAjax.post(urlUtil.getApiUrl("changePasswordFirst"), {
                    accounts: username
                }, function (result) {
                    // 关闭加载层
                    that.closeLoading()
                    if( result.returnCode == 1 ){
                    //    跳转创建页面
                    //    检测账号是否绑定过
                        if( result.resultData.type == 1 || result.resultData.type == 3 ){
                        //    绑定过
                            setTimeout(() => {
                                that.$push({
                                    path: '/newForgetPasswordSecound',
                                    query:{
                                        account:username,
                                        type:result.resultData.type
                                    }
                                })
                            }, 300)
                        }else if( result.resultData.type == 2 ){
                            setTimeout(() => {
                                that.$push({
                                    path: '/newForgetPasswordSecoundEmail',
                                    query:{
                                        account:username,
                                        type:result.resultData.type
                                    }
                                })
                            }, 300)
                        }else if( result.resultData.type == 0 ){
                            that.showTips('当前账号未绑定手机/邮箱，不能进行找回密码操作！')
                        }else{
                            that.showTips(result.message)
                        }

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
        line-height: 0.5rem;
        padding-bottom: 0.3rem;
    }
</style>

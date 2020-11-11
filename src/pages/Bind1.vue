<template>
    <div class="page">
        <div class="HEADER">
            <div class="HEADER_BACK_WHITE" @click="this.$back"></div>
            <p class="HEADER_TITLE HEADER_TITLE_WAITE">{{title}}</p>
        </div>
        <div class="wrapper">
            <div class="content_wrapper">


            <div class="content">
                <div class="FORM">
                    <div
                            class="INPUT"
                            v-focus
                    >
                        <img src="../static/images/newWallet/my_top_icon1.png" alt="" class="icon_account">
                        <p>账号</p>
                        <input
                                type="text"
                                :placeholder="$t('register.register_enterPhone')"
                                v-model="account"
                                disabled="disabled"
                        >
                    </div>
                    <div
                            class="INPUT"
                            v-focus
                            v-if="mobilePhone"
                    >
                        <img src="../static/images/newWallet/my_top_icon3.png" alt="" class="icon_account">
                        <p>手机号</p>
                        <input
                                type="text"
                                :placeholder="$t('register.register_enterPhone')"
                                v-model="formData.tel"
                                v-validate:captcha="validateOtions.tel"
                        >
                    </div>
                    <div
                            class="INPUT"
                            v-focus
                            v-if="email"
                    >
                        <img src="../static/images/newWallet/my_top_icon4.png" alt="" class="icon_account">
                        <p>邮箱</p>
                        <input
                                type="text"
                                :placeholder="$t('register.register_enterMailbox')"
                                v-model="formData.email"
                                v-validate:captcha="validateOtions.email"
                        >
                    </div>


                    <div
                            class="INPUT"
                            v-focus
                            v-if="mobilePhone"
                    >
                        <p>验证码</p>
                        <input
                                type="text"
                                :placeholder="$t('findPassword.findPassword_phoneCode')"
                                v-model="formData.captcha"
                                v-validate:captcha="validateOtions.captcha"
                        >
                        <div
                                class="sendCaptcha radius-half BUTTON_BG"
                                @click="sendCaptchaTel"
                        >{{captchaTips}}</div>
                    </div>
                    <div
                            class="INPUT"
                            v-focus
                            v-else

                    >
                        <p>验证码</p>
                        <input
                                type="text"
                                :placeholder="$t('findPassword.findPassword_mailboxCode')"
                                v-model="formData.captcha"
                                v-validate:captcha="validateOtions.captcha"
                        >
                        <div
                                class="sendCaptcha radius-half BUTTON_BG"
                                @click="sendCaptchaEmail"
                        >{{captchaTips}}</div>
                    </div>


                </div>



                <div
                        class="modifyPwd_btn LONGBTN"
                        @click="toValidate"
                >{{$t('layerdate.layerdate_btnOk')}}</div>
            </div>

        </div>
        </div>


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
    // 验证格式及错误信息

    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import Nlayer from '@/components/Nlayer'
    import urlUtil from '../util/apiUtil.js';
    import jsonAjax from '../util/restUtil.js';

    const TIME = 60


    export default {
        name: "Bind",
        data(){
            return {
                formData: {
                    tel: '',
                    email: '',
                    captcha: ''
                },
                tips: '',
                tipsVisible: false,
                sended: false,
                captchaToken: '',
                time: TIME
            }
        },
        components: {
            Nlayer
        },
        computed: {
            userinfo(){
                return this.getUserinfo()
            },
            userId(){
                return this.userinfo.userId
            },
            customerId(){
                return this.userinfo.customerId
            },
            target(){
                return this.$route.query.name
            },
            account(){
                return this.$route.query.account
            },
            mobilePhone(){
                return this.target === 'tel' ? true : false
            },
            email(){
                return this.target === 'tel' ? false : true
            },

            title(){
                if( this.target === 'tel' ){
                    return this.$t('myMessageSetup.myMessageSetup_bindPhone')
                } else if( this.target === 'email' ){
                    return this.$t('myMessageSetup.myMessageSetup_bindEmail')
                }
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
                    tel: {
                        rules:{
                            required: true,
                            phone: true
                        },
                        msg:{
                            required: this.$t('validate.validate_phone'),
                            phone: this.$t('validate.validate_phoneFormat')
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

                }

                return res
            }
        },
        methods: {
            ...mapMutations(['SET_ROUTEACTION']),
            ...mapActions(['removeUserinfo','setUserinfo']),
            ...mapGetters(['getUserinfo']),
            // 重置历史记录
            resetHistory(){
                const step = window.history.length - 3

                this.$router.go(-step)
                setTimeout(() => {
                    this.SET_ROUTEACTION('')
                    this.$router.replace({
                        path: '/login'
                    })
                }, 100)
            },
            // 去验证格式
            toValidate(){

                const {
                    tel,
                    email
                } = this.formData
                console.log(this.formData)


                if( tel == '' && this.mobilePhone ){

                    this.showTips(this.$t('validate.validate_phone'))
                    return
                }

                if( email == '' && this.email ){
                    this.showTips(this.$t('validate.validate_email'))
                    return
                }

                const pass = this.$validator.checkAll()

                if( !pass ) {
                    // 没通过验证
                    const errors = this.$validator.errors.errors

                    const errorMsg = errors[0].msg

                    this.showTips(errorMsg)
                    return
                }


                this.submit()
            },
            // 提交信息
            submit(){
                let params = {
                    userId: this.userId,
                    messageValidateCode: this.formData.captcha
                }

                if( this.mobilePhone ){
                    params = {
                        ...params,
                        type: 1,
                        mobilePhone: this.formData.tel
                    }
                //    请求绑定手机号
                    var that = this;
                    jsonAjax.post(urlUtil.getApiUrl("user_editphone"), {
                        verification:that.formData.captcha,
                        phones:that.formData.tel,
                        customerId:that.customerId
                    }, function (result) {
                        console.log(result);
                        if (result.returnCode == 1) {
                            that.showTips(result.message)
                            // 设置最新的用户信息
                            if( that.mobilePhone ){
                                that.setUserinfo({
                                    ...that.userinfo,
                                    mobilePhone: that.formData.tel,
                                    phone:that.formData.tel
                                })
                            } else {
                                this.setUserinfo({
                                    ...that.userinfo,
                                    email: that.formData.email
                                })
                            }

                            // setTimeout(() => {
                            //     this.$back()
                            // }, 1200)
                        }else{
                            that.showTips(result.message)
                        }
                    });
                } else {
                    params = {
                        ...params,
                        type: 2,
                        email: this.formData.email
                    }

                    var that = this;
                    jsonAjax.post(urlUtil.getApiUrl("updateAccountEmail"), {
                        verification:that.formData.captcha,
                        email:that.formData.email,
                        customerId:that.customerId
                    }, function (result) {
                        console.log(result);
                        if (result.returnCode == 1) {
                            that.showTips(result.message)
                            // 设置最新的用户信息
                            if( that.mobilePhone ){
                                that.setUserinfo({
                                    ...that.userinfo,
                                    mobilePhone: that.formData.tel,
                                    phone:that.formData.tel
                                })
                            } else {
                                this.setUserinfo({
                                    ...that.userinfo,
                                    email: that.formData.email
                                })
                            }

                            // setTimeout(() => {
                            //     this.$back()
                            // }, 1200)
                        }else{
                            that.showTips(result.message)
                        }
                    });
                }

                //

                return
                this.$http.post('js/users/bindingEmailOrPhone', params, {
                    headers: {
                        'tmp_token': this.captchaToken
                    }
                }).then((res) => {
                    console.log(res)
                    this.showTips(res.message)
                    if( res.success ){
                        // 设置最新的用户信息
                        if( this.mobilePhone ){
                            this.setUserinfo({
                                ...this.userinfo,
                                mobilePhone: this.formData.tel
                            })
                        } else {
                            this.setUserinfo({
                                ...this.userinfo,
                                email: this.formData.email
                            })
                        }

                        setTimeout(() => {
                            this.$back()
                        }, 1200)
                    }
                })
            },
            // 手机发送验证码
            sendCaptchaTel(){
                // 检测邮箱是否填写
                if(this.formData.tel == ''){
                    this.showTips(this.$t('validate.validate_phone'))
                    return
                }else{
                    if( !this.sended ){
                        // 手机发送验证码
                        // /app/securityCode/getMessagesSecurityCode
                        var that = this;
                        jsonAjax.post(urlUtil.getApiUrl("send_dx"), {
                            phone:that.formData.tel,
                            requestType:5
                        }, function (result) {
                            console.log(result);
                            if (result.returnCode == 1) {
                                that.showTips(result.message)
                            }else{
                                that.showTips(result.message)
                            }
                        });

                        // this.$http.get('js/usersLogin/phoneNumberCode', {
                        //     phoneNumber: this.formData.tel,
                        //     type: 2,
                        //     __HEADERSAUTH: true
                        // }).then((res) => {
                        //     this.showTips(res.data.message)
                        //     if( res.success ){
                        //         this.captchaToken = res.headers.tmp_token
                        //
                        //     }
                        //
                        // })

                        this.setTimer()
                        this.sended = true
                    }

                }



            },
            // 邮箱发送验证码
            sendCaptchaEmail(){
                if(this.formData.email == ''){
                    this.showTips(this.$t('validate.validate_email'))
                    return
                }else{
                    if( !this.sended ){
                        console.log('是进入这个空间吗')
                        // 邮箱发送验证码 updateAccountEmail
                        var that = this;
                        jsonAjax.post(urlUtil.getApiUrl("getEmailSecurityCode"), {
                            email:that.formData.email,
                            requestType:5
                        }, function (result) {
                            console.log(result);
                            if (result.returnCode == 1) {
                                that.showTips(result.message)
                            }else{
                                that.showTips(result.message)
                            }
                        });
                        return
                        this.$http.get('js/usersLogin/emailCode', {
                            email: this.formData.email,
                            type: 2,
                            __HEADERSAUTH: true
                        }).then((res) => {
                            this.showTips(res.data.message)

                            if( res.success ){
                                this.captchaToken = res.headers.tmp_token


                            }

                        })

                        this.setTimer()
                        this.sended = true
                    }

                }

            },
            // 倒计时
            setTimer(){
                const timer = setTimeout(() => {
                    if( this.time <= 0 ){
                        clearTimeout(timer)
                        this.sended = false
                        this.time = TIME
                        return
                    }
                    this.time -= 1
                    this.setTimer()
                }, 1000)
            },
            // 打开消息提示
            showTips(msg){
                this.tips = msg
                this.tipsVisible = true
            },
            // 监听消息提示关闭
            tipsClosed(){
                this.msg = ''
                this.tipsVisible = false
            }
        }
    }
</script>

<style scoped>
    .content_wrapper{
        background: #fafafa;
        padding-top: 0.24rem;
    }
    .content{
        background: #fff;
        padding: 0 0.35rem;
    }
    .modifyPwd_label{
        font-size: .26rem;
        color: #333;
        line-height: .7rem;
        width: 1.2rem;
    }
    .modifyPwd_sub{
        display: flex;
        justify-content: space-between;
        padding: 0.15rem 0;
        margin-top: 0.18rem;
    }
    .modifyPwd_txt1{
        font-size: .26rem;
        color: #aaa;
        line-height: 0.4rem;
        flex: 1;
    }
    .modifyPwd_txt2{
        font-size: .26rem;
        color: #8E398C;
        line-height: 0.4rem;
        width: 1.5rem;
        text-align: right;
    }
    .modifyPwd_btn{
        margin-top: 0.9rem;
        font-size: .3rem;
        color: #fff;
        width: 5.5rem;
        line-height: .7rem;
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

    .icon_account{
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.2rem;
    }
</style>
<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">问题反馈</p>
            <div
                    class="HEADER_RIGHT"
                    @click="go('Feedbackrecord')"
            >反馈记录</div>
        </div>
        <div class="wrapper">
            <div class="content">
                <div class="inputBox_list">
                    <div class="inputBox">
                        <p class="inputBox_label">{{$t('feedback.feedback_name')}}</p>
                        <div class="inputBox_sub">
                            <input
                                    type="text" class="INPUT2"
                                    :placeholder="$t('feedback.feedback_name')"
                                    v-model="formData.name"
                                    v-validate:name="validateOtions.name"
                            >
                        </div>
                    </div>
                    <div class="inputBox">
                        <p class="inputBox_label">{{$t('feedback.feedback_contactInformation')}}</p>
                        <div class="inputBox_sub">
                            <input
                                    type="text"
                                    class="INPUT2"
                                    :placeholder="$t('feedback.feedback_phone')"
                                    v-model="formData.tel"
                                    v-validate:tel="validateOtions.tel"
                            >
                            <input
                                    type="text"
                                    class="INPUT2"
                                    :placeholder="$t('feedback.feedback_email')"
                                    v-model="formData.email"
                                    v-validate:email="validateOtions.email"
                            >
                        </div>
                    </div>
                    <div class="inputBox">
                        <p class="inputBox_label">{{$t('feedback.feedback_feedback')}}：</p>
                        <div class="inputBox_sub">
                            <textarea
                                    class="INPUT2"
                                    :placeholder="$t('feedback.feedback_enter')"
                                    v-model="formData.content"
                                    v-validate:content="validateOtions.content"
                            ></textarea>
                            <p class="textarea_length">{{textareaLength}}/200</p>
                        </div>
                    </div>
                </div>
                <div
                        class="btn LONGBTN"
                        @click="toValidate"
                >{{$t('feedback.feedback_btnFeedback')}}</div>
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

    import jsonAjax from "../util/restUtil";
    import urlUtil from "../util/apiUtil";
    import Nlayer from '@/components/Nlayer'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Feedback",
        data(){
            return {
                formData: {
                    name: '',
                    tel: '',
                    email: '',
                    content: ''
                },
                tips: '',
                tipsVisible: false
            }
        },
        computed: {
            userinfo(){
                return this.getUserinfo()
            },
            customerId(){
                return this.userinfo.customerId
            },
            textareaLength(){
                let length = this.formData.content.length
                if( length >= 200 ){
                    this.formData.content = this.formData.content.substr(0, 199)
                    length = 200
                }
                return length
            },
            validateOtions(){
                // 验证格式及错误信息
                const res = {
                    name: {
                        rules:{
                            required: true,
                            uname: true
                        },
                        msg:{
                            required: this.$t('validate.validate_name'),
                            uname: this.$t('validate.validate_realName')
                        }
                    },
                    tel: {
                        rules:{
                            phone: true
                        },
                        msg:{
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
                    content: {
                        rules:{
                            required: true,
                            maxlength: 200
                        },
                        msg:{
                            required: this.$t('validate.validate_content'),
                            maxlength: this.$t('validate.validate_contentMax')
                        }
                    }
                }

                return res
            }
        },
        components: {
            Nlayer
        },
        methods: {
            ...mapGetters(['getUserinfo']),
            // 替换空格
            removeAllSpace(str){
                return str.replace(/\s+/g, "");
            },
            // 去验证格式
            toValidate(){
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
                if(this.removeAllSpace(this.formData.content) == ''){
                    console.log(this.formData.content)
                    this.showTips(this.$t('validate.validate_contentError'))
                    return
                }
                var that = this
                // dci_saveUserQuestion
                jsonAjax.post(urlUtil.getApiUrl("dci_saveUserQuestion"), {
                    userName: this.formData.name,
                    phone: this.formData.tel,
                    email: this.formData.email,
                    question: this.formData.content,
                    address:localStorage.getItem("assetaddress"),
                    userId:this.customerId
                }, function (result) {
                    console.log(result)
                    if( result.returnCode == 1 ){
                        that.showTips(result.message)
                        that.formData = {
                            name: '',
                            tel: '',
                            email: '',
                            content: ''
                        }

                    }
                })
                return;
                this.$http.post('app/userQuestion/saveUserQuestion', {
                    userName: this.formData.name,
                    phone: this.formData.tel,
                    email: this.formData.email,
                    question: this.formData.content,
                    address:localStorage.getItem("assetaddress")

                }).then((res) => {
                    if( res.success ){
                        this.showTips("反馈成功")
                        this.formData = {
                            name: '',
                            tel: '',
                            email: '',
                            content: ''
                        }

                    }
                })
            },
            go(url){
                this.$push({
                    path: '/'+url
                })
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
    .content{
        padding: 0.2rem 0.3rem;
    }
    .inputBox+.inputBox{
        margin-top: 0.1rem;
    }
    .inputBox_label{
        font-size: .26rem;
        color: #333;
        line-height: .9rem;
    }
    .INPUT2+.INPUT2{
        margin-top: 0.24rem;
    }
    textarea.INPUT2{
        height: 3rem;
        padding: .1rem .2rem 0.6rem;
        line-height: 1.6;
        text-align: justify;
    }
    .btn{
        margin-top: .9rem;
    }
    .inputBox_sub{
        position: relative;
    }
    .textarea_length{
        position: absolute;
        font-size: .2rem;
        color: #aaa;
        line-height: .4rem;
        bottom: .1rem;
        right: .1rem;
        padding: 0 .15rem;
    }
</style>

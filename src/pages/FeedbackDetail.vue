<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">记录详情</p>
        </div>
        <div class="wrapper">
            <div class="content">
                <p class="detail_title" v-if="this.$route.query.isread==1">反馈暂无回复</p>
                <p v-if="this.$route.query.isread==1" class="sub_txt">~~请您耐心等待，客服看到您的反馈后会第一时间回复您~~</p>
                <p class="detail_title" v-if="this.$route.query.isread==0">反馈有了新的回复</p>
                <p v-if="this.$route.query.isread==0" class="sub_txt">~~您的反馈有了新的回复，内容如下，如需回复，请点击下方回复按钮~~</p>
                <div class="feedbacklist"  v-for="(item,index) in detail">

                    <p class="detail_title">{{item.userType == 0 ? '反馈的问题' : 'HALE 客服'}}</p>
                    <div class="detail_meta">
                        <p class="detail_date">{{item.createTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</p>
                    </div>
                    <div class="detail_content">{{item.userType == 0 ? '' : '亲爱的HALE用户：'}}
                        {{item.question}}
                    </div>

    <!--                回复按钮-->
                    <div class="LONGBTN receive"
                        @click="toSureMsg"
                    >回复</div>
                </div>
            </div>
        </div>

<!--        确认回复弹窗-->
        <nlayer
                :visible="noSureMsgDigVisible"
                @close="noSureMsgDigClose"
                class="ANIMATITE_BOTTOM_TO_TOP NDIALOG"
                width="100%"
                :zIndex="999"
        >
            <div class='DIALOG_DCI'>
                <div class='DIALOG_TITLE tcenter'>
                    回复反馈
                </div>
                <div class='DIALOG_CONTENT'>
                    <p>回复反馈</p>
                    <textarea
                        class="INPUT2 DIALOG_DCI_content"
                        :placeholder="$t('feedback.feedback_enter')"
                        v-model="formData.content"
                        v-validate:content="validateOtions.content"
                    ></textarea>
                </div>
                <div class='DIALOG_BTNS clearfix'>
                    <div
                            class='LONGBTN DIALOG_DCI_BTN'
                            @click='sureMsg'
                    >确认回复</div>
                </div>

            </div>
        </nlayer>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Nlayer from '@/components/Nlayer'

    import jsonAjax from "../util/restUtil";
    import urlUtil from "../util/apiUtil";

    export default {
        name: "FeedbackDetail",
        components: {
            Nlayer
        },
        data() {
            return {
                detail: [],
                noSureMsgDigVisible:false,
                formData:{
                    content:''
                }
            }
        },
        computed: {
            id() {
                return this.$route.query.id
            },
            userinfo() {
                return this.getUserinfo()
            },
            userId() {
                return this.userinfo.userId
            },
            customerId() {
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
        mounted() {
            // 获取详情
            this.getDetail()
            // 标记已读
            this.markRead()
        },
        methods: {
            ...mapGetters(['getUserinfo']),
            // 标记已读
            markRead() {
                var that = this
                jsonAjax.post(urlUtil.getApiUrl('dci_updateQuestionSolve'), {
                    userId:that.customerId,
                    questionId:this.id
                }, function (result) {
                    console.log(result)
                    if( result.returnCode == 1 ){

                    }
                })
            },
            getDetail(){
                var that=this;
                jsonAjax.get(urlUtil.getApiUrl('dci_findQuestionNewsQuery'), {
                    userId:that.customerId,
                    questionId:this.id,
                    pageNo:1,
                    pageSize:5
                }, function (result) {
                    console.log(result)
                    if( result.returnCode == 1 ){
                        that.detail = result.resultData
                        console.log(that.detail)
                    }
                })
            },
            toSureMsg(){
            //    点击确认回复拉起弹窗
                this.noSureMsgDigVisible = true
            },
            // 监听关闭密码弹窗事件
            noSureMsgDigClose(){
                this.noSureMsgDigVisible = false
            },
            sureMsg(){
            //    请求接口
                var that = this
                // dci_saveUserQuestion
                jsonAjax.post(urlUtil.getApiUrl("dci_saveQuestionNews"), {
                    question: that.formData.content,
                    questionId:that.id,
                    userId:that.customerId
                }, function (result) {
                    console.log(result)
                    if( result.returnCode == 1 ){
                        // 重新请求接口
                        that.getDetail()
                        // 关闭弹窗
                        that.noSureMsgDigVisible = false
                        that.showTips(result.message)
                        that.formData = {
                            content: ''
                        }

                    }
                })
            }

        }
    }
</script>

<style scoped>
    .content {
        padding: 0.3rem 0.3rem 2rem;
        overflow-y: scroll;
        position: fixed;
        top: 0.88rem;
        left: 0;bottom: 0;right: 0;
    }

    .detail_title {
        margin-top: .3rem;
        font-size: .3rem;
        color: #070707;
        line-height: .65rem;
        font-weight: bold;
    }

    .detail_title:nth-child(1) {
        margin-top: 0rem;
    }

    /*.detail_meta{*/
    /*    padding: 0.25rem 0;*/
    /*}*/
    .detail_date {
        font-size: .22rem;
        color: #aaa;
        line-height: .4rem;
    }

    .detail_content {
        padding: .2rem 0;
    }
    .receive{
        position: fixed;
        bottom: 0.8rem;
        left: 50%;
        transform: translateX(-50%);
    }

/*    新弹窗样式*/
    .NDIALOG .nlayer_content {
        border-top-right-radius: 0.3rem;
        border-top-left-radius: 0.3rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        overflow: hidden;
    }
    .DIALOG_DCI{
        /*position: absolute;*/
        /*top: 4.3rem;*/
        /*left: 0;*/
        /*bottom: 0;*/
        /*right: 0;*/
        /*background: #fff;*/
        /*height: 60%;*/
    }
    .DIALOG_DCI_content{
        height: auto;
        margin-top: 0.2rem;
    }
    .DIALOG_DCI_BTN{
        margin-top: 5.8rem;
        margin-bottom: 0.8rem;
    }
    .nlayer .DIALOG_DCI{
        /*position: fixed;*/
        /*top: 4.3rem;*/
        /*left: 0;*/
        /*bottom: 0;*/
        /*right: 0;*/
        /*background: #fff;*/
    }
    .nlayer >>>.nlayer_content{
        top: 3.5rem!important;
    }
    .feedbacklist{
        padding-top: 0.2rem;

    }
    .feedbacklist+.feedbacklist{
        border-top: 1px solid #eee;
    }
    .sub_txt{
        font-size: 0.2rem;
        color: #aaa;
        line-height: 0.3rem;
        border-bottom: 1px solid #eee;
        padding: 0.2rem 0;
    }

</style>

<template>
    <div class="page">
        <div class="HEADER">
            <div @click="this.$back" class="HEADER_BACK"></div>
            <p class="HEADER_TITLE">邀请好友</p>
                        <div     v-if="false"
                                class="HEADER_RIGHT share"
                                @click="downloadPic('share')"
                        ></div>
        </div>
        <div class="wrapper">
            <div
                    :class="pageType"
                    class="content"
            >
                <div :class="[curLang ? 'bg_topper' : 'bg_topper_EN']"></div>
                <div :class="[curLang ? 'bg_content' : 'bg_content_EN']">
                    <div class="share_qrcode">
                        <img :src="detail.userCodeImg">
                    </div>
                    <p class="share_txt1" style="color: #203395;margin-top: .1rem">{{$t('share.share_Scan')}}</p>
<!--                    <p class="share_txt2">您的邀请码</p>-->
                    <p class="share_txt3">{{detail.userCode}}</p>
<!--                    <p class="button3" data-initcopyer="true">复制</p>-->
<!--                    <p class="share_txt4">复制邀请码，邀请更多网红</p>-->

                    <!--                    <div class="share_btns tcenter mauto">-->
                    <!--                        <div class="share_btn radius-half" @click="downloadPic('share')">{{$t('share.share_share')}}</div>-->
                    <!--                        <div class="share_btn radius-half" @click="downloadPic('save')">{{$t('share.share_saveAlbum')}}</div>-->
                    <!--                    </div>-->
                </div>

            </div>

        </div>


        <nlayer
                :maskCancel="true"
                :visible="loadingVisible"
                :zIndex="1000"
                class="NLOADING"
                maskBackgroundColor="rgba(0,0,0,0.3)"
        >
            <div class="LOADING">
                <svg enable-background="new 0 0 40 40" height="0.8rem" version="1.1" viewBox="0 0 40 40" width="0.8rem"
                     x="0px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink" y="0px">
                    <path d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                          fill="#fff" opacity="0.1"></path>
                    <path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"
                          fill="#fff">
                        <animateTransform attributeName="transform" attributeType="xml" dur="0.5s" from="0 20 20"
                                          repeatCount="indefinite" to="360 20 20" type="rotate"></animateTransform>
                    </path>
                </svg>
                <p class="LOADING_TXT">加载中...</p>
            </div>
        </nlayer>

        <nlayer
                :autoClose="1200"
                :maskCancel="false"
                :visible="tipsVisible"
                @close="tipsClosed"
                class="NTOAST ANIMATITE_SCALE_TO_BIG"
                maskBackgroundColor="rgba(0,0,0,0)"
        >
            <div class='TOAST' v-text="tips"></div>
        </nlayer>

        <nlayer
                :maskCancel="true"
                :visible="actionSheetVisible"
                @close="actionSheetClosed"
                class="ANIMATITE_BOTTOM_TO_TOP"
                maskBackgroundColor="rgba(0,0,0,0.4)"
                width="100%"
        >
            <div class="actionSheet">
                <div class="actionSheet_container">
                    <div class="actionSheet_list">
                        <div @click="selectActionSheet(index)"
                             class="actionSheet_item"
                             v-for="(item, index) in buttons"
                        >
                            <div :style="{'background':`url(${item.icon}) no-repeat center center / cover`}"
                                 class="actionSheet_item_icon"
                            ></div>
                            <p class="actionSheet_item_txt1">{{item.title}}</p>
                        </div>
                        <div @click="selectActionqq(0)"
                             class="actionSheet_item"
                        >
                            <div :style="{'background':`url(${buttnqq.icon}) no-repeat center center / cover`}"
                                 class="actionSheet_item_icon"
                            ></div>
                            <p class="actionSheet_item_txt1">{{buttnqq.title}}</p>
                        </div>

                    </div>
                </div>
                <div @click="closeActionSheet" class="actionSheet_button">取消</div>
            </div>
        </nlayer>
    </div>
</template>

<script>
    const type1Scale = '0.6125'
    const type2Scale = '0.69'
    import ClipboardJS from 'clipboard'

    import icon001 from 'static/images/action_icon001.png'
    import icon002 from 'static/images/action_icon002.png'
    import icon003 from 'static/images/QQ.png'
    import urlUtil from '../util/apiUtil.js'
    import jsonAjax from '../util/restUtil.js'
    import {mapGetters} from 'vuex'
    import Nlayer from '@/components/Nlayer'

    export default {
        name: "Share",
        components: {
            Nlayer
        },
        data() {
            return {
                type1Scale,
                type2Scale,
                loadingVisible: true,
                actionSheetVisible: false,
                tips: '',
                tipsVisible: false,
                detail: {},
                dtask: '',
                FILENAME: '',
                shareWX: null,
                buttnqq: {
                    title: "QQ",
                    // extra:{
                    //     scene:'qq'
                    // },
                    icon: icon003
                },
                shareqq: null,
                msgqq: {type: 'image'}
                // buttons: [
                //     {
                //         title: '微信好友',
                //         extra: {
                //             scene: 'WXSceneSession'
                //         },
                //         icon: icon001
                //     },
                //     {
                //         title:'朋友圈',
                //         extra:{
                //             scene:'WXSceneTimeline'
                //         },
                //         icon: icon002
                //     }
                // ]
            }
        },
        computed: {
            userinfo() {
                return this.getUserinfo()
            },
            userId() {
                return this.userinfo.customerId
            },
            walletId() {
                return this.userinfo.walletId
            },
            scale() {
                return document.body.clientWidth / document.body.clientHeight
            },
            pageType() {
                if (this.scale >= type2Scale) {
                    return 'type2'
                } else if (this.scale >= type1Scale) {
                    return 'type1'
                }
            },
            downloadUrl() {
                return this.detail.userShareCodeImg
            },
            curLang() {
                return this.getLang() == 'zh-CN' ? true : false
            },
            shareTip1() {
                return this.$t('share.share_tips1')
            },
            shareTip2() {
                return this.$t('share.share_tips2')
            },
            shareTip3() {
                return this.$t('share.share_tips3')
            },
            shareTip4() {
                return this.$t('share.share_tips4')
            },
            shareTip5() {
                return this.$t('share.share_tips5')
            },
            shareTip6() {
                return this.$t('share.share_tips6')
            },
            shareTip7() {
                return this.$t('share.share_tips7')
            },
            shareTip8() {
                return this.$t('share.share_tips8')
            },
            shareTip9() {
                return this.$t('share.share_tips9')
            },
            shareTip10() {
                return this.$t('share.share_tips10')
            },
            shareTip11() {
                return this.$t('share.share_tips11')
            },
            buttons() {
                const buttons = [
                    {
                        title: this.shareTip2,
                        extra: {
                            scene: 'WXSceneSession'
                        },
                        icon: icon001
                    },
                    {
                        title: this.shareTip3,
                        extra: {
                            scene: 'WXSceneTimeline'
                        },
                        icon: icon002
                    }
                ]
                return buttons
            },

        },
        mounted() {
            this.getCode()
        },
        methods: {
            ...mapGetters(['getUserinfo', 'getLang']),
            // 初始化复制器
            initCopyer(value) {
                this.copyer = new ClipboardJS('[data-initcopyer]', {
                    text() {
                        return value
                    }
                }).on('success', () => {
                    this.showTips(this.shareTip1)
                })

            },
            // 获取邀请码和邀请二维码
            getCode() {
                console.log('是否进来')
                var that = this;
                jsonAjax.get(urlUtil.getApiUrl("findUserCode"), {
                    userId:that.userId
                }, function (res) {
                    console.log('是否请求了接口')
                    that.closeLoading()
                    if (res.returnCode) {
                        that.detail = res.resultData
                        that.initCopyer(res.resultData.userCode)
                    } else {
                        that.showTips(res.message)
                        // 跳转到登录页面
                        // setTimeout(function () {
                        //     that.$router.replace({
                        //         path: '/login'
                        //     })
                        // }, 1000)
                    }
                })
            },
            // 下载分享图片
            downloadPic(flag) {
                if (!window.plus) {
                    return
                }

                const callback = () => {
                    if (flag == 'save') {
                        this.saveToGallery()
                    } else if (flag = 'share') {
                        this.shareToWX()
                        this.shareToqq()
                    }
                }

                if (this.FILENAME) {
                    // 下载过了
                    callback(this.FILENAME)
                    return
                }

                const options = {}
                this.dtask = plus.downloader.createDownload(this.downloadUrl, options, (file) => {
                    this.FILENAME = file.filename
                    callback()
                })

                this.dtask.start()
            },
            // 保存到相册
            saveToGallery() {
                plus.gallery.save(this.FILENAME, () => {
                    this.showTips(this.shareTip5)
                }, (error) => {
                    plus.nativeUI.alert(this.shareTip6)
                })
            },
            // 分享到微信
            shareToWX() {
                // 先去获取微信分享服务
                this.getWXSerivce()
            },
            // 分享到qq
            shareToqq() {
                // 先去获取qq分享服务
                this.getqqSerivce()
            },
            // 获取分享服务
            getWXSerivce() {
                plus.share.getServices((services) => {
                    let sharesList = {}
                    for (let i in services) {
                        const service = services[i]
                        sharesList[service.id] = service
                    }

                    this.shareWX = sharesList['weixin']

                    // 唤起actionSheet
                    this.actionSheet()
                }, (e) => {
                    this.showTips(this.shareTip7 + e.message)
                })
            },
            // 获取qq分享服务
            getqqSerivce() {
                var that = this;
                plus.share.getServices(function (s) {
                    let shares = {};
                    for (var i in s) {
                        var t = s[i];
                        shares[t.id] = t;
                    }
                    that.shareqq = shares['qq'];
                    that.actionSheet()

                }, function (e) {
                    this.showTips('获取分享服务列表失败：' + e.message);
                });
            },
            // 唤起actionSheet
            actionSheet() {
                if (this.shareWX) {
                    // 如果有微信服务就唤起actionSheet
                    this.showActionSheet()
                } else {
                    // 没有微信服务
                    this.showTips(this.shareTip8)
                }
            },
            // 检测是否授权
            validShareAuth(params, button) {
                if (!this.shareWX) {
                    this.showTips(this.shareTip9)
                    return
                }

                if (button) {
                    params.extra = button.extra
                }

                if (this.shareWX.authenticated) {
                    // 已授权
                    this.goToShare(params)
                } else {
                    // 未授权
                    this.shareWX.authorize(() => {
                        this.goToShare(this.shareWX, params)
                    }, (e) => {
                        // 取消授权
                        plus.nativeUI.alert(e.message.split(',')[0])
                    })
                }
            },
            // 真正的去分享
            goToShare(params) {
                this.shareWX.send(params, () => {
                    this.closeActionSheet()
                }, (e) => {
                    plus.nativeUI.alert(this.shareTip10)
                })
            },
            // 真正的去分享QQ
            goToqqShare(a, params) {
                console.log(params.pictures)
                this.shareqq.send(params, () => {
                    this.closeActionSheet()
                }, (e) => {
                    plus.nativeUI.alert(this.shareTip10)
                })
            },
            // 选择ActionSheet
            selectActionSheet(index) {
                const params = {type: 'image', pictures: [this.FILENAME]}
                this.validShareAuth(params, this.buttons[index])
            },
            // 选择ActionSheet
            selectActionqq(index) {
                const params = {type: 'image', pictures: [this.FILENAME]}
                this.validqqShareAuth(params, this.buttons[index])
            },
            validqqShareAuth(params, button) {
                var that = this;
                // that.showTips('分享操作：');
                // this.msg.pictures=[image_picture.realUrl];
                if (!that.shareqq) {
                    that.showTips('无效的分享服务！');
                    return;
                }
                // button&&(msg.extra=button.extra);
                // 发送分享
                if (that.shareqq.authenticated) {
                    that.showTips('---已授权---');
                    that.goToqqShare(that.shareqq, params);
                } else {
                    // that.showTips('---未授权---');
                    that.shareqq.authorize(function () {
                        that.goToqqShare(that.shareqq, params);
                    }, function (e) {
                        that.showTips('认证授权失败：' + JSON.stringify(e));
                    });
                }
            },
            // 监听actionSheet关闭
            actionSheetClosed() {
                this.actionSheetVisible = false
            },
            // 打开actionSheet
            showActionSheet() {
                this.actionSheetVisible = true
            },
            // 关闭actionSheet
            closeActionSheet() {
                this.actionSheetVisible = false
            },
            // 打开消息提示
            showTips(msg) {
                this.tips = msg
                this.tipsVisible = true
            },
            // 监听消息提示关闭
            tipsClosed() {
                this.msg = ''
                this.tipsVisible = false
            },
            // 打开加载
            showLoading() {
                this.loadingVisible = true
            },
            // 关闭加载层
            closeLoading() {
                this.loadingVisible = false
            }
        }
    }
</script>

<style scoped>
    .actionSheet {
        background: #fff;
    }

    .actionSheet_container {
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        overflow-scrolling: touch;
    }

    .actionSheet_list {
        display: flex;
        padding: 0 0.2rem;
    }

    .actionSheet_item {
        display: flex;
        padding: 0.5rem 0.25rem;
        flex-direction: column;
        align-items: center;
    }

    .actionSheet_item_icon {
        width: 0.8rem;
        height: 0.8rem;
        background: #000;
        border-radius: 100%;
    }

    .actionSheet_item_txt1 {
        font-size: 0.24rem;
        color: #333;
        line-height: 0.4rem;
        margin-top: 0.2rem;
        white-space: nowrap;
    }

    .actionSheet_button {
        font-size: 0.32rem;
        color: #333;
        line-height: 0.9rem;
        border-top: 1px solid #f3f3f3;
        text-align: center;
    }

    .HEADER {
        background: #fff;
    }

    .page {
        background: #fff;
    }

    .wrapper {
        margin-top: .8rem;
        background: url("../static/images/newWallet/share_bg.png") repeat-x center / auto 100%;
    }

    .content {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .bg_topper {
        background: url("../static/images/newWallet/share_bg_small.png") no-repeat center center / cover;
        height: 6.56rem;
        width: 7.16rem;
        position: absolute;
        bottom: 1rem;
        left: 0.17rem;
        /*background-size:50% 50%;*/
    }

    .bg_topper_EN {
        /*background: url("../static/images/newWallet/share_bg.png") no-repeat center center / cover;*/
        height: 4.35rem;
        width: 100%;
    }

    .bg_content {
        /*background: url("../static/images/share_content.png") no-repeat center center / cover;*/
        /*background: white;*/
        border-radius: .1rem;
        background-size: 100% 100%;
        width: 4.2rem;
        height: 4.8rem;
        margin-top: -0.3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .bg_content_EN {
        /*background: url("../static/images/newWallet/share_bg.png") no-repeat center center / cover;*/
        width: 4.2rem;
        height: 4.8rem;
        margin-top: -0.3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .share_qrcode {
        position: absolute;
        bottom: 3.7rem;
        left: 50%;
        transform: translateX(-50%);
        width: 2.3rem;
        height: 2.3rem;
        background: #fafafa;
        margin-top: .83rem;
        /*border: 1px solid #203395;*/
    }

    .share_qrcode img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .share_txt1 {
        font-size: .26rem;
        color: #555;
        line-height: .4rem;
        position: absolute;
        bottom: 3.3rem;
        left: 50%;
        transform: translateX(-50%);
    }

    .share_txt2 {
        font-size: .3rem;
        color: #333;
        font-weight: bold;
        line-height: .4rem;
        margin-top: 0.65rem;
        font-style: italic;
    }

    .button3 {
        width: 1.5rem;
        height: .5rem;
        background: rgba(252, 65, 29, 1);
        border-radius: .25rem;
        text-align: center;
        color: white;
        font-size: .22rem;
        line-height: .5rem;
        margin-top: 1rem;
    }

    .share_txt4 {
        color: #333333;
        font-size: .22rem;
        margin-top: .2rem;
    }

    .share_txt3 {
        position: absolute;
        bottom: 2.1rem;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        width: 3.2rem;
        font-size: .6rem;
        font-weight: bold;
        font-style: italic;
        color: rgba(51, 51, 51, 1);
        -webkit-line-clamp: 2;
        background-image: -webkit-linear-gradient(bottom, rgba(255, 99, 57, 1),rgba(255, 60, 24, 1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        /*background: linear-gradient(0deg, rgba(255, 99, 57, 1) 50%, rgba(255, 60, 24, 1) 100%);*/
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .share_btns {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-top: 0.3rem;
    }

    .share_btn {
        line-height: .75rem;
        font-size: .28rem;
        text-align: center;
        cursor: pointer;
        color: #fff;
        background: #203395;
        width: 2.3rem;
        font-weight: bold;
    }


    .content.type1 .bg_content {
        margin-top: -2rem;
    }

    .content.type2 {
        justify-content: center;
    }

    .content.type2 .bg_topper {
        display: none;
    }

    .content.type2 .bg_content {
        margin-top: 0;
    }

    .share{
        margin-top: 0.22rem;
        width: 0.4rem;
        height: 0.4rem;
        background: url("../static/images/newWallet/share_wallet.png") no-repeat center center / cover; }
</style>

<template>
    <div class="page">
        <div class="HEADER" style="background: #fff;border-bottom: 1px solid #f5f5f5">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE">{{$t('myMessageSetup.myMessageSetup_myIdentity')}}</p>
        </div>
        <div class="wrapper">
            <div class="content">
                <!--                账号展示-->
                <div class="newList">
                    <div class="new_item clearfix">
                        <div class="new_item_icon new_item_icon1 fl" style="margin-top: 0.3rem;"></div>
                        <p class="new_item_txt1 fl" style="margin-top: 0.3rem;">头像</p>
                        <div class="new_item_pic fr"></div>
                    </div>
                    <div class="new_item clearfix">
                        <div class="new_item_icon new_item_icon2 fl"></div>
                        <p class="new_item_txt1 fl">账号</p>
                        <p class="new_item_txt2 fr">{{loginName}}</p>
                    </div>
                    <div class="new_item clearfix">
                        <div class="new_item_icon new_item_icon2 fl"></div>
                        <p class="new_item_txt1 fl">邀请人账号</p>
                        <p class="new_item_txt2 fr">{{parentAccount}}</p>
                    </div>
                </div>
                <!--手机号邮箱展示-->
                <div class="newList">
                    <div class="new_item clearfix">
                        <div class="new_item_icon new_item_icon3 fl"></div>
                        <p class="new_item_txt1 fl">手机号</p>
                        <p class="new_item_txt2 fl" v-if="phone">{{phone}}</p>
                        <p class="new_item_txt2 fr" v-if="phone">已绑定</p>
                        <p class="new_item_txt3 fr" v-if="!phone"
                           @click="toBind('tel')"
                        >去绑定</p>
                    </div>
                    <div class="new_item clearfix">
                        <div class="new_item_icon new_item_icon4 fl"></div>
                        <p class="new_item_txt1 fl">邮箱</p>
                        <p class="new_item_txt2 fl" v-if="email">{{email}}</p>
                        <p class="new_item_txt2 fr" v-if="email">已绑定</p>
                        <p class="new_item_txt3 fr" v-if="!email"
                           @click="toBind('email')"
                        >去绑定</p>
                    </div>
                </div>

                <div class="personalCenter_btn LONGBTN" @click="loginOut">{{$t('myMessageSetup.myMessageSetup_loginOut')}}</div>
            </div>


        </div>


        <!--修改用户名弹窗-->
        <nlayer
                :visible="dialogVisible"
                @close="closeDialog"
                class="ANIMATITE_TOP_TO_BOTTOM_SMALL NDIALOG"
                width="80%"
        >
            <div class='DIALOG'>
                <div class='DIALOG_TITLE'>
                    <div>
                        {{$t('layerdate.layerdate_nickname')}}
                    </div>
                </div>
                <div class='DIALOG_CONTENT'>
                    <input type="text" class="DIALOG_INPUT" v-model="nickName">
                </div>
                <div class='DIALOG_BTNS clearfix'>
                    <div
                            class='DIALOG_BTN DEFAULT'
                            @click='closeDialog'
                    >{{$t('layerdate.layerdate_btnCancel')}}</div>
                    <div
                            class='DIALOG_BTN CONFIRM'
                            @click='modifyNickname'
                    >{{$t('layerdate.layerdate_btnOk')}}</div>
                </div>
            </div>
        </nlayer>

        <!--加载弹窗-->
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
                :visible="passwordDigVisible"
                @close="passwordDigClose"
                class="ANIMATITE_TOP_TO_BOTTOM_SMALL NDIALOG"
                width="80%"
                :zIndex="999"
        >
            <div class='DIALOG'>
                <div class='DIALOG_TITLE'>
                    {{$t('layerdate.layerdate_enterTransactionPwd')}}
                </div>
                <div class='DIALOG_CONTENT'>
                    <input type="password"
                           class="PASSWORD_INPUT"
                           :placeholder="$t('layerdate.layerdate_enterTransactionPwd')"
                           v-model="password"
                    >
                </div>
                <div class='DIALOG_BTNS clearfix'>
                    <div
                            class='DIALOG_BTN DEFAULT'
                            @click='closePasswordDig'
                    >{{$t('layerdate.layerdate_btnCancel')}}</div>
                    <div
                            class='DIALOG_BTN CONFIRM'
                            @click='checkPassword'
                    >{{$t('layerdate.layerdate_btnOk')}}</div>
                </div>
            </div>
        </nlayer>

        <!--提示弹窗-->
        <nlayer
                :maskCancel="false"
                maskBackgroundColor="rgba(0,0,0,0)"
                :autoClose="1200"
                :visible="tipsVisible"
                @close="tipsClosed"
                class="NTOAST ANIMATITE_SCALE_TO_BIG"
                :zIndex="1000"
        >
            <div class='TOAST' v-text="tips"></div>
        </nlayer>


        <nlayer
                :visible="noPasswordDigVisible"
                @close="noPasswordDigClose"
                class="ANIMATITE_TOP_TO_BOTTOM_SMALL NDIALOG"
                width="80%"
                :zIndex="999"
        >
            <div class='DIALOG'>
                <div class='DIALOG_TITLE'>
                    {{$t('layerdate.layerdate_tips')}}
                </div>
                <div class='DIALOG_CONTENT'>
                    {{$t('layerdate.layerdate_setPwd')}}
                </div>
                <div class='DIALOG_BTNS clearfix'>
                    <div
                            class='DIALOG_BTN DEFAULT'
                            @click='closeNoPasswordDig'
                    >{{$t('layerdate.layerdate_btnCancel')}}</div>
                    <div
                            class='DIALOG_BTN CONFIRM'
                            @click='toSetDealPassword'
                    >{{$t('layerdate.layerdate_set')}}</div>
                </div>
            </div>
        </nlayer>
        <div class="mbs" v-if="tipss">
            <div class="tips">
                <div>
                    提示
                </div>
                <div>
                    是否确认退出登录？
                </div>
                <div>
                    <div @click="confirmExit">
                        确认
                    </div>

                    <div  @click="ancelExit">
                        取消
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Nlayer from '@/components/Nlayer'

    export default {
        name: "PersonalCenter",
        components: {
            Nlayer
        },
        data(){
            return {
                loadingVisible: false,
                password: '',
                tips: '',
                tipsVisible: false,
                dialogVisible: false,
                passwordDigVisible: false,
                noPasswordDigVisible: false,
                nickName: '',
                change:'',
                tipss:false,
            }
        },
        computed: {
            userinfo(){
                return this.getUserinfo()
            },
            userId(){
                return this.userinfo.userId
            },
            loginName(){
                return this.userinfo.loginName
            },
            parentAccount(){
                return this.userinfo.parentAccount
            },
            mobilePhone(){
                return this.userinfo.mobilePhone == 'false' ? false : this.userinfo.mobilePhone
            },
            phone(){
                return this.userinfo.phone == 'null' ? false : this.userinfo.phone
            },
            email(){
                return this.userinfo.email == 'null' ? false : this.userinfo.email
            },
            loginTip(){
                return this.$t('login.login_tips')
            },
            Sidebars(){
                return this.getSidebars()
            },
        },
        methods: {
            ...mapGetters(['getUserinfo','getSidebars']),
            ...mapActions(['removeUserinfo', 'setUserinfo', 'setUserNoticeState','setSidebars']),
            // 修改昵称
            modifyNickname(){
                this.showLoading()

                this.$http.get('js/users/updateNickName', {
                    userId : this.userId,
                    nickName: this.nickName
                }).then((res) => {
                    if( res.success ){
                        this.showTips(this.$t('myMessageSetup.myMessageSetup_update'))

                        // 设置最新的用户信息
                        this.setUserinfo({
                            ...this.userinfo,
                            nickName: this.nickName
                        })
                    }
                    this.closeLoading()
                    this.closeDialog()
                })
            },
            // 验证直接跳转还是需要二级密码
            vlidateBindTel(){
                return
                if(!this.mobilePhone){
                    // 去绑定
                    this.$push({
                        path: '/bind',
                        query: {
                            name: 'tel'
                        }
                    })

                }else{
                    this.vlidateLockData('tel')
                }
            },
            //toBind
            toBind(name){
                this.$push({
                    path: '/bind',
                    query: {
                        name: name,
                        account:this.loginName
                    }
                })
            },
            // 验证
            vlidateBindEmail(){
                return
                if(!this.email){
                    // 去绑定
                    this.$push({
                        path: '/bind',
                        query: {
                            name: 'email'
                        }
                    })

                }else{
                    this.vlidateLockData('email')
                }
            },
            // 验证是否有二级密码
            vlidateLockData(modifyName){
                this.change = modifyName
                console.log(this.change)
                console.log(this.userinfo.transPwd)
                if( this.userinfo.transPwd ){

                    // 有交易密码
                    this.openPasswordDig()
                } else {
                    // 无交易密码
                    this.openNoPasswordDig()
                }

            },
            // 去设置交易密码
            toSetDealPassword(){
                this.$push({
                    path: '/setPassword'
                })
            },
            // 检测交易密码是否正确
            checkPassword(){
                this.$http.post('js/users/isCorrectTransPass',{
                    userId: this.userId,
                    transPass: this.password
                }).then((res) => {
                    if( res.success ){
                        if(this.change == 'tel'){
                            // 跳转修改绑定的页面
                            this.$push({
                                path: '/modifyBind',
                                query: {
                                    name: 'modifyBindTel',
                                    number: this.mobilePhone
                                }
                            })
                        }else{
                            // 跳转修改绑定的页面
                            this.$push({
                                path: '/modifyBind',
                                query: {
                                    name: 'modifyBindEmail',
                                    number: this.email
                                }
                            })
                        }

                    } else {
                        this.showTips(res.message)
                        this.password = ''
                    }
                })
            },
            ancelExit(){
                this.tipss=false;
            },
            // 退出登录
            loginOut(){
                this.tipss=true;
                // this.removeUserinfo()
                // localStorage.clear()
                // localStorage.setItem("useragreemeny",1)
                // this.$replace({
                //     path: '/login'
                // })
                // this.setUserNoticeState()
                // this.showTips(this.$t('myMessageSetup.myMessageSetup_logout'))
            },
            confirmExit(){
                this.tipss=false;
                this.removeUserinfo()
                localStorage.clear()
                localStorage.setItem("useragreemeny",1)
                this.$replace({
                    path: '/login'
                })
                this.setUserNoticeState()
                this.showTips(this.$t('myMessageSetup.myMessageSetup_logout'))
            },
            // 打开消息提示
            showTips(msg){
                this.tips = msg
                this.tipsVisible = true
            },
            // 打开加载
            showLoading(){
                this.loadingVisible = true
            },
            // 监听消息提示关闭
            tipsClosed(){
                this.msg = ''
                this.tipsVisible = false

                if( !this.userinfo ){
                    this.$replace({
                        name: 'My'
                    }, false)
                }
            },
            // 关闭加载层
            closeLoading(){
                this.loadingVisible = false
            },
            // 打开dialog修改层
            showDialog(){
                this.dialogVisible = true
            },
            // 关闭dialog修改层
            closeDialog(){
                this.dialogVisible = false
            },
            // 关闭无密码提示弹窗
            closeNoPasswordDig(){
                this.noPasswordDigVisible = false
            },
            // 打开无密码提示弹窗
            openNoPasswordDig(){
                this.noPasswordDigVisible = true
            },
            // 监听关闭无密码弹窗事件
            noPasswordDigClose(){
                this.noPasswordDigVisible = false
            },
            // 关闭密码弹窗
            closePasswordDig(){
                this.passwordDigVisible = false
                this.password = ''
            },
            // 打开密码弹窗
            openPasswordDig(){
                this.passwordDigVisible = true
            },
            // 监听关闭密码弹窗事件
            passwordDigClose(){
                this.passwordDigVisible = false
                this.password = ''
            }
        }
    }
</script>

<style scoped>
    .page{
        background: #f5f5f5;
    }
    .content{
        /*padding: .24rem 0.3rem 0;*/
    }

    .ITEM{
        justify-content: space-between;
    }
    .ITEM.available{
        padding-right: 0.4rem;
    }
    .ITEM.available:after{
        position: absolute;
        content: '';
        right: 0;
        width: .3rem;
        height: .3rem;
        background: url("../static/images/icon/notice_icon_right.png") no-repeat center center/cover;
    }
    .ITEM.available .ITEM_TXT:last-child{
        color: #8E398C;
    }

    .personalCenter_avatar{
        width: .6rem;
        height: .6rem;
        background: url("../static/images/default/default_headImg.png") no-repeat center center/cover;
    }
    .personalCenter_btn{
        margin-top: 2.9rem;
    }

    /*    新页面样式*/
    .newList{
        padding: 0 0.35rem;
        background: #fff;
    }
    .newList+.newList{
        margin-top: 0.2rem;
    }
    .new_item{
        padding: 0.3rem 0;

    }
    .new_item+.new_item{
        border-top: 1px solid #f5f5f5;
    }
    .new_item_icon{
        width: 0.4rem;height: 0.4rem;
    }
    .new_item_icon1{
        background: url("../static/images/newWallet/my_top_icon1.png")no-repeat center center/cover;
    }
    .new_item_icon2{
        background: url("../static/images/newWallet/my_top_icon2.png")no-repeat center center/cover;
    }
    .new_item_icon3{
        background: url("../static/images/newWallet/my_top_icon3.png")no-repeat center center/cover;
    }
    .new_item_icon4{
        background: url("../static/images/newWallet/my_top_icon4.png")no-repeat center center/cover;
    }
    .new_item_pic{
        width: 1rem;
        height: 1rem;
        /*background: #f5b90b;*/
        background: url("../static/images/newWallet/my_pic.png")no-repeat center center/cover;
        border-radius: 100%;
    }

    .new_item_txt1{
        font-size: 0.26rem;
        color: #070707;
        line-height: 0.4rem;
        padding-left: 0.2rem;
    }
    .new_item_txt2{
        font-size: 0.26rem;
        color: #aaa;
        line-height: 0.4rem;
        padding-left: 0.2rem;
    }
    .new_item_txt3{
        font-size: 0.26rem;
        color: #8E398C;
        line-height: 0.4rem;

    }
    .mbs{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99999;
    }
    .tips{
        width: 6rem;
        height: 2.5rem;
        background: white;
        border-radius: .3rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left:  -3rem;
        margin-top:-1.25rem;
    }
    .tips>div:nth-of-type(1){
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: .3rem;
        font-weight: bold;
    }
    .tips>div:nth-of-type(2) {
        padding: 0 .3rem;
        text-align: center;
        color: #070707;
        font-size: .26rem;
    }
    .tips>div:nth-of-type(3){
        display: flex;
        justify-content: space-around;
        margin-top: .25rem;
    }
    .tips>div:nth-of-type(3)>div {
        width: 2.1rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        font-size: .24rem;
        box-shadow: 0px 5px 15px 0px rgba(100, 27, 118, 0.3);
        color: white;
        background: #8E398C;
        border-radius: .3rem;
    }
</style>

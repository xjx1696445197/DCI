<template>
    <div class="page">
        <div class="header">
            <div @click="openswitchchain">
                <img  v-if="CurrentlyselectedWallet==1" src="../static/images/newWallet/icon_HALE2.png">
                <img v-if="CurrentlyselectedWallet==2" src="../static/images/newWallet/eth.png">
                <span v-if="CurrentlyselectedWallet==1">  HALE</span>
                <span v-if="CurrentlyselectedWallet==2">  ETH</span>
                <img src="../static/images/newWallet/up.png">
            </div>
            <div v-if="false">
                <img src="../static/images/newWallet/icon_qh.png" @click="toOpen()">
            </div>
        </div>
        <div class="haleMain" v-if="CurrentlyselectedWallet==1">
            <div class="assetdetails">
                <div class="currencyBalanceBackground">
                    <div>{{walltname}}<img src="../static/images/newWallet/icon_yj.png" @click="hide()"></div>
                    <div>{{addrees|addressFormat}}<img src="../static/images/newWallet/icon_imgcode.png"
                                                       @click="qcode()"></div>
                    <div>
                        ￥<span v-if="show==1">{{Totalbalance|tofixed4}}</span><span
                            v-if="show==0">****.**</span>
                    </div>
                </div>
            </div>
            <div class="notice" v-for="(item,index) in Messagelist">
                <img src="../static/images/newWallet/notice.png" @click="noticeDetail(item.id)">
                <span @click="noticeDetail(item.id)">重要通知：{{item.content}}</span>
                <img src="../static/images/newWallet/closebutton.png" @click="tagread(item.id)">
            </div>
            <div class="assetdetails">
                <!--            <div v-show="false">-->
                <!--                <div>-->
                <!--                    <P>可用总额</P>-->
                <!--                    <P>￥<span v-if="show==1">6520.35</span><span v-if="show==0">****.**</span></P>-->
                <!--                </div>-->
                <!--                <div>-->
                <!--                    <P>委托总额</P>-->
                <!--                    <P>￥<span v-if="show==1">6520.35</span><span v-if="show==0">****.**</span></P>-->
                <!--                </div>-->
                <!--            </div>-->

                <div @click="goIncomeexpendituredetails('HALE')" class="CurrencyBalance">
                    <div>
                        <img src="../static/images/newWallet/icon_HALE2.png">
                        <span>HALE</span>
                    </div>
                    <div>
                        <P><span v-if="show==1">{{balance|tofixed6}}</span><span v-if="show==0">****.****</span></P>
                        <P>￥<span
                                v-if="show==1">{{balance*usdtPrice.usdtCny*usdtPrice.haleUsdt.firstPrice|tofixed4}}</span><span
                                v-if="show==0">****.**</span></P>
                    </div>
                </div>
                <div v-for="(item,index) in contractlist" @click="goIncomeexpendituredetails(item.currency,index,item.quotes,item.tokenIcon)"
                     class="CurrencyBalance">
                    <div>
                        <img :src="item.tokenIcon">
                        <span>{{item.currency}}</span>
                    </div>
                    <div>
                        <P><span v-if="show==1&&contractPrice[index]!==undefined">{{contractPrice[index].balance|tofixed6}}</span><span v-if="show==0">****.****</span>
                        </P>
                        <P>￥<span v-if="show==1&&contractPrice[index]!==undefined">{{contractPrice[index].RmbBalance|tofixed4}}</span><span
                                v-if="show==0">****.**</span>
                        </P>
                    </div>
                </div>
                <!--            <div @click="goIncomeexpendituredetails('EDC')"  class="CurrencyBalance">-->
                <!--                <div>-->
                <!--                    <img src="../static/images/chmclogo.png">-->
                <!--                    <span>EDC</span>-->
                <!--                </div>-->
                <!--                <div>-->
                <!--                    <P><span v-if="show==1">{{Edcbalance|tofixed6}}</span><span v-if="show==0">****.****</span></P>-->
                <!--                    <P>￥<span v-i   f="show==1">{{RmbEdcbalance|tofixed4}}</span><span v-if="show==0">****.**</span></P>-->
                <!--                </div>-->
                <!--            </div>-->
            </div>
            <div>

            </div>
        </div>


        <div class="ethmin" v-if="CurrentlyselectedWallet==2">
            <div class="assetdetails">
                <div class="currencyBalanceBackground">
                    <div>{{walltname}}<img src="../static/images/newWallet/icon_yj.png" @click="hide()"></div>
                    <div>{{addrees|addressFormat}}<img src="../static/images/newWallet/icon_imgcode.png"
                                                       @click="qcode()"></div>
                    <div>
                        ￥<span v-if="show==1">{{Totalbalance|tofixed4}}</span><span
                            v-if="show==0">****.**</span>
                    </div>
                </div>
            </div>
            <div class="notice" v-for="(item,index) in Messagelist" >
                <img src="../static/images/newWallet/notice.png" @click="noticeDetail(item.id)">
                <span @click="noticeDetail(item.id)">重要通知：{{item.content}}</span>
                <img src="../static/images/newWallet/closebutton.png" @click="tagread(item.id)">
            </div>
            <div class="assetdetails">
                <!--            <div v-show="false">-->
                <!--                <div>-->
                <!--                    <P>可用总额</P>-->
                <!--                    <P>￥<span v-if="show==1">6520.35</span><span v-if="show==0">****.**</span></P>-->
                <!--                </div>-->
                <!--                <div>-->
                <!--                    <P>委托总额</P>-->
                <!--                    <P>￥<span v-if="show==1">6520.35</span><span v-if="show==0">****.**</span></P>-->
                <!--                </div>-->
                <!--            </div>-->

                <div @click="goIncomeexpendituredetails('ETH')" class="CurrencyBalance">
                    <div>
                        <img src="../static/images/newWallet/eth.png">
                        <span>ETH</span>
                    </div>
                    <div>
                        <P><span v-if="show==1">{{balance|tofixed6}}</span><span v-if="show==0">****.****</span></P>
                        <P>￥<span
                                v-if="show==1">{{balance*usdtPrice.usdtCny *ethRmb|tofixed4}}</span><span
                                v-if="show==0">****.**</span></P>
                    </div>
                </div>
                <div v-for="(item,index) in contractlist" @click="goIncomeexpendituredetails(item.currency,index,item.quotes,item.tokenIcon)"
                     class="CurrencyBalance">
                    <div>
                        <img :src="item.tokenIcon">
                        <span>{{item.currency}}</span>
                    </div>
                    <div>
                        <P><span v-if="show==1&&contractPrice[index]!==undefined">{{contractPrice[index].balance|tofixed6}}</span><span v-if="show==0">****.****</span>
                        </P>
                        <P>￥<span v-if="show==1&&contractPrice[index]!==undefined">{{contractPrice[index].RmbBalance|tofixed4}}</span><span
                                v-if="show==0">****.**</span>
                        </P>
                    </div>
                </div>
                <!--            <div @click="goIncomeexpendituredetails('EDC')"  class="CurrencyBalance">-->
                <!--                <div>-->
                <!--                    <img src="../static/images/chmclogo.png">-->
                <!--                    <span>EDC</span>-->
                <!--                </div>-->
                <!--                <div>-->
                <!--                    <P><span v-if="show==1">{{Edcbalance|tofixed6}}</span><span v-if="show==0">****.****</span></P>-->
                <!--                    <P>￥<span v-i   f="show==1">{{RmbEdcbalance|tofixed4}}</span><span v-if="show==0">****.**</span></P>-->
                <!--                </div>-->
                <!--            </div>-->
            </div>
            <div>

            </div>

        </div>

        <nlayer
                :visible="feeTipVisible"
                @close="feeTipDigClose"
                class="ANIMATITE_LEFT_TO_RIGHT"
                height="100%"
                :zIndex="999"
        >
            <div class="asset_sidebar">
                <div class="sidebar_content">
                    <div class="sidebar_title">
                        <p class="sidebar_txt1">切换钱包</p>
                        <!--                        <div class="sidebar_icon"-->
                        <!--                             @click="toClose"-->
                        <!--                        ></div>-->
                    </div>
                    <div class="sidebar_scroll">
                        <div class="sidebar_list_wrapper" v-if="userList.length">
                            <div class="sidebar_list_padding scroll">
                                <div class="sidebar_list">
                                    <div class="sidebar_itemaddress"
                                         v-for="(item, index) in userList"
                                         :key="index"
                                         @click="selectUser"
                                         :data-id="index"
                                         :data-name="item.name"
                                         :data-accounts="item.accounts"
                                         :class="[item.active ? 'active' : '']"
                                    >
                                        <p class="sidebar_txt3">{{item.name}}</p>
                                        <p class="sidebar_txt3">{{accountlist[index]|addressFormat}}</p>
                                        <p class="sidebar_txt3">{{balancelist[index] | tofixed4}} <span
                                                v-if="CurrentlyselectedWallet==1">  HALE</span>
                                            <span v-if="CurrentlyselectedWallet==2">  ETH</span></p>
                                        <div class="sidebar_active_icon"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sidebar_list_wrapperimport">
                            <div class="sidebar_list_padding">
                                <!--                                <p class="sidebar_txt2">{{$t('sidebar.sidebar_other')}}</p>-->
                                <div class="sidebar_listaddimport">
                                    <div class="sidebar_item"
                                         @click="toRegister"
                                    >
                                        <div class="sidebar_item_pic sidebar_item_create"></div>
                                        <p class="sidebar_txt3">创建钱包</p>
                                    </div>
                                    <div class="sidebar_item"
                                         @click="toImport"
                                    >
                                        <div class="sidebar_item_pic sidebar_item_import"></div>
                                        <p class="sidebar_txt3">{{$t('sidebar.sidebar_import')}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </nlayer>
        <nlayer
                :maskCancel="false"
                maskBackgroundColor="rgba(0,0,0,0.1)"
                :visible="loadingVisible"
                class="NLOADING"
                :zIndex="1001"
        >
            <div class="LOADING">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                     y="0px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve" width="0.8rem"
                     height="0.8rem">
                    <path opacity="0.1" fill="#fff"
                          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
                    <path fill="#fff"
                          d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20"
                                          to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
                <p class="LOADING_TXT">{{$t('layerdate.layerdate_changeing')}}</p>
            </div>
        </nlayer>
        <div class="mb" v-if="switchingchain">
            <div>
                <div @click="Switchingchains('HALE')">HALE</div>
                <div @click="Switchingchains('ETH')">ETH</div>
                <div @click="closeswitcchain">取消</div>
            </div>
        </div>
        <div class="mbs" v-if="tipss">
            <div class="tips">
                <div>
                    提示
                </div>
                <div>
                    {{tiptext}}
                </div>
                <div>
                    <div @click="goCreate">
                        确定
                    </div>

                    <div  @click="closetip">
                        取消
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {addaccountsss, Importprivatekey, Existingaccounts, Ethtohelle,Halletoeth, getPrivat} from '../util/dip.js'
    import Nlayer from '@/components/Nlayer'
    import Web3 from 'web3'
    import {mapGetters, mapActions} from 'vuex'
    import {sourceUrl} from '@/config'
    import txu from '@/util/txUtil'
    import jsonAjax from '../util/restUtil.js';

    const Tx = require('ethereumjs-tx');

    import urlUtil from "../util/apiUtil";
    import axios from 'axios'

    export default {
        name: "Asset",
        components: {
            Nlayer
        },
        data() {
            return {
                updateDialog: null,
                addrees: "",
                feeTipVisible: false,
                userList: [],
                accountlist: [],
                balancelist: [],
                loadingVisible: false,
                show: 1,
                walltname: "",
                web3: {},
                ethweb3: {},
                balance: "",
                Rmbbalance: "",
                // Tokenname:"",
                Tokenbalance: "",
                RmbTokenbalance: "",
                Edcbalance: "",
                RmbEdcbalance: "",
                switchingchain: false,
                contractlist: [],
                usdtPrice: {
                    haleUsdt:{
                        firstPrice:0
                    }
                },
                contractPrice: [],
                Totalbalance: 0,
                contracthalelist: [],
                Messagelist: [],
                HalleDoesItExist: localStorage.getItem("vaultlist") !== null ? true : false,
                ETHDoesItExist: localStorage.getItem("ethvaultlist") !== null ? true : false,
                CurrentlyselectedWallet: localStorage.getItem("CurrentlyselectedWallet"),
                tipss:"",
                tiptext:"",
                ethRmb:""
            }
        },
        computed: {
            userinfo(){
                return this.getUserinfo()
            },
            userId(){
                return this.userinfo.customerId
            },
            updateDetail(){
                return this.getUpdateDetail()
            },
            needUpdate(){
                return this.getNeedUpdate()
            },
        },
        mounted() {
            var that = this;
            this.web3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalance"));
            this.ethweb3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalanceeth"));
            that.getbalances()
            // Halletoeth("halle1p4g7cjpmnay373efqphqqd3jk9hnm7fa0z0txg").then((res) => {
            //     console.log(res)
            // })
            // alert(1)
            // 单钱包变成多钱包的值替换判断
            if (localStorage.getItem("assetaddress") !== null) {
                if (localStorage.getItem("vaultlist") !== null) {

                } else {
                    var vaultlist = [
                        {
                            name: localStorage.getItem("walltname"),
                            accounts: localStorage.getItem("assetaddress"),
                            active: true,
                            vault: JSON.parse(localStorage.getItem("vault")).vault
                        },
                    ]
                    localStorage.setItem("vaultlist", JSON.stringify(vaultlist))
                }

            }
            // 判断是否要更新
            if (this.needUpdate == -1) {
                this.setNeedUpdate()
            } else {
                if (this.needUpdate) {
                    this.createUpdateDialog()
                    this.updateDialog.open()
                }
            }
            that.show = localStorage.getItem("show")
            // that.userList = JSON.parse(localStorage.getItem("Addressinformation"))
            that.nameandlist()
            that.Ethhelle()
            that.getBalancelist()

        },
        methods: {
            ...mapActions(['setUserNoticeState', 'setNeedUpdate', 'setUserinfo', 'setUsers', 'removeUserinfo', 'setSidebars']),
            ...mapGetters(['getUserinfo', 'getSystemNotice', 'getTransferNotice', 'getNeedUpdate', 'getUpdateDetail', 'getSidebars']),
            closetip(){
                this.tipss=false
            },
            goCreate(){
                if (this.CurrentlyselectedWallet==1){
                    if (JSON.parse(localStorage.getItem("userinfoall")).ethAddress=="") {

                        this.$push({
                            path: '/walletCreate'
                        })
                    }else {
                        this.$push({
                            path: '/walletImport'
                        })
                    }
                }else {
                    if (JSON.parse(localStorage.getItem("userinfoall")).haleAddress=="") {
                        this.$push({
                            path: '/walletCreate'
                        })
                    }else {
                        this.$push({
                            path: '/walletImport'
                        })
                    }
                }

                localStorage.setItem("Currentlyselectedcurrency",this.CurrentlyselectedWallet==1?"ETH":"HALE")

            },
            openswitchchain() {
                this.switchingchain = true
            },
            closeswitcchain() {
                this.switchingchain = false
            },
            Switchingchains(i) {
                this.switchingchain = false
                if (this.CurrentlyselectedWallet==1&&i=="HALE"){
                    return
                }
                if (this.CurrentlyselectedWallet==2&&i=="ETH"){
                    return
                }
                this.accountlist=[]
                if (i == "HALE") {
                    if(this.HalleDoesItExist){
                        this.CurrentlyselectedWallet = 1
                        axios.get(urlUtil.getApiUrl("api_rootlist") + "/v1/two_auth/generateDCI", {
                            params: {address: localStorage.getItem("assetaddress")}
                        },).then((res) => {
                            console.log(res.data.Bind)
                            if (res.data.Bind){
                                localStorage.setItem("googleVerification",1)
                            }else {
                                localStorage.setItem("googleVerification",0)
                            }
                        })
                        this.nameandlist()
                    }else {
                        this.tipss=true
                        if (JSON.parse(localStorage.getItem("userinfoall")).haleAddress==""){
                            this.tiptext="无当前链钱包是否前往创建"
                        }else {
                            this.tiptext="未导入当前链绑定钱包前往导入"

                        }
                    }

                } else {
                    if(this.ETHDoesItExist) {
                        this.CurrentlyselectedWallet = 2
                        axios.get(urlUtil.getApiUrl("api_rootlist") + "/v1/two_auth/generateDCI", {
                            params: {address: localStorage.getItem("ethassetaddress")}
                        },).then((res) => {
                            console.log(res.data.Bind)
                            if (res.data.Bind){
                                localStorage.setItem("googleVerification",1)
                            }else {
                                localStorage.setItem("googleVerification",0)
                            }
                        })
                        this.nameandlist()
                    }else {
                        this.tipss=true
                        if (JSON.parse(localStorage.getItem("userinfoall")).ethAddress==""){
                            this.tiptext="无当前链钱包是否前往创建"
                        }else {
                            this.tiptext="未导入当前链绑定钱包前往导入"
                        }
                    }

                }
                localStorage.setItem("CurrentlyselectedWallet", this.CurrentlyselectedWallet)
                this.contractPrice = []
                this.contractlist=[]
                this.Ethhelle()
                this.getBalancelist()
                this.getbalances()
            },
            nameandlist() {
                var that = this;
                if (this.CurrentlyselectedWallet == 1) {
                    that.userList = JSON.parse(localStorage.getItem("vaultlist"))
                    that.walltname = localStorage.getItem("walltname")
                } else {
                    that.userList = JSON.parse(localStorage.getItem("ethvaultlist"))
                    that.walltname = localStorage.getItem("ethwalltname")
                }
            },
            Ethhelle() {
                var that = this;
                that.Messagelists()
                if (this.CurrentlyselectedWallet == 1) {
                    Ethtohelle(localStorage.getItem("assetaddress")).then((res) => {
                        that.addrees = res;
                    })
                } else {
                    that.addrees = localStorage.getItem("ethassetaddress");
                }

            },
            // 消息列表
            Messagelists() {
                var that = this;
                //获取消息列表
                jsonAjax.get(urlUtil.getApiUrl("getPushMsg"), {
                    userId: this.userId,
                    type:1
                },function (res) {
                    if (res.returnCode==1){
                        that.Messagelist=res.resultData
                    }
                    console.log( that.Messagelist)
                })
            },
            // 创建版本更新弹窗
            createUpdateDialog(){
                const h = this.$createElement
                // const cons = this.updateDetail.content.replace(/(\r\n)|(\n)/g,'<br/>');
                // console.log(cons)
                const content = h('div', {
                    class: 'DIALOG'
                },[
                    h('div', {class: 'DIALOG_TITLE'}, this.updateDetail.editionNum + this.$t('aboutUs.aboutUs_edition')),
                    h('div', {class: 'DIALOG_CONTENT'}, this.updateDetail.content),
                    h('div', {class: 'DIALOG_BTNS clearfix'}, [
                        h('div', {
                            class: 'DIALOG_BTN CONFIRM',
                            on: {
                                click: () => {
                                    this.openPage()
                                }
                            }
                        }, this.$t('aboutUs.aboutUs_update'))
                    ]),
                ])

                this.updateDialog = this.$layer({
                    content,
                    width: '80%',
                    maskCancel: false
                })
            },
            openPage() {
                window.plus && window.plus.runtime.openURL(this.updateDetail)
            },
            async getBalancelist() {
                var that = this;
                const web3 = this.web3;
                // console.log(that.userList[0].account)
                for (var i = 0; i < that.userList.length; i++) {
                    // var str={balance:"",balancetoken:""}
                    if (this.CurrentlyselectedWallet == 1) {
                        Ethtohelle(that.userList[i].accounts).then((res) => {
                            that.accountlist.push(res);
                        })
                    } else {
                        that.accountlist.push(that.userList[i].accounts);
                    }
                    if(that.CurrentlyselectedWallet==1) {
                        this.web3.eth.getBalance(that.userList[i].accounts, function (err, value) {
                            this.balancelist.push(value / 1000000)
                            if (err) {
                                this.balance = ''
                                this.msg = '未获取到余额'
                                console.warn(err.message)
                                return
                            }
                        }.bind(this))
                    }else{
                        this.ethweb3.eth.getBalance(that.userList[i].accounts, function (err, value) {
                            this.balancelist.push(value / 1000000)
                            if (err) {
                                this.balance = ''
                                this.msg = '未获取到余额'
                                console.warn(err.message)
                                return
                            }
                        }.bind(this))
                    }

                }
                console.log(that.accountlist, that.balancelist)
            },
            getbalances() {
                var that = this;
                var address=this.CurrentlyselectedWallet==1?localStorage.getItem("assetaddress"):localStorage.getItem("ethassetaddress")
                this.$http.get('http://120.77.247.234:8984/js/hCurrencyRate/findCurrencyParameter', {
                    currency: "haleusdt"
                }).then((res) => {
                    that.usdtPrice = res.result;
                        jsonAjax.get(urlUtil.getApiUrl("findTokenManage"), {
                            currency:this.CurrentlyselectedWallet==1?"HALE":"ETH"
                        }, function (res) {
                            that.ethRmb=res.resultData.ethPrice
                            that.contractlist = res.resultData.tokenManage
                            if(that.CurrentlyselectedWallet==1) {
                                that.web3.eth.getBalance(address, function (err, value) {
                                    that.balance = value / 1000000
                                    that.Totalbalance = value / 1000000 * that.usdtPrice.usdtCny * that.usdtPrice.haleUsdt.firstPrice
                                    console.log('-------getBalance--------value-------' + value)
                                    if (err) {
                                        that.balance = ''
                                        that.msg = '未获取到余额'
                                        console.warn(err.message)
                                        return
                                    }
                                }.bind(that))
                            }else{
                                that.ethweb3.eth.getBalance(address, function (err, value) {
                                    that.balance = value / 1000000000000000000
                                    console.log(that.usdtPrice.usdtCny , that.ethRmb)
                                    that.Totalbalance = value / 1000000000000000000 * that.usdtPrice.usdtCny * that.ethRmb
                                    console.log('-------getBalance--------value-------' + value)
                                    if (err) {
                                        that.balance = ''
                                        that.msg = '未获取到余额'
                                        console.warn(err.message)
                                        return
                                    }
                                }.bind(that))
                            }
                            for (var i = 0; i < that.contractlist.length; i++) {
                                var index=that.contractlist[i].quotes;
                                // // console.log(index)
                                // // console.log(that.contractlist[index].quotes)
                                //
                                // that.getBalance(address, that.contractlist[i].contractPath,index).then((ress) => {
                                //     // that.contractPrice.push({balance: ress, RmbBalance: ress * that.usdtPrice.usdtCny* that.contractlist[i-1].quotes})
                                //     // that.Totalbalance += ress * that.usdtPrice.usdtCny* that.contractlist[i-1].quotes
                                // })
                                Ethtohelle(res.resultData.tokenManage[i].contractPath).then((res) => {
                                    that.contracthalelist.push(res);
                                })
                                that.getBalance(address, res.resultData.tokenManage[i].contractPath,index).then((ress) => {
                                    console.log(ress,"ressressressressress")
                                    that.contractPrice.push(ress)
                                    that.Totalbalance+=ress.RmbBalance
                                    // that.contractPrice.push({balance: ress, RmbBalance: ress * that.usdtPrice.usdtCny* that.contractlist[i-1].quotes})
                                    // that.Totalbalance += ress * that.usdtPrice.usdtCny* that.contractlist[i-1].quotes
                                })

                            }
                        })
                })
            },
            // 获取给定地址余额
            async getBalance(fromAddress, contractPath,quotes) {
                var that = this;
                const _from = fromAddress;
                const web3 = this.web3;
                const ethweb3 = this.ethweb3;

                //代币chmc余额
              if(that.CurrentlyselectedWallet==1) {
                  await txu.balanceOf(web3, _from, contractPath).then((res) => {
                        that.Tokenbalance = res / 1000000000000000000
                      // that.contractPrice.push({balance: that.Tokenbalance, RmbBalance: that.Tokenbalance * that.usdtPrice.usdtCny* quotes})
                      // that.Totalbalance += that.Tokenbalance * that.usdtPrice.usdtCny * quotes
                    })
                }else {
                  await txu.balanceOf(ethweb3, _from, contractPath).then((res) => {
                        that.Tokenbalance = res / 1000000
                    })
                }
                return {balance:that.Tokenbalance,RmbBalance:that.Tokenbalance * that.usdtPrice.usdtCny* quotes}
            },
            //跳转记录页
            goIncomeexpendituredetails(currency, i,q,icon) {
                var that = this;
                if (currency=="HALE"||currency=="ETH"){
                    if (currency=="HALE"){
                        this.$push({
                            path: '/Incomeexpendituredetails',
                            query: {
                                currency: currency,
                                contractpath: that.contracthalelist[i],
                                quotes:that.usdtPrice.haleUsdt.firstPrice
                            }
                        })
                    }else{
                        this.$push({
                            path: '/Incomeexpendituredetails',
                            query: {
                                currency: currency,
                                contractpath: that.contracthalelist[i],
                                quotes:that.ethRmb
                            }
                        })
                    }

                }else{
                    this.$push({
                        path: '/Incomeexpendituredetails',
                        query: {
                            currency: currency,
                            contractpath: that.contracthalelist[i],
                            contract:  that.contractlist[i].contractPath,
                            quotes:q,
                            icon:icon
                        }
                    })
                }

            },
            // addaccount(){
            //     Importprivatekey()
            // }
            hide() {
                if (this.show == 1) {
                    localStorage.setItem("show", 0)
                    this.show = 0
                } else {
                    localStorage.setItem("show", 1)
                    this.show = 1
                }
            },
            //
            tagread(id) {
                var that = this;
                //获取消息列表
                jsonAjax.get(urlUtil.getApiUrl('markReadMsg'), {
                    userId: this.userId,
                    id:id,
                    msgType: 6,
                    type:1
                }, function (res) {
                    that.Messagelists()
                })
            },
            // 选择
            selectUser(e) {
                var that = this;
                const {
                    id,
                    accounts,
                    name
                } = e.currentTarget.dataset
                // console.log(id)
                // 打开加载层
                this.showLoading()
                this.userList.forEach((item, i) => {

                    if (i == id) {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })

                setTimeout(function () {
                    that.closeLoading()
                    if (that.CurrentlyselectedWallet == 1) {
                        localStorage.setItem("assetaddress", accounts)
                        localStorage.setItem("walltname", name)
                        localStorage.setItem("vaultlist", JSON.stringify(that.userList))
                    } else {
                        localStorage.setItem("ethassetaddress", accounts)
                        localStorage.setItem("ethwalltname", name)
                        localStorage.setItem("ethvaultlist", JSON.stringify(that.userList))
                    }

                    that.walltname = name;
                    that.Ethhelle()
                    that.contractPrice = []
                    that.getbalances()

                }, 150)

            },
            // 去通知详情
            noticeDetail(id) {
                this.$push({
                    path: '/noticeDetail',
                    query: {
                        id: id
                    }
                })
            },
            // 去注册
            toRegister() {
                // 关闭侧边栏
                this.feeTipDigClose()
                this.$push({
                    path: '/Wallettype',
                    query: {
                        type: 1
                        // 1创建 2导入
                    }
                })

            },
            // 去导入
            toImport() {

                // 关闭侧边栏
                this.feeTipDigClose()
                this.$push({
                    path: '/Wallettype',
                    query: {
                        type: 2
                        // 1创建 2导入
                    }
                })
            },
            toOpen() {
                this.feeTipVisible = true
            },
            feeTipDigClose() {
                this.feeTipVisible = false
            },
            toClose() {
                this.feeTipVisible = false
            },
            // 打开加载
            showLoading() {
                // console.log('执行了')
                this.loadingVisible = true
            },
            // 关闭加载层
            closeLoading() {
                this.loadingVisible = false
            },
            qcode() {
                this.$push({
                    path: '/currencyCollect',
                    query: {
                        addrees: this.addrees,
                        currency:this.CurrentlyselectedWallet==1?"HALE":"ETH"
                    }
                })
            }
        }

    }
</script>

<style scoped>
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
    .mb {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        left: 0;
        top: 0;
    }

    .mb > div {
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: white;
        border-top-left-radius: .4rem;
        border-top-right-radius: .4rem;
    }

    .mb > div > div {
        font-size: .3rem;
        font-weight: bold;
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #EEEEEE;
        margin: 0 .3rem;
    }

    .mb > div > div:nth-of-type(3) {
        margin: 0;
        border-top: .2rem solid #eeeeee;
    }

    .notice {
        border-radius: .2rem;
        white-space: nowrap;
        width: 6.3rem;
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
        background: #8E398C;
        margin: 0 auto;
        margin-top: .2rem;
        color: white;
        line-height: .7rem;
    }

    .notice > span {
        font-size: .22rem;
        display: inline-block;
        width: 5rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .notice > img:nth-of-type(1) {
        margin-top: .15rem;
        width: .4rem;
        height: .4rem;
    }

    .notice > img:nth-of-type(2) {
        margin-top: .2rem;
        width: .3rem;
        height: .3rem;
    }

    .header {
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
        height: .88rem;
        line-height: .88rem;
        background: white;
    }

    .header div:nth-of-type(1) img:nth-of-type(1) {
        margin-top: .19rem;
        width: .5rem;
        height: .5rem;
    }

    .header div:nth-of-type(1) img:nth-of-type(2) {
        margin-top: .35rem;
        margin-left: .15rem;
        width: .25rem;
        height: .2rem;
    }

    .header div:nth-of-type(1) {
        display: flex;
        justify-content: space-between;
    }

    .header div:nth-of-type(1) span {
        font-size: .3rem;
        font-weight: bold;
        margin-left: .15rem;
    }

    .header div:nth-of-type(2) img {
        margin-top: .24rem;
        width: .4rem;
        height: .4rem;
    }

    .assetdetails {
        width: 6.9rem;
        margin: 0 auto;
        padding-top: .2rem;
    }

    .assetdetails > .currencyBalanceBackground {
        padding: .3rem;
        color: white;
        background: url(../static/images/newWallet/assetbackground.png);
        background-size: 100%;
        width: 6.3rem;
        height: 1.9rem;

    }

    .assetdetails > .currencyBalanceBackground > div:nth-of-type(1), .assetdetails > .currencyBalanceBackground > div:nth-of-type(2) {
        display: flex;

    }

    .assetdetails > .currencyBalanceBackground > div:nth-of-type(1) img {
        width: .3rem;
        height: .3rem;
    }

    .assetdetails > .currencyBalanceBackground > div:nth-of-type(1) {
        font-size: .3rem;
    }

    .assetdetails > .currencyBalanceBackground > div:nth-of-type(2) {
        font-size: .24rem;
    }

    .assetdetails > .currencyBalanceBackground > div:nth-of-type(2) img {
        margin-top: .075rem;
        margin-left: .15rem;
        width: .3rem;
        height: .3rem;
    }

    .assetdetails > .currencyBalanceBackground > div:nth-of-type(1) {
        margin-bottom: .1rem;
        justify-content: space-between;
    }

    .assetdetails > .currencyBalanceBackground > div:nth-of-type(3) {
        font-size: .54rem;
        font-weight: bold;
        margin-top: .25rem;
    }

    /*.assetdetails > div:nth-of-type(2) {*/
    /*    color: #070707;*/
    /*    display: flex;*/
    /*    width: 6.9rem;*/
    /*    margin: 0 auto;*/
    /*    margin-top: .2rem;*/
    /*    justify-content: space-between;*/
    /*}*/

    /*.assetdetails > div:nth-of-type(2) div {*/
    /*    width: 2.7rem;*/
    /*    height: .9rem;*/
    /*    padding: .2rem .3rem;*/
    /*    background: white;*/
    /*    border-radius: .2rem;*/
    /*}*/

    /*.assetdetails > div:nth-of-type(2) div p:nth-of-type(1) {*/
    /*    font-size: .24rem;*/
    /*}*/

    /*.assetdetails > div:nth-of-type(2) div p:nth-of-type(2) {*/
    /*    font-size: .42rem;*/
    /*    font-weight: bold;*/
    /*}*/

    .assetdetails > .CurrencyBalance {
        margin-top: .2rem;
        border-radius: .2rem;
        display: flex;
        width: 6.3rem;
        padding: .2rem .3rem;
        height: .9rem;
        line-height: .9rem;
        background: white;
        justify-content: space-between;
    }

    .assetdetails > .CurrencyBalance > div:nth-of-type(1) {
        display: flex;

    }

    .assetdetails > .CurrencyBalance > div:nth-of-type(1) img {
        width: .9rem;
        height: .9rem;
    }

    .assetdetails > .CurrencyBalance > div:nth-of-type(1) span {
        font-size: .3rem;
        margin-left: .15rem;
    }

    .assetdetails > .CurrencyBalance > div:nth-of-type(2) {
        line-height: .4rem;
        text-align: right;
        font-size: .3rem;
        font-weight: bold;
        margin-top: .025rem;
    }

    .asset_sidebar {
        position: relative;
        /*top: 0;*/
        /*left: 0;*/
        /*right: 2.5rem;*/
        /*bottom: 0;*/
        /*width: 7.5rem;*/
        height: 100%;
        /*z-index: 999;*/
    }

    .sidebar_scroll {
        position: absolute;
        top: 1.2rem;
        left: 0;
        width: 100%;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        overflow-scrolling: touch;
    }

    .sidebar_content {
        height: 100%;
        width: 5rem;
        /*background: #fafafa;*/
    }

    .sidebar_title {
        width: 100%;
        height: 0.88rem;
    }

    .sidebar_txt1 {
        background: white;
        font-size: 0.32rem;
        color: #070707;
        height: 1.2rem;
        line-height: 1.2rem;
        /*padding-top: 0.4rem;*/
        margin-left: 0.3rem;
    }

    .sidebar_icon {
        background: url("../static/images/icon/sidebar_up.png") no-repeat center center / cover;
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        right: 0.3rem;
        bottom: 0.15rem;
    }

    .sidebar_list_wrapper {
        background: #fafafa;
    }

    .sidebar_list_wrapperimport {
        position: absolute;
        bottom: .5rem;
        left: 0;
        width: 100%;
    }

    .sidebar_list_padding {

        background: #fff;
        padding: 0 0.3rem;
    }

    .scroll {
        overflow: scroll;
        height: 10rem;
    }

    .sidebar_txt2 {
        font-size: 0.3rem;
        color: #333;
        line-height: 0.8rem;
        padding-top: 0.2rem;
    }

    .sidebar_item {
        padding: 0.2rem;
        position: relative;
    }

    .sidebar_itemaddress.active {
        opacity: 1;
        color: #070707;
        position: relative;
        border: 1px solid #FE7940;
    }

    .sidebar_itemaddress p {
        line-height: .4rem;
    }

    .sidebar_itemaddress p:nth-of-type(1) {
        font-size: .24rem;
        font-weight: bold;
    }

    .sidebar_itemaddress p:nth-of-type(3) {
        line-height: .65rem;
        font-size: .3rem;
        font-weight: bold;
    }

    .sidebar_itemaddress.active .sidebar_active_icon {
        background: url("../static/images/newWallet/chebox.png") no-repeat center center / cover;
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        top: .2rem;
        transform: translateY(-50%);
        right: 0rem;
    }

    .sidebar_active_icon {

    }

    .sidebar_item_pic {
        width: 0.9rem;
        height: 0.9rem;
    }

    .sidebar_item_default {
        background: url("../static/images/default/default_headImg.png") no-repeat center center / cover;
    }

    .sidebar_item_create {
        background: url("../static/images/newWallet/icon_add.png") no-repeat center center / cover;
    }

    .sidebar_item_import {
        background: url("../static/images/newWallet/icon_import.png") no-repeat center center / cover;
    }

    .sidebar_itemaddress {
        opacity: 0.5;
        margin-top: .2rem;
        padding: .2rem;
        border-radius: .2rem;
        border: 1px solid #CCCCCC;
        height: 1.45rem;
    }

    .sidebar_txt3 {
        font-size: 0.24rem;
        color: #333;
        line-height: 0.3rem;

    }

    .sidebar_listaddimport {
        display: flex;
        justify-content: space-around;
    }

    .LOADING_TXT {
        color: white;
        padding-left: 0.15rem;
        padding-right: .15rem;
    }

    .page {
        overflow: scroll;
        background: #f5f5f5;
    }
</style>

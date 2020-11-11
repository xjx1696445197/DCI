<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">付款</p>
        </div>
        <div class="wrapper">
            <div class="content">
                <div class="inputBox">
                    <div class="inputBox_top">
                        <p class="inputBox_label">地址</p>
                        <div class="HEADER_RIGHT scan" @click="toScan"></div>
                    </div>
                    <div class="inputBox_sub">
                        <input
                                type="text"
                                class="INPUT2"
                                placeholder="请输入地址"
                                v-model="address"
                        >
                    </div>
                </div>
                <div class="inputBox">
                    <div class="inputBox_top">
                        <p class="inputBox_label">付款数量</p>
                    </div>
                    <div class="inputBox_sub">
                        <input
                                type="number"
                                class="INPUT2"
                                placeholder="请输入数量"
                                v-model="inputAmount"
                        >
                        <div class="inputBox_view">
                            <div class="inputBox_view_top">
                                <div class="inputBox_l">
                                    <p class="inputBox_usable inputBox_txt1">可以余额：<span v-if="currency=='HALE'||currency=='ETH'">{{mainbalance|tofixed6}}</span> <span v-else>{{balance|tofixed6}}</span>{{currency}}</p>
                                </div>
                                <div class="inputBox_r">
                                    <p class="inputBox_txt2" @click="allTransfer">全部付款</p>
                                </div>
                            </div>
                            <!--                            <div class="inputBox_view_sub">-->
                            <!--                                <p class="inputBox_txt3">{{$t('currencyDetail.currencyDetail_fee')}} {{detail.fee}} {{currencyName}}</p>-->
                            <!--                            </div>-->
                        </div>
                    </div>
                </div>
                <!-- <div class="inputBox">
                    <div class="inputBox_top">
                        <p class="inputBox_label">备注</p>
                    </div>
                    <div class="inputBox_sub">
                        <input
                                type="text"
                                class="INPUT2"
                                placeholder="备注"
                                v-model="remarks"
                        >
                        <div class="inputBox_view">
                            <div class="inputBox_view_top">
                                <div class="inputBox_l">
                                    <p class="inputBox_usable inputBox_txt1">最多可输入100位字符（选填）</p>
                                </div>

                            </div> -->
                <!--                            <div class="inputBox_view_sub">-->
                <!--                                <p class="inputBox_txt3">{{$t('currencyDetail.currencyDetail_fee')}} {{detail.fee}} {{currencyName}}</p>-->
                <!--                            </div>-->
                <!-- </div>
            </div>
        </div> -->

                <div class="inputBox" v-if="!checkedStatus">
                    <div class="inputBox_sub">
                        <input
                                type="text"
                                class="INPUT2"
                                placeholder="请输入数量"
                                v-model="gaslimit"
                        >
                        <div class="inputBox_view">
                            <div class="inputBox_view_top">
                                <div class="inputBox_l">
                                    <p class="inputBox_usable inputBox_txt1">
                                        输入你愿意在本次交易中花费的最大Gas数量，请设置足够的Gas
                                        来确保交易被执行。
                                    </p>
                                </div>
                            </div>
                            <!--                            <div class="inputBox_view_sub">-->
                            <!--                                <p class="inputBox_txt3">{{$t('currencyDetail.currencyDetail_fee')}} {{detail.fee}} {{currencyName}}</p>-->
                            <!--                            </div>-->
                        </div>
                    </div>
                </div>
                <div class="inputBox">
                    <div class="inputBox_top">
                        <p class="inputBox_label">手续费 (<span v-if="currency!=='ETH'&&currency!=='USDT'">{{demo.demo8.value[0]*gasPrice*gaslimit/1000000||
                            demo.demo8.value*gasPrice*gaslimit/1000000|tofixed4}} </span><span v-else>{{demo.demo8.value[0]*gasPrice*gaslimit/1000000000000000000||
                            demo.demo8.value*gasPrice*gaslimit/1000000000000000000|tofixed6}} </span><span
                                v-if="currency!=='ETH'&&currency!=='USDT'">HALE</span> <span v-else>ETH</span>)</p>
                    </div>
                </div>
                <div class="inputBox_sub">
                    <input
                            type="text"
                            class="INPUT2"
                            v-model="freight"
                            disabled="disabled"
                    >
                </div>
                <!--                <div class="inputBox_view">-->
                <!--                    <div class="inputBox_view_top">-->
                <!--                        <div class="inputBox_l">-->
                <!--                            <p class="inputBox_usable inputBox_txt1"></p>-->
                <!--                        </div>-->
                <!--&lt;!&ndash;                        <div class="inputBox_rs">&ndash;&gt;-->
                <!--&lt;!&ndash;                            <input type="checkbox" v-if="checkedStatus" @click = "select()">&ndash;&gt;-->
                <!--&lt;!&ndash;                            <img v-if="!checkedStatus"  @click = "select()" src="../static/images/newWallet/icon_chebox.png">&ndash;&gt;-->
                <!--&lt;!&ndash;                            <div>&ndash;&gt;-->
                <!--&lt;!&ndash;                                自定义网络费用&ndash;&gt;-->
                <!--&lt;!&ndash;                            </div>&ndash;&gt;-->
                <!--&lt;!&ndash;                        </div>&ndash;&gt;-->


                <!--                    </div>-->
                <!--                </div>-->
                <div class="inputBox">
                    <div class="inputBox_sub">
                        <div class="slider-box" style="margin-top: 150px">
                            <vue-slider ref="slider3" v-bind="demo.demo8" @change="slide(demo.demo8.value)"
                                        v-model="demo.demo8.value">
                                <template slot="label" slot-scope="{ label, active }">
            <span :class="['custom-label', { active }]" v-if="label % 10 === 0">
              {{ label }}
            </span>
                                </template>
                            </vue-slider>

                        </div>
                        <div class="inputBox_view">
                            <div class="inputBox_view_top">
                                <!--                                <div class="inputBox_l">-->
                                <!--                                    <p class="inputBox_usable inputBox_txt1">最低Gas {{gaslimit*6}}</p>-->
                                <!--                                </div>-->

                            </div>
                            <!--                            <div class="inputBox_view_sub">-->
                            <!--                                <p class="inputBox_txt3">{{$t('currencyDetail.currencyDetail_fee')}} {{detail.fee}} {{currencyName}}</p>-->
                            <!--                            </div>-->
                        </div>
                    </div>
                </div>
            </div>
            <!--                <div class="inputBox">-->
            <!--                    <div class="inputBox_top">-->
            <!--                        <p class="inputBox_label">{{$t('currencyDetail.currencyDetail_received')}}</p>-->
            <!--                        <p class="inputBox_label">{{accountAmount | tofixed4}} {{currencyName}}</p>-->
            <!--                    </div>-->
            <!--                </div>-->

            <div class="bottom">
                <div class="LONGBTN" @click="validateData">{{$t('currencyDetail.currencyDetail_confirm')}}</div>
                <!--                    <div class="tips">-->
                <!--                        <p class="tips_txt1">-->
                <!--                            {{currencyTips}}-->
                <!--                        </p>-->
                <!--                    </div>-->
            </div>
            <!--            </div>-->

        </div>


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
                    >{{$t('layerdate.layerdate_btnCancel')}}
                    </div>
                    <div
                            class='DIALOG_BTN CONFIRM'
                            @click='closeNoPasswordDig'
                    >{{$t('layerdate.layerdate_set')}}
                    </div>
                </div>
            </div>
        </nlayer>

        <!--        <nlayer-->
        <!--                :visible="passwordDigVisible"-->
        <!--                @close="passwordDigClose"-->
        <!--                class="ANIMATITE_TOP_TO_BOTTOM_SMALL NDIALOG"-->
        <!--                width="80%"-->
        <!--                :zIndex="999"-->
        <!--        >-->
        <!--            <div class='DIALOG'>-->
        <!--                <div class='DIALOG_TITLE'>-->
        <!--                    {{$t('layerdate.layerdate_enterTransactionPwd')}}-->
        <!--                </div>-->
        <!--                <div class='DIALOG_CONTENT'>-->
        <!--                    <input type="password"-->
        <!--                           class="PASSWORD_INPUT"-->
        <!--                           :placeholder="$t('layerdate.layerdate_enterTransactionPwd')"-->
        <!--                           v-model="password"-->
        <!--                    >-->
        <!--                </div>-->
        <!--                <div class='DIALOG_BTNS clearfix'>-->
        <!--                    <div-->
        <!--                            class='DIALOG_BTN DEFAULT'-->
        <!--                            @click='closePasswordDig'-->
        <!--                    >{{$t('layerdate.layerdate_btnCancel')}}</div>-->
        <!--                    <div-->
        <!--                            class='DIALOG_BTN CONFIRM'-->
        <!--                            :class="[isCheckPassword ? 'active' : '']"-->
        <!--                            @click='checkPassword'-->
        <!--                    >{{$t('layerdate.layerdate_btnOk')}}</div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </nlayer>-->

        <!--输入密码弹窗-->
        <nlayer
                :visible="passwordDigVisible"
                @close="passwordDigClose"
                class="ANIMATITE_BOTTOM_TO_TOPS NDIALOG"
                width="100%"
                :zIndex="999"
        >
            <div class='DIALOGS'>
                <div class='DIALOG_GE_TITLE'
                     @click='closePasswordDig'
                >
                    密码
                </div>
                <div class='DIALOG_GE_CONTENT'>
                    <div class="DIALOG_CONTENT_LIST">
                        <div class="DIALOG_CONTENT_ITEM">
                            <input type="password"
                                   class="PASSWORD_GE_INPUTS"
                                   placeholder="请输入钱包密码"
                                   v-model="password"
                            >
                        </div>
                    </div>

                </div>
                <div class='DIALOG_GE_CONTENT' style="margin-top: .15rem">
                    <div class="DIALOG_CONTENT_LIST">
                        <div class="DIALOG_CONTENT_ITEM">
                            <input type="password"
                                   class="PASSWORD_GE_INPUTS"
                                   placeholder="请输入谷歌验证码"
                                   v-model="googlecode"
                            >
                        </div>
                    </div>

                </div>
                <div class='DIALOG_BTNSS'>
                    <div
                            class='DIALOG_GE_BTN CONFIRM mauto'
                            :class="[isCheckPassword ? 'active' : '']"
                            @click='checkPassword'
                    >确认
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
                <p class="LOADING_TXT">转账中...</p>
            </div>
        </nlayer>
        <!--无密码设置弹窗-->
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
                    您未设置谷歌验证码，请先去设置谷歌验证码
                </div>
                <div class='DIALOG_BTNS clearfix'>
                    <div
                            class='DIALOG_BTN DEFAULT'
                            @click='closeNoPasswordDig'
                    >取消
                    </div>
                    <div
                            class='DIALOG_BTN CONFIRM'
                            @click='gogoogleverification'
                    >去设置
                    </div>
                </div>
            </div>
        </nlayer>
        <div class="positi">
            USDT转账由于链上机制会有延迟，请您不要重复进行转账，否则造成的资产丢失我方无法为您找回，由您个人承担！
        </div>
    </div>
</template>

<script>

    import {mapGetters, mapMutations} from 'vuex'
    import Nlayer from '@/components/Nlayer'
    import {tofixed6} from "static/js/untils"
    import tx from '@/util/txUtil'
    import {getPrivat, Halletoeth, Ethtohelle, Existingaccounts} from '@/util/dip'
    import Web3 from 'web3'

    const whilst = require('async/whilst')
    import vueSlider from 'vue-slider-component';
    import 'vue-slider-component/theme/antd.css'
    import {Derivingmnemonics} from "../util/dip";
    import urlUtil from "../util/apiUtil";
    import axios from 'axios'
    import jsonAjax from '../util/restUtil.js';

    const Txs = require('ethereumjs-tx');

    export default {
        name: "CurrencyTransfer",
        components: {
            Nlayer,
            vueSlider

        },
        data() {
            return {
                detail: {},
                tips: '',
                tipsVisible: false,
                host: '',
                address: '',
                web3: {},
                balance: '',
                signedTransaction: '',
                gasPrice: '',
                gas: '',
                nonce: '',
                chainId: '',
                result: '',
                remarks: "",
                myaddress: '',
                inputAmount: '',
                passwordDigVisible: false,
                noPasswordDigVisible: false,
                password: '',
                isCheckPassword: false,
                freight: "",
                checkedStatus: 1,
                gaslimit: 1,
                demo: {
                    demo8: {
                        width: '100%',
                        value: [1],
                        min: 1,
                        max: 5,
                    }
                },
                Private: "",
                halemyaddress: "",
                toaddress: "",
                loadingVisible: false,
                googlecode: "",
                currency: this.$route.query.currency,
                contractethpath: this.$route.query.contractethpath,
                Tokenbalance: "",
                mainbalance: "",
                CurrentlyselectedWallet: localStorage.getItem("CurrentlyselectedWallet"),
                multiple: ""


            }
        },
        mounted() {
            var that = this;
            that.myaddress = localStorage.getItem("CurrentlyselectedWallet") == 1 ? localStorage.getItem("assetaddress") : localStorage.getItem("ethassetaddress")
            // console.log(Txs)
            Ethtohelle(that.myaddress).then((res) => {
                that.halemyaddress = res
            })
            this.address = this.getScanData()
            //this.getDetail()
            // this.chainId = 8,//测试
            this.chainId = 200812,//正式
                this.web3 = this.createWeb3()
            // this.slide(1)
            // // console.log(that.myaddress,"getGasLimitgetGasLimitgetGasLimit")
            tx.getGasPrice(this.web3, that.myaddress).then((res) => {
                if (that.CurrentlyselectedWallet == 1) {
                    if (that.currency == "HALE") {
                        that.gasPrice = 436
                    } else {
                        that.gasPrice = 436
                    }
                } else {
                    // that.gasPrice = 436
                    that.gasPrice = 25000000000
                    // console.log(that.gasPrice)

                }
            })
            // tx.getGasLimit(this.web3, that.myaddress).then((res) => {
                if (that.CurrentlyselectedWallet == 1) {
                    that.multiple = 1000000
                    if (that.currency == "HALE") {
                        that.gaslimit = 23030
                    } else {
                        that.gaslimit = 63000
                    }
                } else {
                    that.multiple = 1000000000000000000
                    // that.gaslimit = 10000
                    if (that.currency=="USDT"){
                        that.gaslimit = 65000
                    }else{
                        that.gaslimit = 30000
                    }

                    //
                }
                // console.log(that.gaslimit)
                // console.log(res)
                // setTimeout(function () {
                //     that.slide(1)
                // }, 1000)
            // })
            // console.log(this.web3)
            this.getBalance(that.myaddress)
        },
        computed: {
            currencyName() {
                return this.$route.query.currencyName
            },
            currencyTips() {
                const withDrawMoney = this.detail.withDrawMoney

                if (withDrawMoney == 0) {
                    // 提币无上线
                    return this.$t('currencyDetail.currencyDetail_minTransfer') + this.detail.perTransferMoney + ' ' + this.currencyName + this.$t('currencyDetail.currencyDetail_tip2')
                } else if (withDrawMoney > 0) {
                    // 有限制
                    return this.$t('currencyDetail.currencyDetail_minTransfer') + this.detail.perTransferMoney + ' ' + this.currencyName + this.$t('currencyDetail.currencyDetail_maxTransfer') + withDrawMoney + ' ' + this.currencyName + this.$t('currencyDetail.currencyDetail_tip2')
                } else {
                    // 禁止转账
                    return this.$t('currencyDetail.currencyDetail_tip1')
                }
            },
            userinfo() {
                return this.getUserinfo()
            },
            userId() {
                return this.userinfo.userId
            },
            maxAmount() {
                return tofixed4(this.detail.amount)
            },
            usableAmount() {
                let usableAmount = this.maxAmount - this.inputAmount
                if (usableAmount <= 0) {
                    usableAmount = 0
                }
                if (isNaN(usableAmount)) {
                    usableAmount = this.maxAmount
                }
                return usableAmount
            },
            accountAmount() {
                const value = this.inputAmount - this.detail.fee
                return value > 0 ? value : 0
            },
            showAddress() {
                return this.$t('currencyDetail.currencyDetail_please') + this.currencyName + this.$t('currencyDetail.currencyDetail_addresstxt')
            }

        },
        watch: {
            inputAmount(newVal) {
                if (this.currency == "HALE"||this.currency == "ETH") {
                    if (Number(this.mainbalance) < Number(this.demo.demo8.value[0] * this.gasPrice * this.gaslimit / this.multiple ||
                        this.demo.demo8.value * this.gasPrice * this.gaslimit / this.multiple)) {
                        this.showTips("余额不足")
                        this.inputAmount = 0
                        return
                    }
                    if (this.inputAmount < 0) {
                        this.inputAmount = 0
                        this.showTips("不可输入负数")
                        return
                    } else if (this.inputAmount > this.mainbalance - (this.demo.demo8.value[0] * this.gasPrice * this.gaslimit / this.multiple ||
                        this.demo.demo8.value * this.gasPrice * this.gaslimit / this.multiple)) {
                        this.showTips("手续费加付款数量超出余额")
                        this.inputAmount = tofixed6(this.mainbalance - (this.demo.demo8.value[0] * this.gasPrice * this.gaslimit / this.multiple ||
                            this.demo.demo8.value * this.gasPrice * this.gaslimit / this.multiple))
                        return
                    }
                } else {
                    if (this.mainbalance<(this.demo.demo8.value[0] * this.gasPrice * this.gaslimit / this.multiple ||
                        this.demo.demo8.value * this.gasPrice * this.gaslimit / this.multiple)){
                        this.inputAmount = 0
                        this.showTips("手续费不足")
                        return
                    }
                    if (Number(this.inputAmount) < 0) {
                        this.inputAmount = 0
                        this.showTips("不可输入负数")
                        return
                    } else if (Number(this.inputAmount) > Number(this.balance)) {
                        this.showTips("超出余额")
                        this.inputAmount = this.balance
                        return
                    }
                }

            }
        },
        destroyed() {
            this.setScanData('')
        },
        methods: {
            ...mapMutations({
                'setScanData': 'SET_SCANDATA'
            }),
            ...mapGetters(['getUserinfo', 'getScanData']),

            slide(i) {
                if (this.currency == "HALE") {
                    if (this.inputAmount > this.balance - (i * this.gasPrice * this.gaslimit / this.multiple)) {
                        this.inputAmount = this.balance - (i * this.gasPrice * this.gaslimit / this.multiple)
                    } else {

                    }
                }
                this.freight = this.gaslimit * i;
            },

            select() {
                if (this.checkedStatus == 1) {
                    //当判断复选框被选中时，可以做一些处理事件
                    this.checkedStatus = 0;
                } else {
                    this.checkedStatus = 1;
                }
            },
            // 去扫码
            toScan() {
                this.$push({
                    path: '/scan'
                })
            },
            checkUSDT(value) {
                const usdtRule = /^(1|3)[a-zA-Z\d]{24,33}$/
                const haleRule = /^(0x)?[0-9a-fA-F]{40}$/
                const btcRule = /^[^0OlI]{25,34}$/
                if (!usdtRule.test(value) && !haleRule.test(value) && !btcRule.test(value)) {
                    return this.$t('currencyDetail.currencyDetail_rightAddress')
                }
            },
            checkHALE(value) {
                const haleRule = /^(0x)?[0-9a-fA-F]{40}$/
                if (!haleRule.test(value)) {
                    return this.$t('currencyDetail.currencyDetail_rightAddress')
                }
            },
            // 监测数据是否符合格式
            validateData() {
                // const haleRule = /^halle$/
                // this.sendTransaction()
                if (localStorage.getItem("googleVerification") != 1) {
                    this.openNoPasswordDig()
                    return
                }
                if (this.currency == "ETH" || this.currency == "USDT") {
                    if (this.currency !== "ETH") {
                        if (Number(this.mainbalance) < Number(this.demo.demo8.value[0] * this.gasPrice * this.gaslimit / this.multiple ||
                            this.demo.demo8.value * this.gasPrice * this.gaslimit / this.multiple)) {
                            this.showTips("余额不足")
                            return
                        }
                    }
                    // 检测地址
                    if (this.address == '') {
                        this.showTips("请输入付款地址")
                        return
                    } else if (this.address.length < 40 && this.address.substring(0, 2) !== "0x") {
                        this.showTips("请输入正确地址")
                        return
                    } else if (this.address == this.halemyaddress) {
                        this.showTips("不可以输入自己的地址")
                        return
                    }
                    if (this.currency == "ETH") {
                        if (this.inputAmount > this.mainbalance - (this.demo.demo8.value[0] * this.gasPrice * this.gaslimit / this.multiple ||
                            this.demo.demo8.value * this.gasPrice * this.gaslimit / this.multiple)) {
                            this.showTips("手续费加付款数量超出余额")
                            return
                        }
                    }
                    // 检测转账数量
                    if (!this.inputAmount) {
                        this.showTips("请输入付款数量")
                        return
                    }
                    if (this.inputAmount <= 0) {
                        this.showTips("输入付款数量不能为0")
                        return
                    }
                    if (this.inputAmount < 0.000001) {
                        this.inputAmount = 0
                        this.showTips("最小转账0.000001")
                        return
                    }
                    this.openPasswordDig()
                } else {
                    if (this.currency !== "HALE") {
                        if (Number(this.mainbalance) < Number(this.demo.demo8.value[0] * this.gasPrice * this.gaslimit / this.multiple||
                            this.demo.demo8.value * this.gasPrice * this.gaslimit / this.multiple)) {
                            this.showTips("余额不足")
                            return
                        }
                    }
                    // 检测地址
                    if (this.address == '') {
                        this.showTips("请输入付款地址")
                        return
                    } else if (this.address.length < 40 && this.address.substring(0, 5) !== "halle") {
                        this.showTips("请输入正确地址")
                        return
                    } else if (this.address == this.halemyaddress) {
                        this.showTips("不可以输入自己的地址")
                        return
                    }
                    // console.log(this.inputAmount, this.balance)
                    if (this.currency == "HALE") {
                        if (this.inputAmount > this.mainbalance - (this.demo.demo8.value[0] * this.gasPrice * this.gaslimit / this.multiple||
                            this.demo.demo8.value * this.gasPrice * this.gaslimit / this.multiple)) {
                            this.showTips("手续费加付款数量超出余额")
                            return
                        }
                    }
                    // 检测转账数量
                    if (!this.inputAmount) {
                        this.showTips("请输入付款数量")
                        return
                    }
                    if (this.inputAmount <= 0) {
                        this.showTips("输入付款数量不能为0")
                        return
                    }
                    if (this.inputAmount < 0.000001) {
                        this.inputAmount = 0
                        this.showTips("最小转账0.000001")
                        return
                    }
                }

                this.openPasswordDig()


            },
            // 全部转出
            allTransfer() {
                if (this.currency == "HALE"||this.currency == "ETH") {
                    if (Number(this.mainbalance) < Number(this.demo.demo8.value[0] * this.gasPrice * this.gaslimit / this.multiple ||
                        this.demo.demo8.value * this.gasPrice * this.gaslimit / this.multiple)) {
                        this.showTips("余额不足")

                        return
                    }
                    this.inputAmount = tofixed6(this.mainbalance - (this.demo.demo8.value[0] * this.gasPrice * this.gaslimit / this.multiple ||
                        this.demo.demo8.value * this.gasPrice * this.gaslimit / this.multiple))
                    this.showTips("操作成功")
                } else {
                    if (this.mainbalance<(this.demo.demo8.value[0] * this.gasPrice * this.gaslimit / this.multiple ||
                        this.demo.demo8.value * this.gasPrice * this.gaslimit / this.multiple)){
                        this.inputAmount = 0
                        this.showTips("手续费不足")
                        return
                    }
                    this.inputAmount = tofixed6(this.balance)
                    this.showTips("操作成功")
                }

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
            createWeb3() {
                let web3 = {}
                if (this.CurrentlyselectedWallet == 1) {
                    web3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalance"));

                } else {
                    web3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalanceeth"))
                }
                return web3
            },
            // 获取给定地址余额
            getBalance(fromAddress) {
                var that = this;

                if (this.currency == "HALE" || this.currency == "ETH") {
                    const _from = fromAddress;
                    const web3 = this.web3
                    web3.eth.getBalance(_from, function (err, value) {
                        // console.log(value)
                        that.mainbalance = this.currency == "HALE" ? value / 1000000 : value / 1000000000000000000
                        // console.log('-------getBalance-------err--------' + err)
                        // console.log('-------getBalance--------value-------' + value)
                        if (err) {
                            this.balance = ''
                            this.msg = '未获取到余额'
                            // console.warn(err.message)
                            return
                        }

                    }.bind(this))
                } else {
                    const _from = fromAddress;
                    const web3 = this.web3
                    web3.eth.getBalance(_from, function (err, value) {
                        that.mainbalance = this.currency == "USDT" ? value / 1000000000000000000 : value / 1000000
                        // console.log('-------getBalance-------err--------' + err)
                        // console.log('-------getBalance--------value-------' + value)
                        if (err) {
                            this.balance = ''
                            this.msg = '未获取到余额'
                            // console.warn(err.message)
                            return
                        }

                    }.bind(this))

                    tx.balanceOf(that.web3, fromAddress, that.contractethpath).then((res) => {
                        if (that.CurrentlyselectedWallet == 1){
                            that.balance = res / 1000000000000000000
                        }else {
                            that.balance = res / 1000000
                        }
                    })
                }

            },
            //清空
            empty() {
                this.toaddress = ""
                this.address = ""
                this.inputAmount = ""
                this.remarks = ""
            },
            toNonExponential(num) {
                var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
                return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
            },

            sendTransaction(Private) {
                var that = this;
                //HALE币转账
                if (this.currency == "HALE") {
                    let txData = {
                        from: this.myaddress,
                        to: this.toaddress,
                        inPutGas: this.demo.demo8.value[0] * this.gaslimit * this.gasPrice || this.demo.demo8.value * this.gaslimit * this.gasPrice,
                        gasPrice: that.demo.demo8.value * that.gasPrice || that.demo.demo8.value[0] * that.gasPrice,
                        gasLimit: this.gaslimit,
                        value: this.inputAmount,
                        data: this.remarks,
                        // chainId: 8,//测试
                        chainId: 200812,//正式
                        Private: Private
                    }

                    // this.result = txId
                    let txId = ''
                    const web3 = this.web3
                    let responseData = {}
                    tx.sendTransaction(web3, txData).then((res) => {
                        // console.log('-----------tx.sendTransaction------then-------res')
                        // console.log(res)
                        if (res.result == 'succ') {
                            txId = res.txHash


                            // confirmedTransaction 交易确认模块，轮询5次反查 结果
                            let confirmed = false
                            let limit = 5
                            let count = 0;
                            let lastBlockNumber = res.lastBlockNumber

                            whilst(
                                //循环条件
                                function () {
                                    return confirmed === false
                                },
                                //循环体
                                function (callback) {
                                    // console.log(txId, "=======txId")
                                    web3.eth.getTransaction(txId, function (err, tx) {
                                        // console.log(tx, "=======tx")
                                        if (err) {
                                            window.setTimeout(function () {
                                                callback(err, null)
                                            }, 100) //1000
                                        }
                                        if (tx && tx.blockNumber !== null) {
                                            //if (blockNumber >= (tx.blockNumber + limit)) {
                                            if (lastBlockNumber < (tx.blockNumber)) {
                                                confirmed = true
                                                window.setTimeout(function () {
                                                    callback(null, tx)
                                                }, 100) //1000
                                                return
                                            }
                                        }
                                        count++;
                                        if (count > limit) {
                                            confirmed = true
                                        }
                                        window.setTimeout(function () {
                                            callback(null, null)
                                        }, 100) //1000
                                    })
                                },
                                //结束或者err时进入
                                function (err, tx) {
                                    if (err) {
                                        that.showTips("交易失败")
                                        that.closeLoading()
                                        that.empty()
                                        // return cb(err, null)
                                        let result = {
                                            "result": "err",
                                            "msg": "交易失败"
                                        };
                                        responseData = result
                                    }
                                    if (tx && confirmed) {
                                        //return cb(null, tx)
                                        that.closeLoading()
                                        that.showTips("交易成功")
                                        setTimeout(function () {
                                            that.$back()
                                        }, 1200)
                                        that.empty()
                                        let result = {
                                            "result": "succ",
                                            "msg": "交易成功",
                                            "txHash": tx.blockHash,
                                            "blockNumber": tx.blockNumber
                                        }
                                        responseData = result
                                    }
                                    // console.log('----------txUtil----responseData--11-----------')
                                    // console.log(responseData)
                                }
                            )


                        }


                    }).catch(
                        (res) => {
                            // console.log(res, "err")
                        }
                    )
                } else if (this.currency == "ETH") {
                    let txData = {
                        from: this.myaddress,
                        to: this.toaddress,
                        inPutGas: this.demo.demo8.value[0] * this.gaslimit * this.gasPrice || this.demo.demo8.value * this.gaslimit * this.gasPrice,
                        gasPrice: that.demo.demo8.value * that.gasPrice || that.demo.demo8.value[0] * that.gasPrice,
                        gasLimit: this.gaslimit,
                        value: this.inputAmount * 1000000000000,
                        data: this.remarks,
                        // chainId: 8,//测试
                        chainId: 1,//正式
                        Private: Private
                    }

                    // this.result = txId
                    let txId = ''
                    const web3 = this.web3
                    let responseData = {}
                    tx.sendTransaction(web3, txData).then((res) => {
                        // console.log('-----------tx.sendTransaction------then-------res')
                        // console.log(res)

                        if (res.result == 'succ') {
                            txId = res.txHash


                            // confirmedTransaction 交易确认模块，轮询5次反查 结果
                            let confirmed = false
                            let limit = 5
                            let count = 0;
                            let lastBlockNumber = res.lastBlockNumber

                            whilst(
                                //循环条件
                                function () {
                                    return confirmed === false
                                },
                                //循环体
                                function (callback) {
                                    // console.log(txId, "=======txId")
                                    web3.eth.getTransaction(txId, function (err, tx) {
                                        // console.log(tx, "=======tx")
                                        if (err) {
                                            window.setTimeout(function () {
                                                callback(err, null)
                                            }, 100) //1000
                                        }
                                        if (tx && tx.blockNumber !== null) {
                                            //if (blockNumber >= (tx.blockNumber + limit)) {
                                            if (lastBlockNumber < (tx.blockNumber)) {
                                                confirmed = true
                                                window.setTimeout(function () {
                                                    callback(null, tx)
                                                }, 100) //1000
                                                return
                                            }
                                        }
                                        count++;
                                        if (count > limit) {
                                            confirmed = true
                                        }
                                        window.setTimeout(function () {
                                            callback(null, null)
                                        }, 100) //1000
                                    })
                                },
                                //结束或者err时进入
                                function (err, tx) {
                                    if (err) {
                                        that.showTips("交易失败")
                                        that.closeLoading()
                                        that.empty()
                                        // return cb(err, null)
                                        let result = {
                                            "result": "err",
                                            "msg": "交易失败"
                                        };
                                        responseData = result
                                    }
                                    if (tx && confirmed) {
                                        //return cb(null, tx)
                                        that.closeLoading()
                                        that.showTips("交易成功")
                                        setTimeout(function () {
                                            that.$back()
                                        }, 1200)
                                        that.empty()
                                        let result = {
                                            "result": "succ",
                                            "msg": "交易成功",
                                            "txHash": tx.blockHash,
                                            "blockNumber": tx.blockNumber
                                        }
                                        responseData = result
                                    }
                                    // console.log('----------txUtil----responseData--11-----------')
                                    // console.log(responseData)
                                }
                            )


                        }


                    }).catch(
                        (res) => {
                            // console.log(res, "err")
                        }
                    )
                } else {
                    //合约币转账
                    function addPreZero(num) {
                        var t = (num + '').length,
                            s = '';
                        for (var i = 0; i < 64 - t; i++) {
                            s += '0';
                        }
                        return s + num;
                    }

                    that.web3.eth.getTransactionCount(that.myaddress).then(function (nonce) {
                        // console.log(nonce)

                        var chainId = that.CurrentlyselectedWallet == 1 ? 200812 : 1
                        // var amount = that.inputAmount * (that.CurrentlyselectedWallet == 1?1000000000000000000:1000000)
                        // console.log(that.gasPrice)
                        // console.log(that.gaslimit)
                        // console.log(that.inputAmount*1000000)
                        if (that.currency == "USDT") {
                            var txObject = {
                                from: that.myaddress,
                                nonce: that.web3.utils.toHex(nonce),//web3.utils.toHex(web3.eth.getTransactionCount(from)),
                                gasPrice: that.web3.utils.toHex(that.demo.demo8.value * that.gasPrice || that.demo.demo8.value[0] * that.gasPrice),//"10"),
                                // gasLimit: that.web3.utils.toHex(that.gaslimit),
                                to: that.contractethpath,//正式合约
                                value: '0x00',
                                gas: that.web3.utils.toHex(that.gaslimit),
                                // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
                                data: '0x' + 'a9059cbb' + addPreZero(that.toaddress.substr(2)) + addPreZero(that.web3.utils.toHex(BigInt(that.inputAmount*1000000).toString()).substr(2)),
                                chainId: chainId
                            };
                        } else {
                            var txObject = {
                                from: that.myaddress,
                                nonce: that.web3.utils.toHex(nonce),//web3.utils.toHex(web3.eth.getTransactionCount(from)),
                                gasPrice: that.web3.utils.toHex(that.demo.demo8.value * that.gasPrice || that.demo.demo8.value[0] * that.gasPrice),//"10"),
                                gasLimit: that.web3.utils.toHex(that.gaslimit),
                                to: that.contractethpath,//正式合约
                                value: '0x00',
                                // gas: that.web3.utils.toHex(that.gaslimit * that.gasPrice ||  that.demo.demo8.value * that.gaslimit * that.gasPrice),
                                // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
                                data: '0x' + 'a9059cbb' + addPreZero(that.toaddress.substr(2)) + addPreZero(that.web3.utils.toHex(BigInt(that.inputAmount*1000000000000000000).toString()).substr(2)),
                                chainId: chainId
                            };
                        }

                        // console.log(txObject, "txObject------------")
                        var tx = new Txs(txObject);
                        tx.sign(Buffer.from(Private, 'hex'));
                        var serializedTx = tx.serialize();
                        if (tx.verifySignature()) {
                            // console.log('Signature Checks out!')
                        }
                        that.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('transactionHash', function (hash) {
                            // console.log("hi " + hash);
                            if(that.currency=="USDT"){
                                if (hash!==""){
                                    that.closeLoading()
                                    that.empty()
                                    that.showTips("交易成功")
                                    setTimeout(function () {
                                        that.$router.go(-1)
                                    }, 1200)
                                }
                            }
                        }).on('receipt', function (res) {
                            // console.log(res)
                            if (res.status) {
                                that.closeLoading()
                                that.empty()
                                that.showTips("交易成功")
                                setTimeout(function () {
                                    that.$router.go(-1)
                                }, 1200)

                            } else {
                                that.closeLoading()
                                that.empty()
                                that.showTips("交易失败")
                            }
                        });//.on('receipt', console.log);
                    })
                }
            },
            // 获取币详情
            getDetail() {
                this.$http.get('js/userWallet/getUserWalletByUserId', {
                    userId: this.userId,
                    currency: this.currencyName
                }).then((res) => {
                    // console.log(res)
                    if (res.success) {
                        this.detail = res.result
                    }
                })
            },
            // 关闭全部layer
            closeAll() {
                this.closeNoPasswordDig()
                this.closePasswordDig()
            },
            // 检测交易密码是否正确
            checkPassword() {
                var that = this;
                var regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
                // halle转eth
                if (this.currency == "ETH" || this.currency == "USDT") {
                    this.toaddress = this.address
                } else {
                    Halletoeth(this.address).then((res) => {
                        this.toaddress = res
                    })
                }

                if (this.password == "") {
                    this.showTips("密码不能为空")
                    return
                } else if (!regex.test(this.password)) {
                    this.showTips("密码格式错误")
                    return
                } else if (this.googlecode == "") {
                    this.showTips("谷歌验证码不能为空")
                    return;
                } else if (this.googlecode.length !== 6) {
                    this.showTips("填写六位验证码")
                    return;
                }
                this.closePasswordDig()
                this.showLoading()
                Existingaccounts(this.password).then((res) => {
                    this.password = ''
                    axios.get(urlUtil.getApiUrl("api_rootlist") + "/v1/two_auth/authDCI", {
                        params: {
                            address: this.CurrentlyselectedWallet == 1 ? localStorage.getItem("assetaddress") : localStorage.getItem("ethassetaddress"),
                            // address: "0xd41b58e4359df8422d960982ab7d635d22a79f43",
                            passwd: this.googlecode
                        }
                    },).then((res) => {
                        this.googlecode = ''
                        if (res.data) {
                            // 取私钥
                            // console.log(this.myaddress)
                            getPrivat(that.myaddress).then((res) => {
                                that.sendTransaction(res)
                            })
                        } else {
                            that.closeLoading()
                            that.showTips("谷歌验证码错误")
                        }
                    })

                }).catch((res) => {
                    that.closeLoading()
                    that.showTips("密码错误")
                })
            },
            // 关闭密码弹窗
            closePasswordDig() {
                this.passwordDigVisible = false

            },
            // 打开密码弹窗
            openPasswordDig() {
                this.passwordDigVisible = true
            },
            // 监听关闭密码弹窗事件
            passwordDigClose() {
                this.passwordDigVisible = false
                this.password = ''
                this.googlecode = ''

            },
            gogoogleverification() {
                this.$push(
                    {
                        path: "/googleVerification",
                        query: {
                            googleType: 2
                        }
                    })
            },
            // 关闭无密码提示弹窗
            closeNoPasswordDig() {
                this.noPasswordDigVisible = false
            },
            // 打开无密码提示弹窗
            openNoPasswordDig() {
                this.noPasswordDigVisible = true
            },
            // 监听关闭无密码弹窗事件
            noPasswordDigClose() {
                this.noPasswordDigVisible = false
            }
        }
    }
</script>

<style scoped>
    .HEADER_RIGHT {
        width: .4rem;
        height: 0.4rem;
        top: .7rem;
    }

    .page {
        overflow: scroll;
    }

    .DIALOGS {
        height: 4.5rem;
    }

    .DIALOG_GE_TITLE {
        text-align: center;
        font-size: .3rem;
        font-weight: bold;
        line-height: 1rem;
    }

    .content {
        padding: 0.2rem 0.3rem;
    }

    .inputBox + .inputBox {
        margin-top: 0.4rem;
    }

    .inputBox_top {
        color: #070707;
        font-size: .3rem;
        font-weight: bold;
        position: relative;
        height: .7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .inputBox_label {
        font-size: .3rem;
        color: #333;
        line-height: .9rem;
    }

    .inputBox_view {
        margin-top: 0.05rem;
        position: relative;
    }

    .inputBox_view_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .75rem;

    }

    .inputBox_txt1 {
        font-size: .24rem;
        color: #070707;
    }

    .inputBox_txt2 {
        font-size: .2rem;
        color: #8E398C;
    }

    .inputBox_view_sub {
        margin-top: 0.05rem;
    }

    .inputBox_txt3 {
        font-size: .2rem;
        color: #666;
    }

    .bottom {
        margin-top: 1.25rem;
        padding: 0 .35rem;
    }

    .tips {
        background: #fafafa;
        border: 1px solid #eee;
        padding: .1rem .2rem;
        border-radius: .1rem;
        margin: .5rem 0;
    }

    .tips_txt1 {
        font-size: .22rem;
        color: #666;
        line-height: .35rem;
    }

    .scan {
        background: url("../static/images/newWallet/icon_sys.png") no-repeat center center / cover;
    }

    .DIALOG_BTN.active {
        color: #999;
    }

    .LONGBTN {
        margin-bottom: .5rem;
        width: 5rem;
        height: .8rem;
        background: #8E398C;
    }

    .inputBox_r {
        border-left: 1px solid #8E398C;
        padding-left: .15rem;
        position: absolute;
        top: -.6rem;
        right: .2rem;
    }

    .inputBox_rs {
        position: absolute;
        top: .15rem;
        right: .2rem;
        display: flex;
    }

    .inputBox_rs img {
        margin-right: .15rem;
        margin-top: .05rem;
        width: .3rem;
        height: .3rem;
    }

    .inputBox_rs input {
        margin-top: .05rem;
        margin-right: .15rem;
        width: .3rem;
        height: .3rem;
    }

    .DIALOG_BTNSS {
        margin-top: .3rem;
        height: 1.05rem;
        line-height: 1.05rem;
    }

    .DIALOG_BTNSS > div {
        width: 5rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        background: #8E398C;
        color: white;
        border-radius: .5rem;
    }

    .slider-box {
        width: 6.8rem;
        margin: 0 auto !important;
        padding-top: .3rem;
    }

    .custom-label {
        position: absolute;
        bottom: 100%;
        left: 0;
        transform: translate(-50%, -12px);
        margin-left: 3px;
    }

    .custom-label::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 5px);
        width: 1px;
        height: 5px;
        background-color: #000;
    }

    .custom-label.active {
        color: #222 !important;
        font-weight: bold;
    }

    .custom-label.active::after {
        background-color: #222 !important;
        width: 2px;
    }

    .LOADING_TXT {
        color: white;
        padding-left: 0.15rem;
        padding-right: .15rem;
    }

    .ANIMATITE_BOTTOM_TO_TOPS {
        margin-top: -4.5rem !important;
    }
    .positi{
        font-size: .24rem;
        color: #8E398C;
        padding: .3rem;
        position: fixed;
        bottom: .2rem;
    }
</style>

<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">{{this.currency}}收支明细</p>
        </div>
        <div class="wrapper" v-if="this.currency=='HALE'||this.currency=='ETH'">
            <div class="Mybalance">
                <div>{{balance|tofixed6}}</div>
                <div>≈￥ {{balance*usdt*quotes|tofixed4}}</div>
            </div>
            <!--            <div class="tab">-->
            <!--                <div @click="msgs(1)" :class="msg==1? 'ativetab' : ''">全部</div>-->
            <!--                <div @click="msgs(2)" :class="msg==2? 'ativetab' : ''">收款</div>-->
            <!--                <div @click="msgs(3)" :class="msg==3? 'ativetab' : ''">付款</div>-->
            <!--            </div>-->
            <div class="he"></div>
            <div class="main" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10" v-if="this.currency=='HALE'">
                <!--                全部-->
                <div v-if="msg==1">
                    <div v-for="(item,index) in list" @click="godetail(item)" v-if="item.contract_symbol!=='CHMC'">
                        <div>
                            <img src="../static/images/newWallet/icon_HALE11.png">
                            <div>
                                <p>
                                    <span class="red" v-if="myaddress==item.from_address">付款</span>
                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>
                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>
                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>

                                </p>
                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19).replace("T"," ")}}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='cosmos-sdk/MsgSend'"
                                   class="gree">+ {{(item.messages[0].value.amount[0].amount/1000000)||0|tofixed6}}
                                    HALE</p>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"
                                   class="gree">+ {{(item.messages[0].value.value/1000000)||0|tofixed6}} {{currency}}</p>

                                <p v-if="myaddress==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"
                                   class="red">- {{(item.messages[0].value.value/1000000)||0 |tofixed6}} {{currency}}</p>
                                <p v-if="item.code!==0" class="red">未完成</p>
                                <p v-if="item.code==0">已完成</p>
                            </div>
                            <img src="../static/images/newWallet/icon_go.png">
                        </div>
                    </div>
                    <p>加载完成！</p>

                </div>
                <!--                收款-->
                <div v-if="msg==2">
                    <div v-for="(item,index) in list" @click="godetail(item)" v-if="myaddress!==item.from_address">
                        <div>
                            <img src="../static/images/newWallet/icon_HALE11.png">
                            <div>
                                <p>
                                    <span class="red" v-if="myaddress==item.from_address">付款</span>
                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>
                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>
                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>

                                </p>
                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19)}}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='cosmos-sdk/MsgSend'"
                                   class="gree">+ {{item.messages[0].value.amount[0].amount/1000000||0}} {{currency}}</p>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"
                                   class="gree">+ {{item.messages[0].value.value/1000000||0}} {{currency}}</p>

                                <p>已完成</p>
                            </div>
                            <img src="../static/images/newWallet/icon_go.png">
                        </div>
                    </div>
                    <p>加载完成！</p>
                </div>
                <!--                付款-->
                <div v-if="msg==3">
                    <div v-for="(item,index) in list" @click="godetail(item)" v-if="myaddress==item.from_address">
                        <div>
                            <img src="../static/images/newWallet/icon_HALE11.png">
                            <div>
                                <p>
                                    <span class="red" v-if="myaddress==item.from_address">付款</span>
                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>
                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>
                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>

                                </p>
                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19)}}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p v-if="myaddress!==item.from_address" class="gree">+
                                    {{item.messages[0].value.value||0}} HALE</p>
                                <p v-if="myaddress==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"
                                   class="red">- {{item.messages[0].value.value/1000000||0}} {{currency}}</p>
                                <p>已完成</p>
                            </div>
                            <img src="../static/images/newWallet/icon_go.png">
                        </div>
                    </div>
                    <p>加载完成！</p>

                </div>
            </div>
            <p  v-if="this.currency=='ETH'"  class="record">记录查询暂未开放！</p>
        </div>
        <div class="wrapper" v-else>
            <div class="Mybalance">
                <div>{{Tokenbalance|tofixed6}}</div>
                <div>≈￥ {{Tokenbalance*usdt*quotes|tofixed4}}</div>
            </div>
            <!--            <div class="tab">-->
            <!--                <div @click="msgs(1)" :class="msg==1? 'ativetab' : ''">全部</div>-->
            <!--                <div @click="msgs(2)" :class="msg==2? 'ativetab' : ''">收款</div>-->
            <!--                <div @click="msgs(3)" :class="msg==3? 'ativetab' : ''">付款</div>-->
            <!--            </div>-->
            <div class="he"></div>
            <p  v-if="this.currency=='USDT'"  class="record">记录查询暂未开放！</p>
            <div class="main" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10" v-else>
                <!--                全部-->
                <div v-if="msg==1">
                    <div v-for="(item,index) in list" @click="godetail(item)">
                        <div>
                            <img :src="icon">
                            <div>
                                <p>
                                    <span class="red" v-if="myaddress==item.from_address&&item.to_address!=='halle1dtujdjq4mutrkvzlmqmj95rsnfuf53acjg47dh'">付款</span>
                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>
                                    <span class="red" v-if="item.to_address=='halle1dtujdjq4mutrkvzlmqmj95rsnfuf53acjg47dh'">兑换</span>

                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>
                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>

                                </p>
                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19).replace("T"," ")}}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='cosmos-sdk/MsgSend'"
                                   class="gree">+ {{(item.messages[0].value.amount[0].amount)/1000000000000000000||0|tofixed6}}
                                    CHMC</p>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"
                                   class="gree">+ {{(item.messages[0].value.value)/1000000000000000000||0|tofixed6}} {{currency}}</p>

                                <p v-if="myaddress==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"
                                   class="red">- {{(item.messages[0].value.value)/1000000000000000000||0 |tofixed6}} {{currency}}</p>
                                <p v-if="item.code!==0" class="red">未完成</p>
                                <p v-if="item.code==0">已完成</p>
                            </div>
                            <img src="../static/images/newWallet/icon_go.png">
                        </div>
                    </div>
                    <p>加载完成！</p>

                </div>
                <!--                收款-->
                <div v-if="msg==2">
                    <div v-for="(item,index) in list" @click="godetail(item)" v-if="myaddress!==item.from_address">
                        <div>
                            <img src="../static/images/newWallet/icon_HALE11.png">
                            <div>
                                <p>
                                    <span class="red" v-if="myaddress==item.from_address">付款</span>
                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>
                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>
                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>

                                </p>
                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19)}}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='cosmos-sdk/MsgSend'"
                                   class="gree">+ {{item.messages[0].value.amount[0].amount/1000000||0}} {{currency}}</p>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"
                                   class="gree">+ {{item.messages[0].value.value/1000000||0}} {{currency}}</p>

                                <p>已完成</p>
                            </div>
                            <img src="../static/images/newWallet/icon_go.png">
                        </div>
                    </div>
                    <p>加载完成！</p>
                </div>
                <!--                付款-->
                <div v-if="msg==3">
                    <div v-for="(item,index) in list" @click="godetail(item)" v-if="myaddress==item.from_address">
                        <div>
                            <img src="../static/images/newWallet/icon_HALE11.png">
                            <div>
                                <p>
                                    <span class="red" v-if="myaddress==item.from_address">付款</span>
                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>
                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>
                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>

                                </p>
                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19)}}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p v-if="myaddress!==item.from_address" class="gree">+
                                    {{item.messages[0].value.value||0}} HALE</p>
                                <p v-if="myaddress==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"
                                   class="red">- {{item.messages[0].value.value/1000000||0}} {{currency}}</p>
                                <p>已完成</p>
                            </div>
                            <img src="../static/images/newWallet/icon_go.png">
                        </div>
                    </div>
                    <p>加载完成！</p>

                </div>
            </div>

        </div>
<!--        <div class="wrapper" v-if="this.currency=='EDC'">-->
<!--            <div class="Mybalance">-->
<!--                <div>{{Tokenbalance|tofixed6}}</div>-->
<!--                <div>≈￥ {{RmbTokenbalance|tofixed4}}</div>-->
<!--            </div>-->
<!--            &lt;!&ndash;            <div class="tab">&ndash;&gt;-->
<!--            &lt;!&ndash;                <div @click="msgs(1)" :class="msg==1? 'ativetab' : ''">全部</div>&ndash;&gt;-->
<!--            &lt;!&ndash;                <div @click="msgs(2)" :class="msg==2? 'ativetab' : ''">收款</div>&ndash;&gt;-->
<!--            &lt;!&ndash;                <div @click="msgs(3)" :class="msg==3? 'ativetab' : ''">付款</div>&ndash;&gt;-->
<!--            &lt;!&ndash;            </div>&ndash;&gt;-->
<!--            <div class="he"></div>-->
<!--            <div class="main" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"-->
<!--                 infinite-scroll-distance="10">-->
<!--                &lt;!&ndash;                全部&ndash;&gt;-->
<!--                <div v-if="msg==1">-->
<!--                    <div v-for="(item,index) in list" @click="godetail(item)">-->
<!--                        <div>-->
<!--                            <img src="../static/images/chmclogo.png">-->
<!--                            <div>-->
<!--                                <p>-->
<!--                                    <span class="red" v-if="myaddress==item.from_address">付款</span>-->
<!--                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>-->
<!--                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>-->
<!--                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>-->

<!--                                </p>-->
<!--                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19).replace("T"," ")}}</p>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <div>-->
<!--                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='cosmos-sdk/MsgSend'"-->
<!--                                   class="gree">+ {{(item.messages[0].value.amount[0].amount)/1000000000000000000||0|tofixed6}}-->
<!--                                    CHMC</p>-->
<!--                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"-->
<!--                                   class="gree">+ {{(item.messages[0].value.value)/1000000000000000000||0|tofixed6}} CHMC</p>-->

<!--                                <p v-if="myaddress==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"-->
<!--                                   class="red">- {{(item.messages[0].value.value)/1000000000000000000||0 |tofixed6}} CHMC</p>-->
<!--                                <p v-if="item.code!==0" class="red">未完成</p>-->
<!--                                <p v-if="item.code==0">已完成</p>-->
<!--                            </div>-->
<!--                            <img src="../static/images/newWallet/icon_go.png">-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <p>加载完成！</p>-->

<!--                </div>-->
<!--                &lt;!&ndash;                收款&ndash;&gt;-->
<!--                <div v-if="msg==2">-->
<!--                    <div v-for="(item,index) in list" @click="godetail(item)" v-if="myaddress!==item.from_address">-->
<!--                        <div>-->
<!--                            <img src="../static/images/newWallet/icon_HALE11.png">-->
<!--                            <div>-->
<!--                                <p>-->
<!--                                    <span class="red" v-if="myaddress==item.from_address">付款</span>-->
<!--                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>-->
<!--                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>-->
<!--                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>-->

<!--                                </p>-->
<!--                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19)}}</p>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <div>-->
<!--                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='cosmos-sdk/MsgSend'"-->
<!--                                   class="gree">+ {{item.messages[0].value.amount[0].amount/1000000||0}} HALE</p>-->
<!--                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"-->
<!--                                   class="gree">+ {{item.messages[0].value.value/1000000||0}} HALE</p>-->

<!--                                <p>已完成</p>-->
<!--                            </div>-->
<!--                            <img src="../static/images/newWallet/icon_go.png">-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <p>加载完成！</p>-->
<!--                </div>-->
<!--                &lt;!&ndash;                付款&ndash;&gt;-->
<!--                <div v-if="msg==3">-->
<!--                    <div v-for="(item,index) in list" @click="godetail(item)" v-if="myaddress==item.from_address">-->
<!--                        <div>-->
<!--                            <img src="../static/images/newWallet/icon_HALE11.png">-->
<!--                            <div>-->
<!--                                <p>-->
<!--                                    <span class="red" v-if="myaddress==item.from_address">付款</span>-->
<!--                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>-->
<!--                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>-->
<!--                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>-->

<!--                                </p>-->
<!--                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19)}}</p>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <div>-->
<!--                                <p v-if="myaddress!==item.from_address" class="gree">+-->
<!--                                    {{item.messages[0].value.value||0}} HALE</p>-->
<!--                                <p v-if="myaddress==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'"-->
<!--                                   class="red">- {{item.messages[0].value.value/1000000||0}} HALE</p>-->
<!--                                <p>已完成</p>-->
<!--                            </div>-->
<!--                            <img src="../static/images/newWallet/icon_go.png">-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <p>加载完成！</p>-->

<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <div class="sidebar_list_wrapperimport">
            <div class="sidebar_list_padding">
                <!--                                <p class="sidebar_txt2">{{$t('sidebar.sidebar_other')}}</p>-->
                <div class="sidebar_listaddimport">
                    <div class="sidebar_item"
                         @click="Collection"
                    >
                        <div class="sidebar_item_pic sidebar_item_create"></div>
                        <p class="sidebar_txt3">收款</p>
                    </div>
                    <div class="sidebar_item"
                         @click="exchange"
                         v-if="currency=='IUSDT'||currency=='USDT'"
                    >
                        <div class="sidebar_item_pic sidebar_item_exhang"></div>
                        <p class="sidebar_txt3">兑换</p>
                    </div>
                    <div class="sidebar_item"
                         @click="payment"
                    >
                        <div class="sidebar_item_pic sidebar_item_import"></div>
                        <p class="sidebar_txt3">付款</p>
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


    </div>
</template>

<script>
    import Vue from 'vue'
    import {Ethtohelle, Halletoeth} from "../util/dip";
    import Web3 from 'web3'
    import axios from 'axios'
    import urlUtil from '../util/apiUtil.js'
    import {InfiniteScroll} from 'mint-ui'
    import txu from '@/util/txUtil'
    import Nlayer from '@/components/Nlayer'

    Vue.use(InfiniteScroll)

    export default {
        name: "Incomeexpendituredetails",
        components: {
            Nlayer
        },
        data() {
            return {
                tipsVisible:false,
                msg: 1,
                addrees: "",
                web3: {},
                balance: "",
                Rmbbalance: 0,
                list: [],
                myaddress: "",
                pages: 10,
                pagestore: true,
                befer: 0,
                currency:this.$route.query.currency,
                icon:this.$route.query.icon,
                contractpath:this.$route.query.contractpath,
                contract:this.$route.query.contract,
                quotes:this.$route.query.quotes,
                contractethpath:"",
                Tokenbalance:"",
                tips:"",
                RmbTokenbalance:"",
                CurrentlyselectedWallet:localStorage.getItem("CurrentlyselectedWallet"),
                usdt:""
            }
        },
        created() {
            var that = this;
            // this.getdata()
            console.log(this.contract)
            if (this.CurrentlyselectedWallet==1){
                this.web3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalance"));
            }else {
                this.web3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalanceeth"));
            }

                txu.balanceOf(that.web3,this.CurrentlyselectedWallet==1?localStorage.getItem("assetaddress"):localStorage.getItem("ethassetaddress"),that.contract).then((res) => {
                    if (that.CurrentlyselectedWallet==1){
                        that.Tokenbalance=res/1000000000000000000
                    }else{
                        that.Tokenbalance=res/1000000
                    }
                })

            this.getBalance(this.CurrentlyselectedWallet==1?localStorage.getItem("assetaddress"):localStorage.getItem("ethassetaddress"))
            this.$http.get('http://120.77.247.234:8984/js/hCurrencyRate/findCurrencyParameter', {
                currency: "haleusdt"
            }).then((res) => {
                that.usdt=res.result.usdtCny
                that.Rmbbalance = that.balance * res.result.usdtCny * res.result.haleUsdt.firstPrice
                that.RmbTokenbalance = that.Tokenbalance * res.result.usdtCny * res.result.chmcUsdt.firstPrice
            })

            // HALE转eth
            Halletoeth(that.contractpath).then((res)=>{
                that.contractethpath=res
            })
        },
        methods: {
            // 打开消息提示
            showTips(msg){
                this.tips = msg
                this.tipsVisible = true
            },
            // 监听消息提示关闭
            tipsClosed(){
                this.msg = ''
                this.tipsVisible = false
            },
            //列表
            getdata() {
                var that = this;
                if(this.currency=='HALE'){
                    Ethtohelle(localStorage.getItem("assetaddress")).then((res) => {
                        that.myaddress = res;
                        axios.get(urlUtil.getApiUrl("api_rootlist") + "/v1/txs_address", {
                            params: {
                                limit: 30,
                                before: that.befer,
                                address: that.myaddress
                            }
                        },).then((res) => {
                            //     console.log(res.data.data[4])
                            //     var bchearr=[];
                            // for (var i = 0; i <=res.data.data.length;i++) {
                            //         bchearr.push(res.data.data.pop());
                            //     }
                            //     that.befer=bchearr[0].id
                            //     if(that.pages>res.data.data.length){
                            //         that.pagestore=false
                            //         that.list = bchearr
                            //     }else{
                            //         that.list = bchearr
                            //     }


                            //     console.log(that.list)
                            if (res.data.data !== null) {
                                for (var i = 0; i <res.data.data.length;i++) {
                                    that.list.push(res.data.data[i])
                                    }
                                    that.befer=that.list[that.list.length-1].id
                            } else {

                            }
                        })
                    })
                }else if(this.currency=='ETH'){

                }else{
                    Ethtohelle(localStorage.getItem("assetaddress")).then((res) => {
                        that.myaddress = res;
                        axios.get(urlUtil.getApiUrl("api_rootlist") +"/v1/txs_address", {
                            params: {
                                limit: 30,
                                before  : that.befer,
                                address: that.myaddress,
                                // address: "halle1ug3s92g435d656tlkvrnrksq22vt8vkfgp92q4",
                                contract_address:that.contractpath
                            }
                        },).then((res) => {
                            //     console.log(res.data.data[4])
                            //     var bchearr=[];
                            // for (var i = 0; i <=res.data.data.length;i++) {
                            //         bchearr.push(res.data.data.pop());
                            //     }
                            //     that.befer=bchearr[0].id
                            //     if(that.pages>res.data.data.length){
                            //         that.pagestore=false
                            //         that.list = bchearr
                            //     }else{
                            //         that.list = bchearr
                            //     }


                            //     console.log(that.list)
                            if (res.data.data !== null) {
                                for (var i = 0; i <res.data.data.length;i++) {
                                    that.list.push(res.data.data[i])
                                }
                                that.befer=that.list[that.list.length-1].id
                            } else {

                            }
                        })
                    })
                }

            },
            //余额
            getBalance(fromAddress) {
                var that = this;
                const _from = fromAddress;
                const web3 = this.web3
                web3.eth.getBalance(_from, function (err, value) {
                    if (that.CurrentlyselectedWallet==1){
                        that.balance = value / 1000000
                    }else {
                        that.balance = value / 1000000000000000000
                    }
                    if (err) {
                        this.balance = ''
                        this.msg = '未获取到余额'
                        return
                    }
                }.bind(this))
            },
            //切换选项卡
            msgs(i) {
                this.msg = i;
                this.getdata()
                this.pages = 10
                this.pagestore = true
            },
            //上拉加载
            loadMore: function () {
                console.log(this.pagestore)
                if (this.pagestore) {
                    this.pages += 10
                    this.getdata()
                }

            },
            Collection() {
                this.$push({
                    path: '/currencyCollect',
                    query: {
                        addrees: this.myaddress,
                        currency:this.currency,
                        icon:this.icon
                    }
                })
            },
            payment() {
                this.$push({
                    path: '/currencyTransfer',
                    query: {
                        currency: this.currency,
                        contractethpath:this.contract

                    }
                })
            },
            exchange() {
                    this.$push({
                        path: '/moneyChanging',
                        query: {
                            currency: this.currency,
                            contractethpath:this.contract

                        }
                    })

            },
            godetail(i) {
                this.$push({
                    path: '/currencyDealDetail',
                    query: {
                        i,
                        currency: this.currency
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .wrapper {
    }

    .sidebar_list_wrapperimport {
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .sidebar_list_padding {
        padding: 0 0.3rem;
    }

    .sidebar_listaddimport {
        display: flex;
        justify-content: space-around;
    }

    .sidebar_item {
        padding: 0.2rem;
        position: relative;
    }

    .sidebar_item_pic {
        width: 0.9rem;
        height: 0.9rem;
    }

    .sidebar_item_create {
        width: .9rem;
        height: .9rem;
        background: url("../static/images/newWallet/icon_sk.png") no-repeat center center / cover;
    }

    .sidebar_item_import {
        width: .9rem;
        height: .9rem;
        background: url("../static/images/newWallet/icon_fk.png") no-repeat center center / cover;
    }
    .sidebar_item_exhang{
        width: .9rem;
        height: .9rem;
        background: url("../static/images/newWallet/icon_dh.png") no-repeat center center / cover;
    }
    .sidebar_txt3 {
        text-align: center;
        font-size: 0.24rem;
        color: #333;
        font-weight: bold;
        line-height: 0.5rem;

    }

    .Mybalance {
        padding: .3rem;
    }

    .Mybalance > div:nth-of-type(1) {
        font-size: .36rem;
        color: #8E398C;
        font-weight: bold;
    }

    .Mybalance > div:nth-of-type(2) {
        font-size: .24rem;
        color: #AAAAAA;
        font-weight: bold;
    }

    .tab > .ativetab {
        background: #8E398C;
        color: white;
    }

    .tab {
        display: flex;
        padding: .3rem;
    }

    .main {
        height: 100%;
        overflow: scroll;
        padding: 0 .3rem;
    }

    .main > div {
        margin-bottom: 3.5rem;
    }

    .main > div > div {
        padding: .2rem 0;
        height: .8rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #EEEEEE;
    }

    .main > div > div > div {
        display: flex;
    }

    .main > div > div > div p:nth-of-type(1) {
        font-size: .26rem;
    }

    .main > div > div > div p:nth-of-type(2) {
        color: #AAAAAA;
        font-size: .2rem;
    }

    .main > div > div > div:nth-of-type(1) img {
        margin-top: .075rem;
        width: .6rem;
        height: .6rem;
        margin-right: .15rem;
    }

    .main > div > div > div:nth-of-type(2) img {
        margin-left: .1rem;
        margin-top: .2rem;
        width: .35rem;
        height: .35rem;
    }

    .main > div > p {
        text-align: center;
        line-height: .6rem;
        color: #666666;
    }

    .main > div > div > div:nth-of-type(2) {
        text-align: right;
    }

    .he {
        height: .2rem;
        background: #F5F5F5;
    }

    .tab > div {
        width: 33.3%;
        height: .8rem;
        line-height: .8rem;
        color: #070707;
        text-align: center;
        border: 1px solid rgba(238, 238, 238, 1);
    }

    .gree {
        color: #22AC38;
        font-size: .26rem;
    }

    .red {
        color: #FF0000 !important;
    }
    .record{
        text-align: center;
    }
</style>

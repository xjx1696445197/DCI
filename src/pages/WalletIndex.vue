<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="gologin"></div>
            <p class="HEADER_TITLE_WALLET"></p>

        </div>
        <div class="wrapper">
            <div class="logo mauto"></div>
<!--            <div class="logotest mauto"></div>-->
            <div class="logo_txt tcenter">DCI</div>
            <div class="btns">
                <div class="btn BUTTON_BGCOLOR BUTTON_SHADOW mauto tcenter"
                    @click="toCreateWallet"
                >创建钱包</div>
                <div class="btn BUTTON_BGCOLOR BUTTON_SHADOW mauto tcenter"
                    @click="toImportWallet"
                >导入钱包</div>
            </div>
            <div class="version tcenter">版本：1.0.0</div>
        </div>
    </div>
</template>


<script>

    export default {
        name: "WalletIndex",
        data(){
            return {

            }
        },
        mounted(){

        },
        computed: {

        },
        methods: {
            gologin(){
                this.$push({
                    path: '/login'
                })
            },

        //    跳转到创建钱包页面
            toCreateWallet(){
                this.$push({
                    path: '/Wallettype',
                    query:{
                        type:1
                        // 1创建 2导入
                    }
                })
            },
        //    跳转到导入钱包页面
            toImportWallet(){
                this.$push({
                    path: '/Wallettype',
                    query:{
                        type:2
                        // 1创建 2导入
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .logotest{
                width: 1.8rem;
            height: 1.8rem;
            border-radius: .35rem;
            background: url("../static/images/newWallet/logotest.png") no-repeat center center / cover;
            background-size:100%;
    }
    .logo{
        width: 2.2rem;
        height: 2.2rem;
        background: url("../static/images/newWallet/my_pic.png") no-repeat center center / cover;
        border-radius: 0.4rem;
        margin-top: 1.1rem;
    }
    .btns{
        margin-top: 1rem;
    }
    .btn{
        width: 5rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.3rem;
        line-height: 0.8rem;
        color: #fff;
    }
    .btn+.btn{
        margin-top: 0.76rem;
    }
    .version{
        position: fixed;
        left: 0;
        bottom: 0.4rem;
        font-size: 0.24rem;
        line-height: 0.4rem;
        color: #070707;
        width: 100%;
    }
    .logo_txt{
        font-size: 0.36rem;
        line-height: 1rem;
        color: #000000;
    }
</style>





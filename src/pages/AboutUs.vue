<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">关于我们</p>
        </div>
        <div class="wrapper">
            <div class="content">
                <div class="aboutUs_top">
                    <div class="aboutUs_logo"></div>
<!--                    <p class="aboutUs_txt1">DCI</p>-->
                </div>
<div class="hh">

</div>
                <div class="aboutUs_lists">

                <div class="LIST ARROW LAST_NO_BORDER">
                    <div class="ITEM" @click="go" data-path="/userAgreements">
                        <p class="ITEM_TXT">{{$t('aboutUs.aboutUs_userProtocol')}}</p>
                    </div>
                    <div class="ITEM" @click="go" data-path="/privacyAgreement">
                        <p class="ITEM_TXT">{{$t('aboutUs.aboutUs_policy')}}</p>
                    </div>
                    <!--                        <div class="ITEM" @click="go" data-path="/updatelog">-->
                    <!--                            <p class="ITEM_TXT">版本日志</p>-->
                    <!--                        </div>-->
                    <div class="ITEM">
                        <p class="ITEM_TXT">当前版本</p>
                        <p class="ITEM_TXTs">{{version}}</p>
                    </div>

                </div>

                <!--<div class="LIST">-->
                <!--<div class="ITEM">-->
                <!--<p class="ITEM_TXT">{{$t('aboutUs.aboutUs_officialWebsite')}}</p>-->
                <!--<p class="ITEM_TXT">http://www.halle.io</p>-->
                <!--</div>-->
                <!--</div>-->
            </div>
                <div class="hh">

                </div>
                <div class="aboutUs_lists">

                    <div class="LIST ARROW LAST_NO_BORDER">

                        <div class="ITEM" @click="go" data-path="/feedback">
                            <p class="ITEM_TXT">问题反馈</p>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowODE2Q0IzNkM0RTgxMUVBOTdBNUVDRDU4RTk4OTc4QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowODE2Q0IzN0M0RTgxMUVBOTdBNUVDRDU4RTk4OTc4QyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA4MTZDQjM0QzRFODExRUE5N0E1RUNENThFOTg5NzhDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA4MTZDQjM1QzRFODExRUE5N0E1RUNENThFOTg5NzhDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+B77rOwAAARhJREFUeNrE1r0KwjAUBeA2aOna0c3HcfEPCz6BiE/mUicdFHwZURwcuglFxHoCdwhF06S9VwOH2Br4mhuSNizLMvhHU7Y/4zieIzlyRgaccGibsUbRJXT5QNKiKLbiM0a7G78jJMPDDH8BL2im7LgVRln36GYSeN2MNb6TwJXLIAlcuQ7kxpXPYE5c+T4p4WlbXDVZHzpEWuFhm7OakIzQwDjhxrQVZWALfgLcZy/1l7I/jduJyBp/aFHl+iUOo9R6e62RjnE7F4UNtGtWH1mKwRZ0inU/isA16F7kAOFAvWEu1AvmRIPKFmiCToAeRN7HEqjL560+hzfcqAt8RdfjRl1KHUmgLvAKuSEXZMSFsryPm7a3AAMAcwijDX42uEwAAAAASUVORK5CYII=">
                        </div>
                    </div>
                    <!--<div class="LIST">-->
                    <!--<div class="ITEM">-->
                    <!--<p class="ITEM_TXT">{{$t('aboutUs.aboutUs_officialWebsite')}}</p>-->
                    <!--<p class="ITEM_TXT">http://www.halle.io</p>-->
                    <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { version } from "@/config";

    export default {
        name: "AboutUs",
        data(){
            return {
                version
            }
        },
        methods: {
            go(e){
                const {
                    path
                } = e.currentTarget.dataset

                this.$push({ path })
            }
        }
    }
</script>

<style scoped>
    .content{
        padding-top: .24rem;
    }
    .aboutUs_top{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .5rem 0;
    }
    .aboutUs_logo{
        width: 1.65rem;
        height: 1.07rem;
        background: url("../static/images/newWallet/logo.png") no-repeat center center / cover;
        margin-bottom: 0.2rem;
    }
    .aboutUs_txt1{
        /*width: 1.8rem;*/
        height: 1.8rem;
        font-size: 0.36rem;
        color: #070707;
        line-height: 1.8rem;
        font-weight: bold;
        /*font-style:italic;*/
        /*border-radius: .35rem;*/
        /*background: url("../static/images/newWallet/logotest.png") no-repeat center center / cover;*/
        /*background-size:100%;*/
    }
    .aboutUs_txt2{
        font-size: .26rem;
        color: #333;
        line-height: .45rem;
        margin-top: 0.1rem;
    }
    .aboutUs_lists{
        padding: 0 .3rem;
    }
    .ITEM{
        justify-content: space-between;
        border-bottom: 1px solid #EEEEEE;

    }
    .LIST+.LIST{
    }
    .LIST.LAST_NO_BORDER .ITEM:last-child {
        border-bottom: 1px solid #EEEEEE;
    }
    .LIST.ARROW .ITEM:last-child:after{
      display: none;
    }
    .LIST.ARROW .ITEM:last-child{
        padding-right: 0;
    }
    .LIST img{
        position: absolute;
        right: 0;
        width: .3rem;
        height: .3rem;
    }
    .hh{
        height: .2rem;
        background: #F5F5F5;
    }
</style>

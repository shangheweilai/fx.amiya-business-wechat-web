<template>
    <div>
        <van-tabs v-model="active" title-active-color="#4C71F6">
            <van-tab title="自播达人">
                <div class="nav">
                    <div class="nav_left">
                        <div>完成率</div>
                        <div class="nav_num">{{performance.selfLiveAnchorPerformanceCompleteRate ? performance.selfLiveAnchorPerformanceCompleteRate + '%' : '0%'}}</div>
                        <div>目标：{{performance.selfLiveAnchorPerformanceTarget ? performance.selfLiveAnchorPerformanceTarget  : 0 }}w</div>
                        <van-progress :percentage="performance.selfLiveAnchorPerformanceCompleteRate == null ? 0 : performance.selfLiveAnchorPerformanceCompleteRate > 100 ? 100 : performance.selfLiveAnchorPerformanceCompleteRate == 0 ? 0 : performance.selfLiveAnchorPerformanceCompleteRate" style="width:120px;margin:10px auto 0" :show-pivot="false" color="#21D4AD" track-color="#ccc"/>
                    </div>
                    <div class="nav_right">
                        <div class="right_top">
                            <div>同比</div>
                            <div  class="nav_num" v-if="Math.sign(performance.selfLiveAnchorPerformanceYearToYear)== 1">{{'+' + performance.selfLiveAnchorPerformanceYearToYear + '%'}}</div>
                            <div  class="nav_num" v-else-if="Math.sign(performance.selfLiveAnchorPerformanceYearToYear)== -1">{{performance.selfLiveAnchorPerformanceYearToYear + '%'}}</div>
                            <div  class="nav_num" v-else>0%</div>
                        </div>
                        <div class="right_bottom">
                            <div>环比</div>
                            <div  class="nav_num" v-if="Math.sign(performance.selfLiveAnchorPerformanceChainRatio)== 1">{{'+' + performance.selfLiveAnchorPerformanceChainRatio+ '%'}}</div>
                            <div  class="nav_num" v-else-if="Math.sign(performance.selfLiveAnchorPerformanceChainRatio)== -1">{{performance.selfLiveAnchorPerformanceChainRatio+ '%'}}</div>
                            <div  class="nav_num" v-else>0%</div>
                        </div>
                    </div>
                </div>
                <div class="button" @click="$router.push({path:'/naturalSeeding',query:{active:0}})">查看详情</div>
            </van-tab>
            <van-tab title="合作达人">
                <div class="nav">
                    <div class="nav_left">
                        <div>完成率</div>
                        <div class="nav_num">{{performance.otherLiveAnchorPerformanceCompleteRate ? performance.otherLiveAnchorPerformanceCompleteRate + '%' : '0%'}}</div>
                        <div>目标：{{performance.otherLiveAnchorPerformanceTarget ? performance.otherLiveAnchorPerformanceTarget  : 0 }}w</div>
                        <van-progress :percentage="performance.otherLiveAnchorPerformanceCompleteRate == null ? 0 : performance.otherLiveAnchorPerformanceCompleteRate > 100 ? 100 : performance.otherLiveAnchorPerformanceCompleteRate == 0 ? 0 : performance.otherLiveAnchorPerformanceCompleteRate" style="width:120px;margin:10px auto 0" :show-pivot="false" color="#21D4AD" track-color="#ccc"/>
                    </div>
                    <div class="nav_right">
                        <div class="right_top">
                            <div>同比</div>
                            <div  class="nav_num" v-if="Math.sign(performance.otherLiveAnchorPerformanceYearToYear)== 1">{{'+' + performance.otherLiveAnchorPerformanceYearToYear + '%'}}</div>
                            <div  class="nav_num" v-else-if="Math.sign(performance.otherLiveAnchorPerformanceYearToYear)== -1">{{performance.otherLiveAnchorPerformanceYearToYear + '%'}}</div>
                            <div  class="nav_num" v-else>0%</div>
                        </div>
                        <div class="right_bottom">
                            <div>环比</div>
                            <div  class="nav_num" v-if="Math.sign(performance.otherLiveAnchorPerformanceChainRatio)== 1">{{'+' + performance.otherLiveAnchorPerformanceChainRatio+ '%'}}</div>
                            <div  class="nav_num" v-else-if="Math.sign(performance.otherLiveAnchorPerformanceChainRatio)== -1">{{performance.otherLiveAnchorPerformanceChainRatio+ '%'}}</div>
                            <div  class="nav_num" v-else>0%</div>
                        </div>
                    </div>
                </div>
                <div class="button" @click="detail">查看详情</div>
            </van-tab>
            <van-tab title="带货板块">
                <div class="nav">
                    <div class="nav_left">
                        <div>完成率</div>
                        <div class="nav_num">{{performance.commercePerformanceCompleteRate ? performance.commercePerformanceCompleteRate + '%' : '0%'}}</div>
                        <div>目标：{{performance.commercePerformanceTarget ? performance.commercePerformanceTarget  : 0 }}w</div>
                        <van-progress :percentage="performance.commercePerformanceCompleteRate == null ? 0 : performance.commercePerformanceCompleteRate > 100 ? 100 : performance.commercePerformanceCompleteRate == 0 ? 0 : performance.commercePerformanceCompleteRate" style="width:120px;margin:10px auto 0" :show-pivot="false" color="#21D4AD" track-color="#ccc"/>
                    </div>
                    <div class="nav_right">
                        <div class="right_top">
                            <div>同比</div>
                            <div  class="nav_num" v-if="Math.sign(performance.commercePerformanceYearToYear)== 1">{{'+' + performance.commercePerformanceYearToYear + '%'}}</div>
                            <div  class="nav_num" v-else-if="Math.sign(performance.commercePerformanceYearToYear)== -1">{{performance.commercePerformanceYearToYear + '%'}}</div>
                            <div  class="nav_num" v-else>0%</div>
                        </div>
                        <div class="right_bottom">
                            <div>环比</div>
                            <div  class="nav_num" v-if="Math.sign(performance.commercePerformanceChainRatio)== 1">{{'+' + performance.commercePerformanceChainRatio+ '%'}}</div>
                            <div  class="nav_num" v-else-if="Math.sign(performance.commercePerformanceChainRatio)== -1">{{performance.commercePerformanceChainRatio+ '%'}}</div>
                            <div  class="nav_num" v-else>0%</div>
                        </div>
                    </div>
                </div>
                <div class="button" @click="detail">查看详情</div>
            </van-tab>
            <van-tab title="其他收入">
                <div class="nav">
                    <div class="nav_left">
                        <div>完成率</div>
                        <div class="nav_num">{{performance.otherPerformanceCompleteRate ? performance.otherPerformanceCompleteRate + '%' : '0%'}}</div>
                        <div>目标：{{performance.otherPerformanceTarget ? performance.otherPerformanceTarget  : 0 }}w</div>
                        <van-progress :percentage="performance.otherPerformanceCompleteRate == null ? 0 : performance.otherPerformanceCompleteRate > 100 ? 100 : performance.otherPerformanceCompleteRate == 0 ? 0 : performance.otherPerformanceCompleteRate" style="width:120px;margin:10px auto 0" :show-pivot="false" color="#21D4AD" track-color="#ccc"/>
                    </div>
                    <div class="nav_right">
                        <div class="right_top">
                            <div>同比</div>
                            <div  class="nav_num" v-if="Math.sign(performance.otherPerformanceYearToYear)== 1">{{'+' + performance.otherPerformanceYearToYear + '%'}}</div>
                            <div  class="nav_num" v-else-if="Math.sign(performance.otherPerformanceYearToYear)== -1">{{performance.otherPerformanceYearToYear + '%'}}</div>
                            <div  class="nav_num" v-else>0%</div>
                        </div>
                        <div class="right_bottom">
                            <div>环比</div>
                            <div  class="nav_num" v-if="Math.sign(performance.otherPerformanceChainRatio)== 1">{{'+' + performance.otherPerformanceChainRatio+ '%'}}</div>
                            <div  class="nav_num" v-else-if="Math.sign(performance.otherPerformanceChainRatio)== -1">{{performance.otherPerformanceChainRatio+ '%'}}</div>
                            <div  class="nav_num" v-else>0%</div>
                        </div>
                    </div>
                </div>
                <div class="button" @click="detail">查看详情</div>
            </van-tab>

        </van-tabs>
    </div>
</template>
<script>
export default{
    props:{
        performance:Object
    },
    data(){
        return{
            active:0,
        }
    },
    methods:{
        detail(){
            this.$toast('敬请期待！')
        }
    }
}
</script>
<style scoped lang="less">
    .nav{
        width: 100%;
        display: flex;
        font-size: 14px;
        .nav_left{
            width: 49%;
            text-align: center;
            border-right:1px solid #9AC1FF;
            margin-top: 30px;
            .nav_num{
                font-size: 20px;
                margin: 10px 0;
            }
        }
        .nav_right{
            width: 40%;
            text-align: center;
            margin-top: 30px;
            .nav_num{
                font-size: 20px;
                margin: 5px 0;
            }
            .right_top{
                border-bottom: 1px solid #9AC1FF;
                padding-bottom: 10px;
                box-sizing: border-box;
            }
            .right_bottom{
                margin-top: 10px;
            }
        }
    }
    .button{
        width: 170px;
        height: 40px;
        line-height: 40px;
        background: #4C71F6;
        color: #fff;
        border-radius: 20px;
        text-align: center;
        font-size: 16px;
        margin:20px auto 0

    }
</style>

<template>
    <div class="contents2" v-if="isLoading == false" >
       <div class="assistant_list" v-for="(item,index) in performance" :key="index">
            <div class="assistant_item" @click="$router.push({path:'/assistantDetails',query:{customerServiceId:item.customerServiceId}})">
                <div class="assistant_left" style="color:#FF0000" v-if="index == 0">{{item.customerServiceName}}</div>
                <div class="assistant_left" style="color:#FF6600" v-else-if="index == 1">{{item.customerServiceName}}</div>
                <div class="assistant_left" style="color:#FFC760" v-else-if="index == 2">{{item.customerServiceName}}</div>
                <div class="assistant_left"  v-else>{{item.customerServiceName}}</div>
                <div class="assistant_right">
                    <div class="assistant_top">
                        <span class="tit">总业绩</span>
                        <span class="tit_num">{{item.totalPerformance}}w</span>
                    </div>
                    <div class="assistant_bottom">
                        <div class="new_achievement">
                            <div class="achievement_num">{{item.newCustomerPerformance}}w</div>
                            <div class="achievement_title">新客业绩</div>
                        </div>
                        <div class="new_achievement">
                            <div class="achievement_num">{{item.oldCustomerPerformance}}w</div>
                            <div class="achievement_title">老客业绩</div>
                        </div>
                        <div class="new_achievement">
                            <div class="achievement_num">{{item.visitNumRatio}}%</div>
                            <div class="achievement_title">上门率</div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
       <!-- <div class="no_data" :style="{height:!performance ? '90%' : '5px',position:'absolute',bottom:!performance ? '40%' : '0px'}">没有更多了</div> -->
       <!-- <div class="no_data" v-if="!performance" :style="{height:!performance ? '94%' : '5px',position:'absolute',bottom:!performance ? '0' : '30px',left:'49%'}">没有更多了</div> -->
       <div class="no_data">没有更多了</div>
    </div>
    <van-loading size="24px" vertical text-color="#fff" color="#fff" style="height:100vh;padding:100px 0 0 50px" v-else>加载中...</van-loading>
</template>
<script>

export default {
    props:{
        performance:Array,
        isLoading:Boolean,
    },
    data(){
        return{
        }
    },
    methods:{
        
    }
}
</script>
<style scoped lang="less">
.contents2{
    width: 100%;
    height: 100vh;
    padding-left: 60px;
    box-sizing: border-box;
    .assistant_list{
        width: 100%;
        .assistant_item{
            width: 94%;
            display: flex;
            align-items: center;
            padding: 5px 10px;
            box-sizing: border-box;
            background: #e9f3ff;
            border-radius: 10px;
            margin: 10px auto 0;
            .assistant_left{
                font-size: 15px;
                font-weight: bold;
                margin-right: 10px;
                width: 80px;
                padding-left: 10px;
                box-sizing: border;
            }
            .assistant_right{
                flex:1;
                .assistant_top{
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 5px;
                    box-sizing: border-box;
                    .tit{
                        font-size: 12px;
                        color: #888585;
                    }
                    .tit_num{
                        font-size: 15px;
                        color: #5492FE;
                        margin-left: 5px;
                    }
                }
                .assistant_bottom{
                    font-size: 12px;
                    padding: 5px 0;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-around;
                    .new_achievement{
                        border-right: 1px solid #ccc;
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                        padding-right:10px;
                        box-sizing: border-box;
                        justify-content: center;
                        .achievement_num{
                            font-size: 14px;
                            color: #5492FE;
                            margin-top: 3px;
                            // margin-right: 10px;
                            text-align: center;
                        }
                    }
                    .new_achievement:last-child{
                        border: none;
                    }
                    
                }
            }
        }
    }
    .no_data{
        text-align: center;
        color: #ccc;
        font-size: 14px;
        box-sizing: border-box;
        // padding: 10px 0;
        // box-sizing: border-box;
        margin-top: 5px;
        
    }
}
</style>
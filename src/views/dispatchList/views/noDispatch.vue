<template>
  <div class="content">
    <div class="search_content">
        <van-field
            v-model="query.keyword"
            placeholder="请输入关键字"
            class="search"
            @input="blurInput"
        />
        <div class="calendar_con" @click="calendarClick">
            <i class="iconfont icon-rili search_icon"></i>
            <div>
            <div class="calendar_name">{{query.startDate}}</div>
            <div class="calendar_name">{{query.endDate}}</div>
            </div>
        </div>
        <i class="iconfont icon-icon-sousu search_icon" @click="handleSearch"></i>
    </div>
    <van-calendar
        v-model="calendarModel"
        @confirm="onConfirm"
        color="#1989fa"
        :min-date="minDate"
        :max-date="maxDate"
        type="range"
      />
    <div class="list_wrap" >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        :error.sync="error"
      >
        <div>
        <van-swipe-cell v-for="(item, index) in list" :key="index">

          <div class="item">
            <div class="item_con"></div>
            <div class="item_top">
              <div style="color:#000">订单：<span v-clipboard:copy="item.orderId" v-clipboard:success="onCopySuccess">{{item.orderId}}</span></div>
              <!-- <div class="item_type">状态：{{item.orderStatusText}}</div> -->
            </div>
            <div class="item_center">
              <van-image
                width="50"
                height="50"
                :src="item.thumbPictureUrl"
                style="margin:0 8px 0 0"
              />
              <div class="item_right">
                <div class="hospital_con">客户：<div class="hospital">{{item.customerName}}</div></div>
                 <div class="right_content">
                  <div>手机：{{item.phone}}</div>
                </div>
                <div class="hospital_con">预约门店：<div class="hospital">{{item.appointmentHospital}}</div></div>
                <div class="right_content">
                  <div>面诊：{{item.consultationTypeText}}</div>
                  <div class="ip_con">主播IP：<span class="ip">{{item.liveAnchorName}}</span></div>
                </div>
              </div>
            </div>
          </div>

          <template #right>
            <van-button square color="linear-gradient(to bottom, #8ab4fe,#5492FE)" text="派单" @click="dispatchClick(item.orderId)"/>
            <van-button square  color="linear-gradient(to bottom, #8ab4fe,#5492FE)" text="详情" @click="detailClick(item.orderId)"/>
          </template>
        </van-swipe-cell>

        <!-- 派单弹出层 -->
        <van-popup v-model="dispatchModel" position="bottom" class="dispatch_content" round :close-on-click-overlay="false">
            <van-field
              v-model="form.hospitalName"
              label="派单医院"
              disabled
              @click="hospitalIdModel = true"
              placeholder="请选择派单医院"
              class="customer_content"
            />
            <van-field
              v-model="form.sendByName"
              label="派单人员"
              disabled
              @click="sendByModel = true"
              placeholder="请选择派单人员"
              class="customer_content"
            />
            <van-field
              v-model="form.remark"
              label="派单留言"
              placeholder="请输入派单留言"
              class="customer_content"
              @input="remarkInput"
              type="textarea"
              :rows="4"
            />
            <div class="bottom">
              <van-button round block type="default"  class="button" @click="cancel">取消</van-button>
              <van-button round block type="info"  class="button" @click="submite">确认</van-button>
          </div>
        </van-popup>

        <!-- 派单医院  -->
        <van-popup v-model="hospitalIdModel" round position="bottom">
          <van-picker
            show-toolbar
            :columns="hospitalName"
            @cancel="hospitalIdModel = false"
            @confirm="hospitalIdConfirm"
          />
        </van-popup>
        <!-- 派单人员 -->
        <van-popup v-model="sendByModel" round position="bottom">
          <van-picker
            show-toolbar
            :columns="sendByName"
            @cancel="sendByModel = false"
            @confirm="sendByConfirm"
          />
        </van-popup>



        </div>
      </van-list>
    </div>

    <!-- 订单详情 -->
    <detail/>
  </div>
</template>
<script>
import * as api from "@/api/order.js";
import detail from "../../detail/detail.vue"
export default {
  components: {detail},
  data() {
    return {
        calendarModel:false,
        minDate: new Date(2020, 1, 1),
        maxDate: new Date(2024, 1, 1),
      // 搜索字段
      query: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        keyword:'',
        startDate: this.$moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      list: [],
      loading: false,
      finished: false,
      error: false,
      startDate:'',
      endDate:'',

      // 派单model
      dispatchModel:false,

      form:{
        // 派单医院
        hospitalId:null,
        hospitalName:null,
        // 订单号
        orderId:'',
        // 是否明确时间
        isUncertainDate:false,
        // 预约到院日期
        appointmentDate:'',
        // 备注
        remark:'',
        // 派单人员
        sendBy:null,
        sendByName:''

      },
      //医院model 
      hospitalIdModel:false,
      hospitalName:[],
      // 派单人员
      sendByModel:false,
      sendByName:[],
    };
  },

  methods: {
    calendarClick(){
      this.calendarModel = true
      // this.defaultDate = [this.query.startDate,this.query.endDate]
    },
    dispatchClick(value){
      this.dispatchModel =  true
      this.form.orderId = value
    },
    cancel(){
      this.form = {}
      this.dispatchModel = false
    },
    submite(){
      const {hospitalId,sendBy,orderId,remark} = this.form
      if(!hospitalId){
        this.$toast('请选择派单医院')
        return
      }
      if(!sendBy){
        this.$toast('请选择派单人员')
        return
      }
      const data = { 
        orderId,
        hospitalId:Number(hospitalId),
        sendBy:Number(sendBy),
        remark,
        isUncertainDate:false,
        appointmentDate:null,
      }
      api.ContentPlateFormOrder(data).then((res)=>{
        if(res.code === 0){
          this.$toast('派单成功')
          this.form = {}
          this.dispatchModel = false
          this.getunContentPlatFormSendOrderList()
        }else{
          this.$toast(res.msg)
        }
      })
    },
    // 订单详情
    detailClick(value){
      api.getByidContentPlateFormOrder(value).then((res) => {
        if(res.code === 0){
          // this.detailIfon = res.data.orderInfo
          this.$router.push({
            path:'/detail',
            query:{
              orderInfo:res.data.orderInfo
            }
          })
        }
      })
    },

    // 获取医院
    getHospitalInfo() {
        api.HospitalInfo().then((res) => {
            this.hospitalInfo =res.data.hospitalInfo;
            let hospitalName=[]
            this.hospitalInfo.map(item=>{
                hospitalName.push(item.name)
            })
            this.hospitalName = hospitalName
        
        });
    },

    // 客服
    getCustomerServiceNameList() {
      api.customerServiceNameList().then((res) => {
        this.employee = res.data.employee;
        let sendByName = [];
        this.employee.map((item) => {
          sendByName.push(item.name);
        });
        this.sendByName = sendByName;
      });
    },

    // 医院确认弹窗
    hospitalIdConfirm(value){
      this.form.hospitalName = value;
      this.hospitalIdModel = false;
      // 取id
      this.hospitalInfo.map((item) => {
          if (item.name == value) {
          this.form.hospitalId = item.id;
          }
      });
    },
    // 派单人员确认弹窗
    sendByConfirm(value){
      this.form.sendByName = value;
      this.sendByModel = false;
      // 取id
      this.employee.map((item) => {
          if (item.name == value) {
          this.form.sendBy = item.id;
          }
      });
    },
    
    // 派单留言
    remarkInput(value) {
      this.form.remark = value;
    },
    
    // 复制
    onCopySuccess(){
      this.$toast("复制成功");
    },

    // 日期搜索
    onConfirm(value) {
      // this.list = []
      // this.calendarModel = false;
      // this.query.startDate = this.$moment(value[0]).format("YYYY-MM-DD")
      // this.query.endDate = this.$moment(value[1]).format("YYYY-MM-DD")
      // this.query.pageNum = 1 
      // this.finished = false;
      // this.loading = true;
      // this.onLoad();
      this.query.startDate = this.$moment(value[0]).format("YYYY-MM-DD")
      this.query.endDate = this.$moment(value[1]).format("YYYY-MM-DD")
      this.calendarModel = false
      this.query.pageNum = 1 
    },

    // 关键字搜索
    blurInput(value){
        // this.list = []
        // this.query.keyword = value
        // this.query.pageNum = 1 
        // this.finished = false;
        // this.loading = true;
        // this.onLoad();
        this.query.keyword = value
        
    },
    // 搜索
    handleSearch() {
      this.list=[]
      this.query.pageNum = 1 
      this.finished = false;
      this.loading = true;
      this.onLoad()
    },
    // 搜索icon
    // searchClick(){
    //   this.finished = false;
    //   this.loading = true;
    //   this.getunContentPlatFormSendOrderList()
    // },

    // 获取未派单订单
    getunContentPlatFormSendOrderList() {
      const { pageNum, pageSize ,keyword,startDate,endDate} = this.query;
      const data = {
        startDate: startDate ? startDate : null,
        endDate: endDate ? endDate : null,
        keyword: keyword,
        pageNum,
        pageSize,
        liveAnchorId:null,
        consultationEmpId:null,
        contentPlateFormId:'',
        employeeId:-1,
        orderStatus:null,
        orderSource:-1

      };
      api.unContentPlatFormSendOrderList(data).then((res) => {
        if (res.code === 0) {
          const { list, totalCount } = res.data.unSendOrder;
          this.list = [...this.list, ...list];
          this.query.pageNum++;
          this.loading = false;
          if (this.list.length === totalCount) {
            this.finished = true;
          }
        }
      }).catch(() => {
          this.error = true;
        });;
    },

    onLoad() {
      this.getunContentPlatFormSendOrderList();
      
    },

  },
  created() {
    this.getHospitalInfo()
    this.getCustomerServiceNameList()
  },
};
</script>
<style lang="less" scoped>
// /deep/.van-list{
//   min-height: calc(100vh - 100px); overflow: hidden;
// }
.content{
  background: #C7DBFF;
  width: 100%;
  // height: 100vh;
}
/deep/.van-swipe-cell__right{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/deep/ .van-button,.van-button--info ,.van-button--normal ,.van-button--square{
  margin: 5px 0;
}
.dispatch_content{
 
  height: 43%;
  color: #5492FE;
}
.customer_content {
   width: 90%;
  margin: 0 auto;
        border-bottom: 1px solid #bbd3ff;
        padding: 10px 0;
        box-sizing: border-box;
        /deep/.van-cell__title,
        .van-field__label {
        width: 70px;
        color: #5492fe;
        }
    }
.search_content{
    width: 100%;
    height: 55px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: #8ab4fe;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    align-items: center;
    .search_icon{
        font-size: 28px;
        color: #fff;
    }
    .calendar_name{
        font-size: 12px;
        color: #fff;
        margin-left: 5px;
    }
    .calendar_con{
        width: 120px;
        display: flex;
        align-items: center;
        margin-left: 5px;
    }
}
.search{
    width: 60%;
    height: 35px;
    line-height: 35px;
    background: #f5f5f5;
    border-radius: 10px;
    border: none;
    padding: 0 10px;
}
.search_icon{
  font-size: 25px;
  color: #fff;
}

.list_wrap {
    margin-top: 55px;
    .item_con{
      background-image: url('../../../assets/right.png');
      background-size: 100% 100%;
      background-repeat: no-repeat no-repeat ;
      position: fixed;
      right: 20px;
      top: 25px;
      width: 90px;
      height: 70px;
    }
  .item {
    width: 96%;
    background: #E9F3FF;
    border-radius: 10px;
    margin: 15px auto 0;
    color: #565151;
    font-size: 13px;
    padding: 10px;
    box-sizing: border-box;
    .item_top{
      display: flex;
      justify-content: space-between;
      .copy{
        background: #f5f5f5;
        border-radius: 10px;
        padding: 0 6px;
        box-sizing: border-box;
        color: #5492FE;
      }
      .item_type{
        color: #5492FE;
      }
    }
    .item_center{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 7px 0;
      .item_right{
        width: 100%;
        flex:1;
        .right_content{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .nickname_con{
            display: flex;
            .nickname{
                width: 100px ;
                overflow: hidden; /*超出隐藏*/
                text-overflow: ellipsis;/*隐藏后添加省略号*/
                white-space: nowrap;/*强制不换行*/
              }
          }
          .ip_con{
            margin-left: 10px;
            display: flex;
              .ip{
                width: 100px ;
                overflow: hidden; /*超出隐藏*/
                text-overflow: ellipsis;/*隐藏后添加省略号*/
                white-space: nowrap;/*强制不换行*/
              }
          }
          
        }
        
      }
      .hospital_con{
            display: flex;
            .hospital{
              width: 70%;
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/
          }
          }
      
      
    }
    .item_bottom{
      display: flex;
      justify-content: space-between;
      .nickname_con{
        display: flex;
        .nickname{
            width: 130px ;
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            white-space: nowrap;/*强制不换行*/

          }
      }
    }
  }
  .nodata{
    display: flex;
    text-align: center;
}
}
.bottom{
        display: flex;
        margin-top: 20px;
        .button{
            width: 40%;
            height: 42px;
            margin:0 auto
        }
    }
</style>

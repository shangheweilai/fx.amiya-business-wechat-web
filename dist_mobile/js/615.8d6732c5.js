(self["webpackChunkh5_amiya"]=self["webpackChunkh5_amiya"]||[]).push([[615],{5615:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return g}});a(7658);var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container2"},[e("div",{staticClass:"date_con"},[e("div",{staticClass:"title"},[t._v(t._s(t.noonTip)+"，"+t._s(t.employeeName))]),e("div",{staticClass:"date"},[t._v(t._s(t.todayDate)+"，"+t._s(t.week))])]),e("div",{staticClass:"data_content"},[e("div",{staticClass:"customer"},[e("span",{staticClass:"customer_title"},[t._v("我的客户")]),e("span",{staticClass:"customer_num"},[t._v(t._s(t.myCustomerCount))])]),e("div",{staticClass:"customer"},[e("span",{staticClass:"customer_title"},[t._v("近期新增")]),e("span",{staticClass:"customer_num"},[t._v(t._s(t.sevenDaysInsertCount))])]),e("div",{staticClass:"customer"},[e("span",{staticClass:"customer_title"},[t._v("今日新增")]),e("span",{staticClass:"customer_num"},[t._v(t._s(t.todayInsertCount))])])]),e("div",{staticClass:"report_content"},[e("div",{staticClass:"report_list"},[e("div",{staticClass:"report_item",on:{click:t.recordingClick}},[e("i",{staticClass:"iconfont icon-kehuguanli report_icons2"}),e("div",{staticClass:"report_title"},[t._v("录单")])]),e("div",{staticClass:"report_item",on:{click:function(e){return t.$router.push("/orderList")}}},[e("i",{staticClass:"iconfont icon-baobiaozhongxin report_icons1"}),e("div",{staticClass:"report_title"},[t._v("订单列表")])]),e("div",{staticClass:"report_item"},[e("i",{staticClass:"iconfont icon-zy_yuyue report_icons"}),e("div",{staticClass:"report_title",on:{click:function(e){return t.$router.push("/dispatchList")}}},[t._v("派单列表")])]),e("div",{staticClass:"report_item"},[e("i",{staticClass:"iconfont icon-zy_yuyue report_icons"}),e("div",{staticClass:"report_title",on:{click:function(e){return t.dataCenterClick()}}},[t._v("数据中心")])])])]),e("div",{staticClass:"order_content"},[e("span",{staticClass:"today_order"},[t._v("今日登记到院订单（"+t._s(t.toHospitalNum)+"）")]),e("span",{staticClass:"all_order",on:{click:function(e){return t.$router.push("/dispatched")}}},[t._v("全部订单>")])]),e("div",{staticClass:"bottom_table"},[e("tables",{on:{tables:t.tables}})],1),e("tabbar",{attrs:{active:0}}),t.isLoading?e("div",{staticClass:"mc"}):t._e()],1)},s=[],i=a(6809);const n=()=>(0,i.Z)({url:"/businessWechat/BindCustomerService/getMyCustomer",method:"get"}),r=t=>(0,i.Z)({url:"/businessWechat/ContentPlatFormOrderDealInfo/todayToHospitalInfo",method:"get",params:t});a(2900);var A=function(){var t=this,e=t._self._c;return e("div",[e("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了","error-text":"请求失败，点击重新加载",error:t.error},on:{load:t.onLoad,"update:error":function(e){t.error=e}},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(a,o){return e("div",{key:o,staticClass:"list_wrap"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item_top"},[e("div",[t._v("手机号："+t._s(a.phone))]),e("div",[t._v("是否成交："+t._s(1==a.isDeal?"已成交":"未成交"))])]),e("div",{staticClass:"item_center"},[e("div",[t._v("成交金额："+t._s(a.dealPrice))]),e("div",[t._v("成交时间："+t._s(t.$moment(a.dealDate).format("YYYY-MM-DD")))])])])])})),0)],1)},c=[],d={components:{},data(){return{query:{pageNum:1,pageSize:10,totalCount:0},list:[],loading:!1,finished:!1,error:!1}},methods:{onLoad(){this.getTodayToHospitalInfo()},getTodayToHospitalInfo(){const{pageNum:t,pageSize:e}=this.query,a={startDate:this.$moment().format("YYYY-MM-DD"),endDate:this.$moment().format("YYYY-MM-DD"),dealStartDate:null,dealEndDate:null,isDeal:!0,lastDealHospitalId:null,keyWord:"",pageNum:t,pageSize:e};r(a).then((t=>{if(0===t.code){this.$emit("tables",t.data.contentPlatFormOrderDealInfo.totalCount);const{list:e,totalCount:a}=t.data.contentPlatFormOrderDealInfo;this.list=[...this.list,...e],this.query.pageNum++,this.loading=!1,this.list.length===a&&(this.finished=!0)}})).catch((()=>{this.error=!0}))}},created(){}},l=d,u=(a(4606),a(1001)),p=(0,u.Z)(l,A,c,!1,null,"bf534c44",null),m=p.exports,f=a(2689),v={components:{tables:m,tabbar:f.Z},data(){return{isLoading:!1,isPassword:!1,toHospitalNum:0,error:!1,loading:!1,finished:!1,noonTip:"",employeeName:sessionStorage.getItem("employeeName"),todayDate:this.$moment().format("YYYY-MM-DD"),week:"",myCustomerCount:sessionStorage.getItem("myCustomerCount"),sevenDaysInsertCount:sessionStorage.getItem("sevenDaysInsertCount"),todayInsertCount:sessionStorage.getItem("todayInsertCount"),readDataCenter:sessionStorage.getItem("readDataCenter"),loading:!1,finished:!1}},methods:{isPasswordChange(t){this.isPassword=t},dataCenterClick(){return"true"==this.readDataCenter?(this.$router.push("/dataCenter"),!1):void this.$toast("您当前的角色暂时无法进入，请联系管理员进行角色升级！")},tables(t){this.toHospitalNum=t},myNoonTip(){const t=this,e=new Date,a=e.getHours();t.noonTip=a>=0&&a<12?"上午好":12===a?"中午好":a>12&&a<18?"下午好":"晚上好"},setNowTimes(){let t=new Date,e=t.getDay(),a=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],o=a[e];this.week=o},getCustomer(){n().then((t=>{if(0==t.code){const{myCustomerCount:e,sevenDaysInsertCount:a,todayInsertCount:o}=t.data.myCustomer;this.myCustomerCount=e,this.sevenDaysInsertCount=a,this.todayInsertCount=o,sessionStorage.setItem("myCustomerCount",e),sessionStorage.setItem("sevenDaysInsertCount",a),sessionStorage.setItem("todayInsertCount",o)}}))},recordingClick(){this.$router.push("/recording")}},created(){this.myNoonTip(),this.setNowTimes(),sessionStorage.getItem("myCustomerCount")||(this.isLoading=!0,this.getCustomer(),this.$toast.loading({message:"数据正在努力加载中，请耐心等待",duration:3e3,position:"center"}),setTimeout((()=>{this.isLoading=!1}),3e3))}},C=v,h=(a(4453),(0,u.Z)(C,o,s,!1,null,"4472a515",null)),g=h.exports},4310:function(t,e,a){"use strict";a.r(e);var o=a(8081),s=a.n(o),i=a(3645),n=a.n(i),r=n()(s());r.push([t.id,"[data-v-bf534c44] .van-list{min-height:300px;overflow:hidden}.list_wrap .item[data-v-bf534c44]{width:92%;padding:10px 20px;background:#e9f3ff;border-radius:10px;margin:10px auto 0;color:#565151}.list_wrap .item .item_center[data-v-bf534c44],.list_wrap .item .item_top[data-v-bf534c44]{display:flex;justify-content:space-between;font-size:14px;margin:10px 0}",""]),e["default"]=r},6701:function(t,e,a){"use strict";a.r(e);var o=a(8081),s=a.n(o),i=a(3645),n=a.n(i),r=a(1667),A=a.n(r),c=new URL(a(9840),a.b),d=n()(s()),l=A()(c);d.push([t.id,".container2[data-v-4472a515]{width:100%;height:100%;position:relative;background:linear-gradient(#5492fe,#fff);overflow-y:hidden}.container2 .mc[data-v-4472a515]{width:100%;height:100vh;position:fixed;top:0;left:0;background:#000;opacity:.3;z-index:999}.container2 .date_con[data-v-4472a515]{padding:7% 0 0 10%;box-sizing:border-box;color:#fff}.container2 .date_con .date[data-v-4472a515]{font-size:12px}.container2 .title[data-v-4472a515]{font-size:16px;margin-bottom:5px}.container2 .data[data-v-4472a515]{font-size:14px}.container2 .data_content[data-v-4472a515]{width:88%;height:75px;background-image:url("+l+");background-size:100% 100%;border-radius:10px/10px;margin:15px auto 0;padding:0 5%;color:#5492fe}.container2 .data_content[data-v-4472a515],.container2 .data_content .customer[data-v-4472a515]{display:flex;justify-content:space-between;align-items:center;box-sizing:border-box}.container2 .data_content .customer[data-v-4472a515]{flex-direction:column;font-size:13px;padding:0 10px}.container2 .data_content .customer_num[data-v-4472a515]{margin-top:5px}.container2 .report_content[data-v-4472a515]{margin-top:20px}.container2 .report_content .report_list[data-v-4472a515]{display:flex;justify-content:space-between;color:#fff;padding:0 10px;box-sizing:border-box}.container2 .report_content .report_list .report_item[data-v-4472a515]{width:80px;height:80px;background:linear-gradient(#8ab4fe,#5492fe);display:flex;flex-direction:column;margin:5px 0;border-radius:10px;align-items:center;justify-content:center}.container2 .report_content .report_list .report_item .report_icons1[data-v-4472a515]{font-size:22px;margin-bottom:5px}.container2 .report_content .report_list .report_item .report_icons[data-v-4472a515]{font-size:24px;margin-bottom:5px}.container2 .report_content .report_list .report_item .report_icons2[data-v-4472a515]{font-size:26px;margin-bottom:5px}.container2 .report_content .report_list .report_item .report_title[data-v-4472a515]{font-size:12px}.container2 .order_content[data-v-4472a515]{margin-top:15px;display:flex;justify-content:space-between;padding:0 15px}.container2 .order_content .today_order[data-v-4472a515]{color:#000}.container2 .order_content .all_order[data-v-4472a515]{color:#797777;font-size:13px}.container2 .bottom_table[data-v-4472a515]{margin:20px 0 0;height:45%;overflow:scroll}",""]),e["default"]=d},4606:function(t,e,a){var o=a(4310);o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.id,o,""]]),o.locals&&(t.exports=o.locals);var s=a(4402).Z;s("e3339e6a",o,!0,{sourceMap:!1,shadowMode:!1})},4453:function(t,e,a){var o=a(6701);o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.id,o,""]]),o.locals&&(t.exports=o.locals);var s=a(4402).Z;s("37993b50",o,!0,{sourceMap:!1,shadowMode:!1})},9840:function(t){"use strict";t.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=615.8d6732c5.js.map
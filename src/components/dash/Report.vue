<template>
    <!-- Main content -->
  <section class="content">
    <div class="row center-block">
    	<div class="box box-widget widget-user" style="width: 960px; margin-left: 15px;">
    		<div class="box-body"> 
    			<div class="widget-user-header text-center" style="height: 80px;">
            <h3 class="widget-user-username center-text">区块链测试结果报告</h3>
          </div>
            <form class="form-horizontal" role="form">
              <div class="form-group">
                <label for="labels" style="margin-left:35px;font-size: 15px ">测试合约号:&nbsp;&nbsp;</label><u style="font-size: 12px">{{chaincodeId}}</u>
              </div>
            </form>
            <form class="form-horizontal" role="form">
            	<div class="form-group">
            		<label for="labels" style="margin-left:35px;font-size: 15px ">测试分析时段:&nbsp;&nbsp;</label><u style="font-size: 15px">{{startTime}}</u><font size="1px">&nbsp;到&nbsp;</font><u style="font-size: 15px">{{endTime}}</u>
            	</div>
            </form>
            <form class="form-horizontal" role="form">
            	<div class="form-group">
	            	<div class="col-sm-4"><label for="labels" style="margin-left: 20px;font-size: 15px ">总交易数目:&nbsp;&nbsp;</label><u style="font-size: 15px">{{totalAmount}}</u>笔</div>
	            	<div class="col-sm-4"><label for="labels" style="font-size: 15px ">平均交易确认时长:&nbsp;&nbsp;</label><u style="font-size: 15px">{{avarageInvokeTime}}</u>/毫秒</div>
	            	<div class="col-sm-4"><label for="labels" style="font-size: 15px ">失败交易数量:&nbsp;&nbsp;</label><u style="font-size: 15px">0</u>笔</div>
            	</div>
            </form>
            <form class="form-horizontal" role="form">
            	<div class="form-group">
	            	<div class="col-sm-4"><label for="labels" style="margin-left: 20px;font-size: 15px ">最大交易确认时长:&nbsp;&nbsp;</label><u style="font-size: 15px">{{maxInvokeTime}}</u>/毫秒</div>
	            	<div class="col-sm-4"><label for="labels" style="font-size: 15px ">最小交易确认时长:&nbsp;&nbsp;</label><u style="font-size: 15px">{{minInvokeTime}}</u>/毫秒</div>
            	</div>
            </form>
            <br>
            <br>
            <div id="chart1" style="padding-left:0px" v-show="true">
              <div id="main"  :style="{width:'800px',height:'200px'}"></div>
            </div>
            <br>
            <div id="chart2" style="padding-left:0px" v-show="true">
              <div id="delayChart"  :style="{width:'800px',height:'200px'}"></div>
            </div>

          </div>

        </div>
    	
    </div>
  </section>
</template>

<script>
require('moment')
import datepicker from 'vuejs-datepicker'
import echarts from 'echarts'
export default {
  components: { datepicker },
  data() {
    return {
    	response: {},
      chaincodeId: "",
      maxInvokeTime: 0,
      minInvokeTime: 0,
      totalAmount: 0,
      avarageInvokeTime: 0,
      startTime: 0,
      endTime: 0,
      chart: null,
      disabled: false,
      visualization: false,
      buttonText: "查询",
      barData: [],
      labels: [],
      delay: []  
    }
  },
  mounted (){
  	var self = this
  	self.response = self.$store.getters.getResponse
  	var response = self.response
  	console.log(self.response)
  	self.barData = response.data
    console.log(self.barData)
    self.labels = response.labels
    console.log(self.labels)
    self.delay = response.delay
    self.visualization = true
    self.chaincodeId = response.chaincodeId
    self.maxInvokeTime = response.maxInvokeTime
    self.minInvokeTime = response.minInvokeTime
    self.totalAmount = response.totalAmount
    self.avarageInvokeTime = response.avarageInvokeTime
    self.startTime = response.startTime
    self.endTime = response.endTime
  	self.showChart()
  },

  methods: {
    showChart: function () {

      var myChart = echarts.init(document.getElementById('delayChart'))
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      canvas.width = canvas.height = 0
      myChart.setOption({
        title: {
            text: '交易时长(毫秒)'
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : this.labels,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:this.delay
            }
        ]
    })
      /*{
        title: {
            text: '交易时间'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['交易时间']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: this.labels,
            interval: 0,
            axisTick: {
              alignWithLabel: true
            },
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'交易时间',
                type:'line',
                step: 'start',
                data: this.delay
            }
        ]
      }*/



      var myChart = echarts.init(document.getElementById('main'))
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      canvas.width = canvas.height = 50
      myChart.setOption({
        title: {
            text: '平均交易时间(毫秒)'
        },
        color: ['#3300DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : this.labels,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:this.barData
            }
        ]
    })  
    },
    
    startSearching: function () {
      var self = this
      var t1 = self.startTime.getTime() + self.startHour * 3600000 + self.startMin * 60000 + self.startSecond * 1000 + self.startMilli
      var t2 = self.endTime.getTime() + self.endMin * 60000 + self.endSecond * 1000 + self.endMilli
      self.buttonText = "正在查询中"
      self.disabled = "true"
      // self.visualization = true
      console.log(this.startTime)
      console.log(this.startTime.getTime())
      if (self.startTime.getTime() > self.endTime.getTime()) {
        alert('请重新选择查询时间')
      } else {
        var options = {
          "testUrl" : self.testUrl,
          "startTime" : t1 ,
          "endTime": t2 
        }
        var jsonData = JSON.stringify(options)
        console.log("jsonData:"+jsonData)
        self.$http.post('http://localhost:1112/getData', jsonData).then(
          function(response) {
            self.buttonText = "查询"
            self.disabled = false
            var data = eval(response.data)
            var barData = data.data
            var labels = data.labels
            var delay = data.delay
            console.log(data)
            if (barData !== "null") {
              self.$store.commit('LOAD_RESPONSE', data)
              self.$router.push({path: '/report'})
              /*self.barData = barData
              console.log(self.barData)
              self.labels = labels
              console.log(labels)
              self.delay = delay
              self.visualization = true
              self.showChart()*/
            }
          })
      }
    }
  }
}
</script>

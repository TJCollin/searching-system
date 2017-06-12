<template>
    <!-- Main content -->
  <section class="content">
    <div class="row center-block">

        <div class="box box-widget widget-user" style="width: 920px; margin-left: 15px;">
          <div class="widget-user-header bg-aqua-active text-center" style="height: 80px;">
            <h3 class="widget-user-username center-text">测试过程实时监控</h3>
          </div>
          <div class="row" style="padding-top: 20px">
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="info-box">
                  <span class="info-box-icon bg-aqua"><i class="ion"></i></span>

                  <div class="info-box-content">
                    <span class="info-box-text">测试时长(毫秒)</span>
                    <span class="info-box-number">{{testTime}}</span>
                  </div>
                  <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
              </div>
              <!-- /.col -->
              <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="info-box">
                  <span class="info-box-icon bg-red"><i class="fa"></i></span>

                  <div class="info-box-content">
                    <span class="info-box-text">总交易量</span>
                    <span class="info-box-number">{{totalAmount}}</span>
                  </div>
                  <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
              </div>
              <!-- /.col -->

              <!-- fix for small devices only -->
              <div class="clearfix visible-sm-block"></div>

              <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="info-box">
                  <span class="info-box-icon bg-green"><i class="ion"></i></span>

                  <div class="info-box-content">
                    <span class="info-box-text">平均应答时间</span>
                    <span class="info-box-number">{{averageInvokeTime}}</span>
                  </div>
                  <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
              </div>
              <!-- /.col -->
              <!-- <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="info-box">
                  <span class="info-box-icon bg-yellow"><i class="ion"></i></span>

                  <div class="info-box-content">
                    <span class="info-box-text">失败交易笔数</span>
                    <span class="info-box-number">0</span>
                  </div>
                  <!-- /.info-box-content -->
                </div>
                <!-- /.info-box -->
              </div> 
          </div>

          <div class="box-body"> 
            
            <div id="charts" style="padding-left:0px" v-show="true">
              <div id="main"  :style="{width:'800px',height:'300px'}"></div>
            </div>
          </div>
          
          <!-- /.box-header -->
          
          <!-- /.box-body -->
        <!-- /.box -->
      </div>
    </div>
      <!-- /.modal -->
  </section>
    <!-- 模态框（Modal） -->
</template>
<script>
require('moment')
import echarts from 'echarts'
export default {
  data() {
    return {
      chart: null,
      testTime: 0,
      averageInvokeTime: 0,
      totalAmount: 0,
      disabled: false,
      visualization: false,
      testUrl: "",
      startTime: new Date(),
      endTime: new Date(),
      buttonText: "查询",
      barData: [],
      labels: []  
    }
  },
  mounted (){
    this.showChart()
    this.startSearching()
  },

  methods: {
    showChart: function () {
      var yMax = 15;
      var dataShadow = [];

      for (var i = 0; i < 10; i++) {
          dataShadow.push(yMax);
      }

      var myChart = echarts.init(document.getElementById('main'))
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
        animation: true ,
        series : [
             { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                data: dataShadow,
                animation: false
            },
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:this.barData
            }
        ]
    })/*{
        title: {
            text: '交易负载监控'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['交易量']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
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
                name:'交易量',
                type:'line',
                step: 'start',
                data: this.barData
            }
        ]
      }*/
    },
    
    startSearching: function () {
      var socket = new WebSocket('ws://localhost:8086/');
      var self = this
      socket.onopen = function() {
          /*socket.send('login:' + 
             localStorage.getItem('deviceId') +  ':' +
              localStorage.getItem('userSecret'));*/

          socket.onmessage = function(response) {
            var data = eval("("+response.data+")")
            var barData = data.barData
            var labels = data.labels
            self.barData = barData
            console.log(self.barData)
            self.labels = labels
            console.log(labels)
            self.averageInvokeTime = data.averageInvokeTime
            self.totalAmount = data.totalAmount
            self.testTime = data.testTime
            self.visualization = true
            self.showChart()

              console.log(data); // upon message
          }

      }
      /*if (self.startTime.getTime() > self.endTime.getTime()) {
        alert('请重新选择查询时间')
      } else {
        var options = {
          "testUrl" : self.testUrl,
          "startTime" : self.startTime.getTime(),
          "endTime": self.endTime.getTime()
        }
        var jsonData = JSON.stringify(options)
        self.$http.post('http://localhost:1112/getData', jsonData).then(
          function(response) {
            self.buttonText = "查询"
            self.disabled = false
            var data = eval(response.data)
            var barData = data.data
            var labels = data.labels
            console.log(data)
            if (barData !== "null") {
              self.barData = barData
              console.log(self.barData)
              self.labels = labels
              console.log(labels)
              self.visualization = true
              self.showChart()
            }
          })
      }*/
    }
  }
}
</script>
<style>
.content {
  padding-left: 2em;
  padding-top: 3em;
  padding-right: 4em;
}

#main {  
    /*需要制定具体高度，以px为单位*/  
    height: 400px;  
} 
</style>
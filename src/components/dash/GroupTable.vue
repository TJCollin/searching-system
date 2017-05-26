<template>
    <!-- Main content -->
  <section class="content">
    <div class="row center-block">
        <div class="box box-widget widget-user" style="width: 920px; margin-left: 15px;">
          <div class="widget-user-header bg-aqua-active text-center" style="height: 80px;">
            <h3 class="widget-user-username center-text">区块链测试报告查询</h3>
          </div>

          <div class="box-body"> 
            <form class="form-horizontal" role="form">
              <div class="form-group">
                <label for="chaincodeUrl" class="col-sm-3 control-label" >请输入测试合约号</label>
                <div class="col-sm-9">
                  <input type="text"  class="form-control" id="testUrl" v-model="testUrl"/>
                </div>
              </div>
              <div class="form-group">
                  <label for="testFrq" class="col-sm-3 control-label">请输入查询开始时间</label>
                  <div class="input-group" style="padding-left:14px;">
                    <span class="input-group-addon">
                      <i class="fa fa-fw fa-calendar"></i>
                    </span>
                    <datepicker :readonly="true" format="yyyy/MM/dd" id="startDateInput" v-model ="startTime"></datepicker>
                  </div>
              </div>
              <div class="form-group" style="padding-left:250px">
                <input type="number" id="startHour" v-model="startHour" style="width:60px">时
                <input type="number" id="startMin" v-model="startMin" style="width:60px">分
                <input type="number" id="startSecond" v-model="startSecond" style="width:60px">秒
                <input type="number" id="startMilli" v-model="startMilli" style="width:60px">毫秒
              </div>
              <div class="form-group">
                  <label for="testFrq" class="col-sm-3 control-label">请输入查询结束时间</label>
                  <div class="input-group" style="padding-left:14px">
                    <span class="input-group-addon">
                      <i class="fa fa-fw fa-calendar"></i>
                    </span>
                    <datepicker :readonly="true" format="yyyy/MM/dd" id="endDateInput" v-model="endTime"></datepicker>
                  </div>
                  <!-- <input type="number" id="startSecond">    -->
              </div>
              <div class="form-group" style="padding-left:250px">
                <input type="number" id="endHour" v-model="endHour" style="width:60px">时
                <input type="number" id="endMin" v-model="endMin" style="width:60px">分
                <input type="number" id="endSecond" v-model="endSecond" style="width:60px">秒
                <input type="number" id="endMilli" v-model="endMilli" style="width:60px">毫秒
              </div>
            </form>
            <div align="center">
              <button class="btn btn-primary" :disabled="disabled" @click="startSearching">
                  {{buttonText}}
                </button>
            </div>

            <!-- <div align="center">
              <button class="btn btn-primary" :disabled="disabled" @click="startSearching">
                  {{buttonText}}
                </button>
            </div> -->
            <!-- <div id="chart1" style="padding-left:0px" v-show="true">
              <div id="main"  :style="{width:'800px',height:'200px'}"></div>
            </div>
            <br>
            <div id="chart2" style="padding-left:0px" v-show="true">
              <div id="delayChart"  :style="{width:'800px',height:'200px'}"></div>
            </div> -->

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
import datepicker from 'vuejs-datepicker'
import echarts from 'echarts'
export default {
  components: { datepicker },
  data() {
    return {
      startHour: 0,
      endHour: 0,
      startMin: 0,
      endMin: 0,
      startSecond: 0,
      endSecond: 0,
      startMilli: 0,
      endMilli: 0,
      chart: null,
      disabled: false,
      visualization: false,
      testUrl: "",
      startTime: new Date(),
      endTime: new Date(),
      buttonText: "查询",
      barData: [],
      labels: [],
      delay: []  
    }
  },
  /*mounted (){
    this.showChart()
  },*/

  methods: {
    showChart: function () {

      var myChart = echarts.init(document.getElementById('delayChart'))
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      canvas.width = canvas.height = 0
      myChart.setOption({
        title: {
            text: 'Invoke Delay'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['Invoke Delay']
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
                name:'Invoke Delay',
                type:'line',
                step: 'start',
                data: this.delay
            }/*,{
                name:'Invoke Delay',
                type:'line',
                step: 'start',
                data:this.delay
            }*/
        ]
      })



      var myChart = echarts.init(document.getElementById('main'))
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      canvas.width = canvas.height = 50
      myChart.setOption({
        title: {
            text: 'Invoke Amout'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['Invoke Amout']
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
                name:'Invoke Amout',
                type:'line',
                step: 'start',
                data: this.barData
            }
        ]
      })  
    },

    /*startSearching: function () {
      var self = this
      var t1 = self.startTime.getTime() + self.startHour * 3600000 + self.startMin * 60000 + self.startSecond * 1000 + self.startMilli
      var t2 = self.endTime.getTime() + self.endMin * 60000 + self.endSecond * 1000 + self.endMilli
      self.$store.commit('LOAD_CCID', self.testUrl)
      self.$store.commit('LOAD_STARTTIME', t1)
      self.$store.commit('LOAD_ENDTIME', t2)
      self.$router.push({path: '/report'})
    }*/
    
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
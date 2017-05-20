<template>
    <!-- Main content -->
  <section class="content">
    <div class="row center-block">
        <div class="box box-widget widget-user" style="width: 920px; margin-left: 15px;">
          <div class="widget-user-header bg-aqua-active text-center" style="height: 80px;">
            <h3 class="widget-user-username center-text">区块链测试结果查询</h3>
          </div>

          <div class="box-body"> 
            <form class="form-horizontal" role="form">
              <div class="form-group">
                 <label for="chaincodeUrl" class="col-sm-3 control-label" >请输入查询地址</label>
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
              <div class="form-group">
                 <label for="testFrq" class="col-sm-3 control-label">请输入查询结束时间</label>
                  <div class="input-group" style="padding-left:14px">
                    <span class="input-group-addon">
                      <i class="fa fa-fw fa-calendar"></i>
                    </span>
                    <datepicker :readonly="true" format="yyyy/MM/dd" id="endDateInput" v-model="endTime"></datepicker>

                  </div>   
              </div>
            </form>
            <div align="center">
              <button class="btn btn-primary" :disabled="disabled" @click="startSearching">
                  {{buttonText}}
                </button>
            </div>
            <br>
            <br>
            <div id="charts" style="padding-left:0px" v-show="true">
              <div id="main"  :style="{width:'800px',height:'400px'}"></div>
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
import datepicker from 'vuejs-datepicker'
import echarts from 'echarts'
export default {
  components: { datepicker },
  data() {
    return {
      chart: null,
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
  },

  methods: {
    showChart: function () {

      var myChart = echarts.init(document.getElementById('main'))
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      canvas.width = canvas.height = 100
      myChart.setOption({
        title: {
            text: 'Invoke Amouts'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['Invoke Amouts']
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
                name:'Invoke Amouts',
                type:'line',
                step: 'start',
                data: this.barData
            }
        ]
      })  
    },
    
    startSearching: function () {
      var self = this
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
          "startTime" : self.startTime.getTime(),
          "endTime": self.endTime.getTime()
        }
        var jsonData = JSON.stringify(options)
        self.$http.post('http://localhost:1112/getData', jsonData).then(
          function(response) {
            self.buttonText = "查询"
            self.disabled = false
            /******to be continued********/
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
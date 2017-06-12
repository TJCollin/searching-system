<template>
    <!-- Main content -->
  <section class="content">

    <div class="row center-block">

      <div class="callout callout-info">
        <h4 class="text-center">异步分析服务</h4>
      </div>
      <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <div class="panel panel-info">
          <div class="panel-heading" role="tab" id="headingOne">
            <h4 class="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
                历史报表查询
              </a>
            </h4>
          </div>
          <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">
              <div class="box-body">
                <form class="form-inline"> 
                  <div class="box-body" v-show="visualization">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>历史报表</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="even" role="row" v-for="item in items">
                          <td>{{ item.time }}</td>
                          <td>
                            <button class="btn btn-primary"  data-toggle="modal" data-target="#modal" @click="getItem(item)">查询</button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colspan="1" rowspan="1">历史报表</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </form>
                <br>
                <label for="chaincodeUrl" class="col-sm-3 control-label" >请输入查询合约号</label>
                      <div class="col-sm-9">
                        <input type="text"  class="form-control" id="chaincodeUrl" v-model="contractID"/>
                      </div>
                <button class="btn btn-primary" @click="search">确定</button>
              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-success">
          <div class="panel-heading" role="tab" id="headingTwo">
            <h4 class="panel-title">
              <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                新建分析报表
              </a>
            </h4>
          </div>
          <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div class="box-body">
              <div class="box-body">
                  <form class="form-horizontal" role="form">
                    <div class="form-group">
                      <label for="chaincodeUrl" class="col-sm-3 control-label" >请输入测试合约号</label>
                      <div class="col-sm-9">
                        <input type="text"  class="form-control" id="chaincodeUrl" v-model="contractID"/>
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
                    <button class="btn btn-primary" :disabled="disabled" @click="create">
                        {{buttonText}}
                      </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.modal -->
  </section>
    <!-- 模态框（Modal） -->
</template>
<script>

import datepicker from 'vuejs-datepicker'
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
      startTime: new Date(),
      endTime: new Date(),
      buttonText: "确定",
      disabled: false,
      contractID: "",
      visualization: false,
      items:[]
      }
  },
  
  methods: {
    search: function () {
      var self = this
      var options = {
        "contractID": self.contractID
      }
      var jsonData = JSON.stringify(options)
      self.$http.post('http://localhost:1112/getHistory', jsonData).then(
        function(response) {
          /******to be continued********/
          var data = eval(response.data)
          if (data.status == "ok") {
            self.items = data.data
          }
          // console.log(data)
          // self.query()
        })

      self.visualization = true 

    },
    getItem: function (item) {
      var self = this
      var options = {
        "totalAmount": item.totalAmount,
        "chaincodeId": item.chaincodeId,
        "startTime": item.startTime,
        "endTime": item.endTime,
        "maxCheckTime": item.maxcheckTime,
        "minCheckTime": item.minCheckTime,
        "minReplyTime": item.minReplyTime,
        "maxReplyTime": item.maxreplyTime,
        "avCheckTime": item.avCheckTime,
        "avReplyTime": item.avReplyTime,
        "data": item.data,
        "labels": item.labels,
        "reply": item.reply,
        "check": item.check
      }
      // var options = JSON.stringify(item)

      // var jsonData = JSON.stringify(options)
      // console.log(JSON.stringify(options))
      self.$store.commit('LOAD_RESPONSE', JSON.stringify(options))
      self.$router.push({path: '/reportDB'})
    },
    create: function () {
      var self = this
      console.log("start:"+self.startTime.getTime())
      var t1 = self.startTime.getTime() + self.startHour * 3600000 + self.startMin * 60000 + self.startSecond * 1000 + self.startMilli - self.startTime.getHours() * 3600000 - self.startTime.getMinutes() * 60000 -self.startTime.getSeconds() * 1000
      var t2 = self.endTime.getTime() + self.endHour * 3600000 + self.endMin * 60000 + self.endSecond * 1000 + self.endMilli - self.endTime.getHours() * 3600000 - self.endTime.getMinutes() * 60000 -self.endTime.getSeconds() * 1000
      self.buttonText = "正在查询中"
      self.disabled = "true"
      // self.visualization = true
      console.log(t1)
      console.log(t2)
      if (self.startTime.getTime() > self.endTime.getTime()) {
        alert('请重新选择查询时间')
      } else {
        var options = {
          "contractID" : self.contractID,
          "startTime" : t1 ,
          "endTime": t2 
        }
        var jsonData = JSON.stringify(options)
        console.log("jsonData:"+jsonData)
        self.$http.post('http://localhost:1113/analyser/query', jsonData).then(
          function(response) {
            self.buttonText = "查询"
            self.disabled = false
            var data = eval(response.data)
            console.log(data)
            if (data.status == "ok") {
              self.$store.commit('LOAD_RESPONSE', data)
              self.$router.push({path: '/report'})
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
</style>
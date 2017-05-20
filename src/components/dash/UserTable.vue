<template>
    <!-- Main content -->
  <section class="content">

    <div class="row center-block">

      <div class="callout callout-info">
        <h4 class="text-center">区块链操作示例</h4>
      </div>
      <div class='col-md-6 col-sm-6 col-xs-12'>
        <div class='info-box'>
          <span class='info-box-icon bg-yellow'><i class='ion ion-ios-people-outline'></i></span>

          <div class='info-box-content'>
            <span class='info-box-text'>A余额</span>
            <span class='info-box-number'>{{ banlance[0].A }}</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </div>
      <div class="row center-block">
        <div class='col-md-6 col-sm-6 col-xs-12'>
          <div class='info-box'>
            <span class='info-box-icon bg-yellow'><i class='ion ion-ios-people-outline'></i></span>

            <div class='info-box-content'>
              <span class='info-box-text'>B余额</span>
              <span class='info-box-number'>{{ banlance[1].B }}</span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
      </div>

      <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <div class="panel panel-info">
          <div class="panel-heading" role="tab" id="headingOne">
            <h4 class="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
                初始化余额
              </a>
            </h4>
          </div>
          <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">
              <div class="box-body">
                <form class="form-inline"> 
                  <div class="form-group">
                    <label>初始化A余额：</label>
                    <input type="text" class="form-control" v-model="initA" placeholder="A余额">
                    <br>
                    <br>

                    <label>初始化B余额：</label>
                    <input type="text" class="form-control" v-model="initB" placeholder="B余额"><label></label>
                  </div>
                </form>
                <br>
                <button class="btn btn-primary" @click="init">初始化</button>
              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-success">
          <div class="panel-heading" role="tab" id="headingTwo">
            <h4 class="panel-title">
              <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                交易操作
              </a>
            </h4>
          </div>
          <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div class="box-body">
              <div class="box-body">
                <form class="form-inline"> 
                  <div class="form-group">
                    <label>交易发起者：</label>
                    <input type="radio" id="one" value="a" v-model="invoker">
                    <label for="one">A</label>
                    <input type="radio" id="two" value="b" v-model="invoker" style="margin-left:20px;">
                    <label for="two">B</label>
                    <br>
                    <br>
                    <label>交易金额:</label>
                    <input type="text" class="form-control" v-model="amount" placeholder="交易金额"><label></label>
                  </div>
                </form>
                <br>
                <button class="btn btn-primary" @click="invoke">确定</button>
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
export default {
  data() {
    return {
      initA: "",
      initB: "",
      invoker: "",
      amount: ""
      }
  },

  created: function() {
    var self = this
    var banlance = [
      {"A": "暂无"},
      {"B": "暂无"}
      ]
    console.log("created")
    self.$store.dispatch("loadBanlance", banlance)
  },

  computed: {
    banlance () {
      var self = this
      return self.$store.getters.getBanlance
    }
  },
  
  methods: {
    /*payLoad: function (method, chaincodeID, args, id){
      var payLoad = {
        "jsonrpc": "2.0",
        "method": method,
        "params": {
          "type": 1,
          "chaincodeID": chaincodeID,
          "ctorMsg": {
            "function": method,
            "args": args
          },
          "secureContext": "jim"
        },
        "id": id
      }
      var jsonData = JSON.stringify(payLoad)
      return jsonData
    },*/

    init: function(){
      var self = this
      var valA = self.initA
      var valB = self.initB
      var valC = "300"
      var valD = "400"
      var valE = "500"
      // var banlance = ""
      console.log("initA:"+valA+"; "+"initB:"+valB)
      var options = {
        "valA": valA,
        "valB": valB,
        "valC": valC,
        "valD": valD,
        "valE": valE
      }
      var jsonData = JSON.stringify(options)
      self.$http.post('http://localhost:1111/chaincode/init', jsonData).then(
        function(response) {
          /******to be continued********/
          var data = eval(response.data)
          console.log(data)
          self.query()
        })
    },

    query: function () {
     /* var self = this
      var callId = id
      var tick = self.$store.getters.getTick
      var chaincodeID = self.$store.getters.getCCID
      var queryData = self.payLoad("query", {"name":chaincodeID}, [id], 5)*/
      var self = this
      self.$http.post('http://localhost:1111/chaincode/query').then(
        function(response) {
          var data = eval(response.data)
          console.log("queryData:")
          console.log(data[1])
          var banlance = [
          {"A": data[0]},
          {"B": data[1]}
          ]
          self.$store.dispatch("loadBanlance", banlance)
          return data
          /*if (data.error) {
            console.log("error")
            tick--;
            console.log(tick)
            self.$store.dispatch("loadTick", tick)
            if(tick > 0){
              self.query(callId)
            }else {
              return Promise.resolve("数值出错")
              var banlance = [
                        {"A": "无法查询"},
                        {"B": "无法查询"}]
              console.log(banlance)
              self.$store.dispatch("loadBanlance", banlance)
              self.$store.dispatch("loadTick", 1000)
            }
          } else {
            var val = data.result.message
            console.log(val)
            self.$store.dispatch("loadTick", 1000)
            return Promise.resolve(val)
          }*/
        })
    },

    invoke: function () {
      var self = this
      var invokeA = ""
      var invokeB = ""
      var amount = self.amount
      console.log(self.invoker)
      if(self.invoker == "a") {
        invokeA = "a"
        invokeB = "b"
      }else {
        invokeA = "b"
        invokeB = "a"
      }
      var options = {
        "invokeA" : invokeA,
        "invokeB" : invokeB,
        "amount" : amount
      }
      var jsonData = JSON.stringify(options)
      console.log(jsonData)
      this.$http.post('http://localhost:1111/chaincode/invoke', jsonData).then(
        function (response) {
          var data = eval(response.data)
          console.log(data)
          setTimeout(function(){
            self.query()
          },2000)
          // self.query()
        })
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
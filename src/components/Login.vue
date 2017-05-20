<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo_blk.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- errors -->
            <div v-if=response class="text-red"><p>{{response}}</p></div>

            <!-- login form -->
            <form class="ui form loginForm" @submit.prevent="checkCreds">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="userid" placeholder="工号" type="number" v-model="userId">
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
              </div>
              <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Submit</button>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
module.exports = {
  name: 'Login',
  data: function (router) {
    return {
      section: 'Login',
      loading: '',
      userId: '',
      password: '',
      response: ''
    }
  },
  methods: {
    checkCreds: function () {
      //  Change submit button
      var self = this
      var store = self.$store
      //  Load items
      store.commit('CLEAN_ITEMS')
      var options = {
        "userId": self.userId,
        "userPw": self.password
      }
      console.log(self.userId)
      var jsonData = JSON.stringify(options)
      self.toggleLoading()
      self.resetResponse()
      store.commit('TOGGLE_LOADING')
      console.log("toggleLoading")
        //  Login
      console.log(jsonData)
      self.$http.post('http://localhost:1111/list/login', jsonData).then(
        function (response) {
          // store.commit('TOGGLE_LOADING')
          // console.log("response")
          var data = eval(response.data)
          if (response.data) {
            if (data.success) {
              var jj = JSON.stringify(data.msg.jsondata)
              console.log("loginSuccess")
              self.$router.push('/dash')
            } else {
              console.log("failure")
            }
          } else {
            self.response = 'Did not receive a response. Please try again in a few minutes'
          }
          self.toggleLoading()
      }, 
      function (response) {
        // error
        // store.commit('TOGGLE_LOADING')
        console.log('Error', response)
        self.response = 'Server appears to be offline'
        self.toggleLoading()
        })
    },
    toggleLoading: function () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse: function () {
      this.response = ''
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>

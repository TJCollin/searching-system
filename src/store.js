import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  CCID: '',
  response: {},
  endTime: '',
}

const getters = {
  getCCID: state => {
    return state.CCID
  },
  getResponse: state => {
    return state.response
  },
  getEndTime: state => {
    return state.endTime
  },
}
const mutations = {
  LOAD_CCID (state, id) {
    state.CCID = id
  },
  LOAD_RESPONSE (state, response) {
    state.response = response
  },
  LOAD_ENDTIME (state, endTime) {
    state.endTime = endTime
  }
}

const actions = {
  loadCCID ({commit}, id) {
    commit('LOAD_CCID', id)
  },
  loadStartTime ({ commit }, response) {
    commit('LOAD_STARTTIME', response)
  },
  loadEndTime ({ commit }, endTime){
    commit('LOAD_ENDTIME', endTime)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
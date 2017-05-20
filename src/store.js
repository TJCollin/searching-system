import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  CCID: '',
  tick: 1000,
  banlance: []
}

const getters = {
  getCCID: state => {
    return state.CCID
  },
  getBanlance: state => {
    return state.banlance
  },
  getTick: state => {
    return state.tick
  }
}
const mutations = {
  LOAD_CCID (state, id) {
    state.CCID = id
  },
  LOAD_TICK (state, tick) {
    state.tick = tick
  },
  LOAD_BANLANCE (state, banlance) {
    state.banlance = banlance
  }
}

const actions = {
  loadCCID ({commit}, id) {
    commit('LOAD_CCID', id)
  },
  loadBanlance ({ commit }, banlance) {
    commit('LOAD_BANLANCE', banlance)
  },
  loadTick ({ commit }, tick){
    commit('LOAD_TICK', tick)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
import Vue from 'vue'
import Vuex from 'vuex'

import * as API from './api/gank'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
    detail: {},
    loading: false,
  },
  mutations: {
    UPDATE_HISTORY: (state, data) => {
      state.history = data
    },
    UPDATE_DETAIL: (state, {data, detail}) => {
      state.detail[data] = detail
    },
    UPDATE_LOADING: (state, data) => {
      state.loading = data
    }
  },
  actions: {
    fetchHistory({commit, state}, force) {
      if (state.history.length > 0 && !force) {
        return Promise.resolve(state.history)
      }
      return new Promise((resolve, reject) => {
        API.getList().then(res => {
          const history = res.results
          commit('UPDATE_HISTORY', history)
          resolve(history)
        }).catch(error => {
          reject(error)
        })
      })
    },
    fetchDetail({commit, state}, data) {
      if (state.detail[data]) {
        return Promise.resolve(state.detail[data])
      } else {
        return new Promise((resolve, reject) => {
          const [year, month, day] = data.split('-');
          API.getDay(year, month, day).then(res => {
            const detail = res.results
            commit('UPDATE_DETAIL', {data, detail})
            resolve(detail)
          }).catch(error => {
            reject(error)
          })
        })
      }
    },
    setLoading({commit}, data) {
      commit('UPDATE_LOADING', data)
    }
  },
  getters: {
    history: state => state.history,
  }
})

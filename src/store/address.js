import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';


export default {
  state: {
    address: []
  },
  getters: {
    address (state) {
      return state.address
    }
  },
  mutations: {
    SET_ADDRESS (state, data) {
      state.address = data
    }
  },
  actions: {
    async GET_ADDRESS({dispatch, commit}, data) {
      try {
        await axios({
          method: 'post',
          url: 'https://life30server.ru/air/get-address',
          data: { query: data }
        }).then((res)=>{
          let result = res.data
          if(result.code == "200") {
            commit('SET_ADDRESS', result.data.suggestions)
          }
          else {
            console.log('Ошибка загрузки')
          }
        })
      }
      catch (e) {
        console.log('Ошибка загрузки')
      }
    },
    async SEND_DATA ({dispatch, commit}, data) {
      console.log('Получили данные: ', data)
    }
  },

}





      







import { createStore } from 'vuex'

export default createStore({
  state: {
    calcData: {
      seiteA: null,
      seiteB: null,
      seiteC: null,
      winkelA: null,
      winkelB: null,
      winkelC: null,
    },
    triangleStatus: ""
  },
  mutations: {
    updateSeiteA (state, num) {
      if(num == null){
        state.calcData.seiteA = num;
      }else{
        state.calcData.seiteA = num.toFixed(2);
      }
    },
    updateSeiteB (state, num) {
      if(num == null){
        state.calcData.seiteB = num;
      }else{
        state.calcData.seiteB = num.toFixed(2);
      }
    },
    updateSeiteC (state, num) {
      if(num == null){
        state.calcData.seiteC = num;
      }else{
        state.calcData.seiteC = num.toFixed(2);
      }
    },
    updateWinkelA (state, num) {
      if(num == null){
        state.calcData.winkelA = num;
      }else{
        state.calcData.winkelA = num.toFixed(2);
      }
    },
    updateWinkelB (state, num) {
      if(num == null){
        state.calcData.winkelB = num;
      }else{
        state.calcData.winkelB = num.toFixed(2);
      }
    },
    updateWinkelC (state, num) {
      if(num == null){
        state.calcData.winkelC = num;
      }else{
        state.calcData.winkelC = num.toFixed(2);
      }
    },
    updateStatus (state, text) {
      if(text == null){
        state.triangleStatus = "";
      }else{
        state.triangleStatus = state.triangleStatus + text;
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
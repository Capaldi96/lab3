import Vue from 'vue'
import App from './App.vue'
// import list from './components/list.vue'
// import addSnippet from './components/addSnippet.vue'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

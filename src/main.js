import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import list from './components/list.vue'
// import addSnippet from './components/addSnippet.vue'
Vue.config.productionTip = false
Vue.use(VueAxios, axios);

new Vue({
  render: h => h(App),
}).$mount('#app')

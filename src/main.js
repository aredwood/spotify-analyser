import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import spotify from "@/lib/spotify.js"
Vue.config.productionTip = false
//TODO create logger
const plugin = {
  install:(Vue,options) => {
    Vue.prototype.spotify = spotify(options);
  }
}

Vue.use(plugin,{
  store
});



const instance = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');

window.instance = instance;


setInterval(() => {
  window.instance.$emit("tick")
},3000)
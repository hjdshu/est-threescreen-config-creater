import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import i18n from 'vue-i18n'
import router from './router'
import lang from './lang'
Vue.config.productionTip = false

const langString = localStorage.getItem('lang') || 'zh'

Vue.use(i18n)
Vue.use(VueRouter)
new Vue({
  router,
  i18n: new i18n({
    locale: langString,
    messages: lang
  }),
  render: h => h(App),
}).$mount('#app')

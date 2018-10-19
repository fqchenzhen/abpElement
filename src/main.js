// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store';
import App from './App'
import util from './libs/util'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/common.less'
import 'animate.css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { router } from './router/index';
import { appRouter } from './router/router';
import './libs/directives'
import AppConsts from 'static/appconst'
import './output'

util.ajax.get('/AbpUserConfiguration/GetAll').then(result => {
  Vue.use(ElementUI);
  Vue.config.productionTip = false

  // 拓展abp对象
  window.abp = $.extend(true, abp, result.data.result);

  Vue.prototype.L = function (text, ...args) {
    let localizedText = window.abp.localization.localize(text, AppConsts.localization.defaultLocalizationSourceName);
    if (!localizedText) {
      localizedText = text;
    }
    if (!args || !args.length) {
      return localizedText;
    }
    args.unshift(localizedText);
    return abp.utils.formatString.apply(this, args)
  }

  new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
      currentPageName: ''
    },
    mounted() {
      this.currentPageName = this.$route.name;
      // Display a list of open pages
      this.$store.commit('setOpenedList');
      this.$store.commit('initCachepage');

      //Filtering admin menu
      this.$store.commit('updateMenulist');
    },
    created() {
      let tagsList = [];
      appRouter.map((item) => {
        if (item.children.length <= 1) {
          tagsList.push(item.children[0]);
        } else {
          tagsList.push(...item.children);
        }
      });

      this.$store.commit('setTagsList', tagsList);
      abp.message.info = (message) => {
        this.$message(message);
      };

      abp.message.success = (message) => {
        this.$message({
          message: message,
          type: 'success'
        });
      };

      abp.message.warn = (message) => {
        this.$message({
          message: message,
          type: 'warning'
        });
      };

      abp.message.error = (message) => {
        this.$message.error(message);
      };

      // abp.message.confirm = (message, titleOrCallback, callback) => {
      //   var userOpts = {
      //     content: message
      //   };
      //   if ($.isFunction(titleOrCallback)) {
      //     callback = titleOrCallback;
      //   } else if (titleOrCallback) {
      //     userOpts.title = titleOrCallback;
      //   };
      //   userOpts.onOk = callback || function () { };
      //   this.$Modal.confirm(userOpts);
      // }

      abp.notify.success = (message, title, options) => {
        this.$notify({
          title: title,
          message: message,
          type: 'success'
        });
      };

      abp.notify.info = (message, title, options) => {
        this.$notify({
          title: title,
          message: message,
          type: 'warning'
        });
      };

      abp.notify.warn = (message, title, options) => {
        this.$notify.info({
          title: title,
          message: message
        });
      };

      abp.notify.error = (message, title, options) => {
        this.$notify.error({
          title: title,
          message: message
        });
      };
    }
  });
})
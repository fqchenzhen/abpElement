import Vue from 'vue'
//components
//dom操作才会用
//chart

// 注册一个全局自定义指令 v-image
Vue.directive('image', {
  // 当绑定元素插入到 DOM 中。
  bind: function (el, binding) {
    // 聚焦元素

    el.src = binding.value;
    if (typeof (binding.value) == "undefined") {
      el.src = "static/images/none.jpg"
    } else {
      el.onerror = function () {
        el.src = "static/images/none.jpg"
      }
    }
  },
  update: function (el, binding) {
    if (binding.value != binding.oldValue) {
      el.src = binding.value;
    }
  }
})

import vue from 'vue'
import dataTableNoPaging from './components/basicElement/dataTable/dataTableNoPaging.vue'
import dataTablePaging from './components/basicElement/dataTable/dataTablePaging.vue'
import dialogLayout from './components/basicElement/dialog/dialog.vue'
import cardLayout from './components/basicElement/layout/cardLayout.vue'

vue.component(dataTableNoPaging.name, dataTableNoPaging);
vue.component(dataTablePaging.name, dataTablePaging);
vue.component(dialogLayout.name, dialogLayout);
vue.component(cardLayout.name, cardLayout);


//dialog方法
vue.prototype.$dialog = {
  open(component, args) {
    return new Promise((resolve) => {

      let Dialog = vue.extend(component)

      var $vm = new Dialog({
        el: document.createElement('div')
      })

      var node = document.body.appendChild($vm.$el)

      $vm.open(args).then(result => {
        if (resolve) {
          resolve(result);
        }
        node.remove();
        $vm.$destroy();
      }, () => {
        node.remove();
        $vm.$destroy();
      });
    });
  }
}
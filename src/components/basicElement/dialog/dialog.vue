<template>
  <el-dialog :title="title"
             :visible.sync="visible"
             :center="center"
             modal
             :width="width"
             class="dialog-layout"
             modal-append-to-body
             append-to-body
             lock-scroll
             show-close
             :close-on-click-modal="false"
             :before-close="beforeClose"
             @close="handleClose">
    <slot></slot>
    <slot name="footer" slot="footer"></slot>
  </el-dialog>
</template>

<script>
export default {
  name: "dialog-layout",
  props: {
    title: {},
    width: {
      default: "600px",
      type: String
    },
    center: {
      default: false,
      type: Boolean
    },
    beforeClose: {
      default: done => {
        done();
      },
      type: Function
    }
  },
  data() {
    return {
      promise: null,
      resolve: null,
      reject: null,
      visible: false,
      confirmClose: false,
      result: {}
    };
  },
  methods: {
    open() {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        this.visible = true;
      });
      return this.promise;
    },
    close(result) {
      this.confirmClose = true;
      this.result = result;
      this.visible = false;
    },
    cancel() {
      this.confirmClose = false;
      this.result = {};
      this.visible = false;
    },
    handleClose() {
      if (this.confirmClose) {
        this.resolve(this.result);
      } else {
        this.reject();
      }
    }
  }
};
</script>

<style lang="less">
.dialog-layout {
  .el-dialog__body {
    padding: 0 20px;
  }
}
</style>

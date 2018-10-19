<template>
  <el-card class="card-layout">
    <div slot="header">
      <span>{{title}}</span>
      <div>
        <g-toolbar :actions="actions" @click="handleClick"></g-toolbar>
      </div>
    </div>
    <slot></slot>
  </el-card>
</template>

<script>
import gToolbar from "../toolbar/gToolbar.vue";
export default {
  name: "card-layout",
  mixins: [gToolbar],
  props: {
    title: {
      type: String,
      default: "title"
    }
  },
  components: {
    "g-toolbar": gToolbar
  }
};
</script>

<style lang="less">
.card-layout {
  .el-card__header {
    padding: 10px 20px;
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      span:first-child {
        font-weight: bold;
      }
    }
  }
}
</style>

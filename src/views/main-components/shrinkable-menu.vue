<template>
  <div class="side-bar height-100">
    <slot name="top"></slot>
    <el-menu :default-active="$route.name" 
             class="el-menu-vertical-sidebar" 
             @open="handleOpen" 
             @close="handleClose" 
             background-color="#363e4f"
             text-color="hsla(0,0%,100%,.7)"
             active-text-color="#ffd04b"
             :collapse="isCollapse"
             @select="handleSelect">
      <template v-for="item in menuList">
        <el-submenu :index='item.name' :key="item.name">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <template v-for="child in item.children">
            <el-menu-item :index="child.name" :key="'menuitem' + child.name">
              {{ child.title }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      required: true
    },
    beforePush: {
      type: Function
    }
  },
  data() {
    return {
      // isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      let willpush = true;
      if (this.beforePush !== undefined) {
        if (!this.beforePush(name)) {
          willpush = false;
        }
      }
      if (willpush) {
        this.$router.push({
          name: key
        });
      }
    }
  }
};
</script>

<style lang="less">
@import "../../assets/color.less";

.side-bar {
  .el-menu {
    border-right: none;
  }

  .el-menu-vertical-sidebar:not(.el-menu--collapse) {
    width: 200px;
  }

  //菜单标题
  .el-submenu__title {
    background-color: @sidebar-background !important;
    color: @sidebar-avtive-text !important;
  }

  //选中
  .el-menu-item.is-active {
    background-color: @theme-main !important;
    color: @sidebar-avtive-text !important;
  }

  //浮停
  .el-menu-item:hover {
    background-color: @sidebar-background !important;
    color: @sidebar-avtive-text !important;
  }

  //选中后浮停
  .el-menu-item.is-active:hover {
    background-color: @theme-main !important;
  }
}
</style>

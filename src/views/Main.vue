<style lang="less">
@import "./main.less";
</style>

<template>
  <div class="main">
    <div class="sidebar-menu-con" :style="{width: shrink?'64px':'200px', overflow: shrink ? 'hidden' : 'auto','overflow-x': 'hidden'}">
      <shrinkable-menu :isCollapse="shrink" :menu-list="menuList">
        <div slot="top" class="logo-con">
            <img v-show="!shrink"  src="static/images/logo.jpg" key="max-logo" class="regular-logo" />
            <img v-show="shrink" src="static/images/logo-min.jpg" key="min-logo" class="small-logo" />
        </div>
      </shrinkable-menu>
    </div>
    <div class="main-header-con" :style="{paddingLeft: shrink?'64px':'200px'}">
      <div class="main-header">
        <div class="navicon-con">
          <el-button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" @click="toggleClick">
            <i class="fa fa-bars"></i>
          </el-button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <full-screen v-model="isFullScreen"></full-screen>
          <div class="message-con">
            <i class="fa fa-commenting"></i>
          </div>
          <change-language></change-language>
          <div class="user-dropdown-menu-con abp-flex-row-center">
            <el-dropdown trigger="click" @command="handleClickUserDropdown">
              <span class="main-user-name">
                {{ shownLoginName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="Loginout">Loginout</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <img v-image="avatarPath">
          </div>
        </div>
      </div>
      <div class="tags-con">
          <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>
    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
      <div class="single-page">
        <keep-alive :include="cachePage">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import shrinkableMenu from "./main-components/shrinkable-menu.vue";
import tagsPageOpened from "./main-components/tags-page-opened.vue";
import breadcrumbNav from "./main-components/breadcrumb-nav.vue";
import fullScreen from "./main-components/fullscreen.vue";
import AppConsts from "static/appconst.js";
import Cookies from "js-cookie";
import util from "@/libs/util.js";
import changeLanguage from './main-components/changelanguage.vue';
export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    changeLanguage
  },
  data() {
    return {
      shrink: false,
      userName: "",
      isFullScreen: false,
      // openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      appConsts: AppConsts,
      avatarPath: null
    };
  },
  methods: {
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      this.$store.commit("updateMenulist");
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.userName = Cookies.get("user");
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    handleClickUserDropdown(command) {
      if (command === "Loginout") {
        this.$store.commit("clearOpenedSubmenu");
        this.$store.commit("user/logout", this);
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });

      if (!openpageHasTag) {
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    }
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList;
    },
    currentPath() {
      return this.$store.state.app.currentPath;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    },
    mesCount() {
      return this.$store.state.app.messageCount;
    },
    shownLoginName() {
      let username = this.$store.state.session.user
        ? this.$store.state.session.user.userName
        : "";
      if (!abp.multiTenancy.isEnabled) {
        return username;
      }
      return (
        (this.$store.state.session.tenant
          ? this.$store.state.session.tenant.tenancyName
          : ".") +
        "\\" +
        username
      );
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);

      if (pathArr.length > 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // Used to refresh the breadcrumbs when switching languages
    }
  },
  mounted() {
    this.init();
    // if(this.$store.state.session.application.features['SignalR']){
    //     if (this.$store.state.session.application.features['SignalR.AspNetCore']) {
    //         SignalRAspNetCoreHelper.initSignalR();
    //     } else {
    //         SignalRHelper.initSignalR();
    //     }
    // }
  },
  created() {
    // Display a list of open pages
    this.$store.commit("setOpenedList");
  }
};
</script>

<style>

</style>

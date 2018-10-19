<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import SignalRAspNetCoreHelper from "./libs/SignalRAspNetCoreHelper";
import SignalRHelper from "./libs/SignalRHelper";
import AppConsts from "static/appconst";
export default {
  data() {
    return {
      theme: this.$store.state.app.themeColor
    };
  },
  async mounted() {
    await this.$store.dispatch({
      type: "session/init"
    });

    if (
      !!this.$store.state.session.user &&
      this.$store.state.session.application.features["SignalR"]
    ) {
      if (
        this.$store.state.session.application.features["SignalR.AspNetCore"]
      ) {
        SignalRAspNetCoreHelper.initSignalR();
      } else {
        SignalRHelper.initSignalR();
      }
      abp.event.on("abp.notifications.received", userNotification => {
        abp.notifications.showUiNotifyForUserNotification(userNotification);
      });
    }
  },
  beforeDestroy() {},
  methods: {}
};
</script>

<style lang="less">
@import "../node_modules/famfamfam-flags/dist/sprite/famfamfam-flags.css";
@import "./assets/color.less";
html,
body,
#app,
.app-main {
  width: 100%;
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
  background: #f0f0f0;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @defaut-text;
  background: #f0f0f0;
}
</style>

<template>
  <div style="display:inline-block;" class="topbar-menu-item language-list">
    <div class="abp-flex-row">
      <i :class="currentLanguage.icon" style="margin-right:5px"></i>
      <el-dropdown trigger="click" @command="setLanguage">
        <span class="el-dropdown-link">
          {{currentLanguage.displayName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in languages" v-if="item.name!==currentLanguage.name" :key="index" :command="item.name">
            <div class="abp-flex-row">
              <i :class="item.icon"></i><span style="margin-left:5px">{{item.displayName}}</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
  
</template>

<script>
export default {
  methods: {
    async setLanguage(command) {
      let changeLanguageInput = {
        languageName: command
      };
      await this.$store.dispatch({
        type: "user/changeLanguage",
        data: changeLanguageInput
      });
    }
  },
  data() {
    return {
      languages: [],
      currentLanguage: {}
    };
  },
  created() {
    this.languages = abp.localization.languages.filter(val => {
      return !val.isDisabled;
    });
    this.currentLanguage = abp.localization.currentLanguage;
  }
};
</script>

<style>
.language-list{
  margin-left: 10px;
  cursor: pointer;
}

.language-list .el-dropdown-link {
  font-size: 12px;
  color: #2d8cf0!important;
}
</style>

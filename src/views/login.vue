<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit" id="large-header">
        <canvas id="login-canvas"></canvas>
        <div class="login-con">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Current tenant: Not selected</span>
            </div>
            <el-form ref="loginForm" :model="form" status-icon :rules="rules" class="demo-ruleForm" size="medium">
              <el-form-item prop="userNameOrEmailAddress">
                <el-input v-model.number="form.userNameOrEmailAddress">
                  <template slot="prepend"><i class="fa fa-user"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="form.password" auto-complete="off">
                  <template slot="prepend"><i class="fa fa-lock"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="form.rememberClient">RememberMe</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSubmit" style="width:100%">LogIn</el-button>
              </el-form-item>
            </el-form>
            <p class="login-tip">{{'PleaseEnterLoginInformation'}}</p>
          </el-card>
        </div>
        <!-- <Modal
         :title="'ChangeTenant'|l"
         v-model="modalShow"
         @on-ok="changeTenant"
        >
             <Input :placeholder="'TenancyName' | l" v-model="changedTenancyName"></Input>
             <p>{{'LeaveEmptyToSwitchToHost' | l}}</p>
             <div slot="footer">
                <Button @click="modalShow=false">{{'Cancel'|l}}</Button>
                <Button @click="changeTenant" type="primary">{{'Save'|l}}</Button>
             </div>
        </Modal> -->
    </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      rules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userNameOrEmailAddress: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ]
      },
      languages: [],
      currentLanguage: {},
      isMultiTenancyEnabled: abp.multiTenancy.isEnabled,
      changedTenancyName: "",
      modalShow: false,
      isMultiTenancyEnabled: true,
      form: {
        userNameOrEmailAddress: "",
        password: "",
        rememberClient: false
      }
    };
  },
  methods: {
    changeLanguage(languageName) {
      abp.utils.setCookieValue(
        "Abp.Localization.CultureName",
        languageName,
        new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
        abp.appPath
      );
      location.reload();
    },
    showChangeModal() {
      this.modalShow = true;
    },
    async changeTenant() {
      if (!this.changedTenancyName) {
        abp.multiTenancy.setTenantIdCookie(undefined);
        this.modalShow = false;
        location.reload();
        return;
      } else {
        let tenant = await this.$store.dispatch({
          type: "account/isTenantAvailable",
          data: { tenancyName: this.changedTenancyName }
        });
        switch (tenant.state) {
          case 1:
            abp.multiTenancy.setTenantIdCookie(tenant.tenantId);
            location.reload();
            return;
          case 2:
            let message = this.L("TenantIsNotActive", this.changedTenancyName);
            this.$Modal.error({
              title: "",
              content: message
            });
            break;
          case 3:
            let message2 = this.L(
              "ThereIsNoTenantDefinedWithName{0}",
              this.changedTenancyName
            );
            this.$Modal.error({
              title: "",
              content: message2
            });
            break;
        }

        this.modalShow = false;
        this.modalShow = true;
      }
    },
    async handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          let self = this;

          await this.$store
            .dispatch({
              type: "user/login",
              data: self.form
            })
            .then(
              response => {
                Cookies.set(
                  "userNameOrEmailAddress",
                  self.form.userNameOrEmailAddress
                );
                location.reload();
              },
              error => {
                loading.close();
              }
            );
        }
      });
    }
  },
  created() {
    this.languages = abp.localization.languages.filter(val => {
      return !val.isDisabled;
    });
    this.currentLanguage = abp.localization.currentLanguage;
    this.isMultiTenancyEnabled = abp.multiTenancy.isEnabled;
  },
  computed: {
    tenant() {
      return this.$store.state.session.tenant;
    }
  }
};
</script>

<style>
.language-ul {
  text-align: center;
}
.language-ul li {
  display: inline;
  margin: 2px;
}
.famfamfam-flags {
  display: inline-block;
}
</style>

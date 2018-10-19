<template>
    <dialog-layout ref="tenantDialog" :title="title">
      <el-form ref="tenantForm" label-position="top" label-width="80px" :model="editTenant" :rules="fromRoles" v-loading="loading">
        <el-form-item :label="L('TenancyName')" prop="tenancyName">
          <el-input v-model="editTenant.tenancyName" :maxlength="64" :minlength="2"></el-input>
        </el-form-item>
        <el-form-item :label="L('Name')" prop="name">
          <el-input v-model="editTenant.name" :maxlength="128"></el-input>
        </el-form-item>
        <el-form-item :label="L('DatabaseConnectionString')+'('+L('Optional')+')'" v-if="this.action == 'create'">
          <el-input v-model="editTenant.connectionString" :maxlength="1024"></el-input>
        </el-form-item>
        <el-form-item :label="L('AdminEmailAddress')" prop="adminEmailAddress" v-if="this.action == 'create'">
          <el-input v-model="editTenant.adminEmailAddress" type="email" :maxlength="256"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="editTenant.isActive">{{L('IsActive')}}</el-checkbox>
        </el-form-item>
        <p>{{L("DefaultPasswordIs",'123qwe')}}</p>
      </el-form>
      <div slot="footer">
        <el-button @click="cancel">{{L('Cancel')}}</el-button>
        <el-button type="primary" @click="save">{{L('Save')}}</el-button>
      </div>
    </dialog-layout>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      editTenant: {},
      action: "",
      newtenantRule: {
        tenancyName: [{ required: true }],
        name: [{ required: true }],
        adminEmailAddress: [{ required: true }, { type: "email" }]
      },
      tenantRule: {
        tenancyName: [{ required: true }],
        name: [{ required: true }]
      }
    };
  },
  methods: {
    open(args, action) {
      var output = this.$refs.tenantDialog.open();
      this.$nextTick(function() {
        this.action = action;
        this.editTenant = JSON.parse(JSON.stringify(args));
        this.$nextTick(function() {
          this.$refs.tenantForm.clearValidate();
        });
      });
      return output;
    },
    cancel() {
      if (!this.loading) {
        this.$refs.tenantDialog.cancel();
      }
    },
    async save() {
      if (!this.loading) {
        if (!!this.editTenant.id && this.action == "edit") {
          this.$refs.tenantForm.validate(async val => {
            if (val) {
              this.loading = true;
              await this.$store.dispatch({
                type: "tenant/update",
                data: this.editTenant
              });
              this.loading = false;
              this.$refs.tenantDialog.close(null);
            }
          });
        } else {
          this.$refs.tenantForm.validate(async val => {
            if (val) {
              this.loading = true;
              await this.$store.dispatch({
                type: "tenant/create",
                data: this.editTenant
              });
              this.loading = false;
              this.$refs.tenantDialog.close(null);
            }
          });
        }
      }
    }
  },
  computed: {
    fromRoles() {
      return this.action == "edit" ? this.tenantRule : this.newtenantRule;
    },
    title() {
      return this.action == "edit"
        ? this.L("EditTenant")
        : this.L("CreateNewTenant");
    }
  }
};
</script>

<style>

</style>

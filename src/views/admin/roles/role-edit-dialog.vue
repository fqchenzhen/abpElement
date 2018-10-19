<template>
  <dialog-layout ref="roleDialog" :title="title">
    <el-form ref="roleForm" label-position="top" label-width="80px" :model="editRole" :rules="fromRoles" v-loading="loading">
      <el-form-item :label="L('RoleName')" prop="name">
        <el-input v-model="editRole.name" :maxlength="32" :minlength="2"></el-input>
      </el-form-item>
      <el-form-item :label="L('DisplayName')" prop="displayName">
        <el-input v-model="editRole.displayName" :maxlength="32" :minlength="2"></el-input>
      </el-form-item>
      <el-form-item :label="L('RoleDescription')" prop="description">
        <el-input v-model="editRole.description"></el-input>
      </el-form-item>
      <el-form-item :label="L('Permissions')">
        <el-checkbox-group v-model="editRole.permissions">
          <el-checkbox :label="permission.name" v-for="permission in permissions" :key="permission.name"><span>{{permission.displayName}}</span></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
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
      editRole: {},
      loading: false,
      action: "",
      newRoleRule: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" }
        ],
        displayName: [
          {
            required: true,
            message: "DisplayName is required",
            trigger: "blur"
          }
        ]
      },
      roleRule: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" }
        ],
        displayName: [
          {
            required: true,
            message: "DisplayName is required",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    open(args, action) {
      var output = this.$refs.roleDialog.open();
      this.$nextTick(function() {
        this.action = action;
        this.editRole = JSON.parse(JSON.stringify(args));
        this.$nextTick(function() {
          this.$refs.roleForm.clearValidate();
        });
      });
      return output;
    },
    cancel() {
      if (!this.loading) {
        this.$refs.roleDialog.cancel();
      }
    },
    async save() {
      if (!this.loading) {
        if (!!this.editRole.id && this.action == "edit") {
          this.$refs.roleForm.validate(async val => {
            if (val) {
              this.loading = true;
              await this.$store.dispatch({
                type: "role/update",
                data: this.editRole
              });
              this.loading = false;
              this.$refs.roleDialog.close(null);
            }
          });
        } else {
          this.$refs.roleForm.validate(async val => {
            if (val) {
              this.loading = true;
              await this.$store.dispatch({
                type: "role/create",
                data: this.editRole
              });
              this.loading = false;
              this.$refs.roleDialog.close(null);
            }
          });
        }
      }
    }
  },
  computed: {
    fromRoles() {
      return this.action == "edit" ? this.roleRule : this.newRoleRule;
    },
    title() {
      return this.action == "edit"
        ? this.L("EditRole")
        : this.L("CreateNewRole");
    },
    permissions() {
      return this.$store.state.role.permissions;
    }
  }
};
</script>

<style>

</style>

<template>
  <dialog-layout ref="userDialog" :title="L('EditUser')">
    <el-tabs v-model="activeTag">
      <el-tab-pane :label="L('UserDetails')" name="first">
        <el-form ref="userForm" label-position="top" label-width="80px" :model="editUser" :rules="fromRoles" v-loading="loading">
          <el-form-item :label="L('UserName')" prop="userName">
            <el-input v-model="editUser.userName" :maxlength="32" :minlength="2"></el-input>
          </el-form-item>
          <el-form-item :label="L('Name')" prop="name">
            <el-input v-model="editUser.name" :maxlength="32"></el-input>
          </el-form-item>
          <el-form-item :label="L('Surname')" prop="surname">
            <el-input v-model="editUser.surname" :maxlength="1024"></el-input>
          </el-form-item>
          <el-form-item :label="L('EmailAddress')" prop="emailAddress">
            <el-input v-model="editUser.emailAddress" :maxlength="32"></el-input>
          </el-form-item>
          <el-form-item :label="L('Password')" prop="password" v-if="this.action == 'create'">
            <el-input v-model="editUser.password" type="password" :maxlength="32"></el-input>
          </el-form-item>
          <el-form-item :label="L('ConfirmPassword')" prop="confirmPassword" v-if="this.action == 'create'">
            <el-input v-model="editUser.confirmPassword" type="password" :maxlength="32"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="editUser.isActive">{{L('IsActive')}}</el-checkbox>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="L('UserRoles')" name="second">
        <el-checkbox-group v-model="editUser.roleNames">
          <el-checkbox :label="role.normalizedName" v-for="role in roles" :key="role.id"><span>{{role.name}}</span></el-checkbox>
        </el-checkbox-group>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer">
      <el-button @click="cancel">{{L('Cancel')}}</el-button>
      <el-button type="primary" @click="save">{{L('Save')}}</el-button>
    </div>
  </dialog-layout>
</template>

<script>
export default {
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.editUser.password) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      action: "",
      activeTag: "first",
      editUser: {},
      newUserRule: {
        userName: [
          { required: true, message: "User Name is required", trigger: "blur" }
        ],
        name: [
          { required: true, message: "Name is required", trigger: "blur" }
        ],
        surname: [
          { required: true, message: "Surname is required", trigger: "blur" }
        ],
        emailAddress: [
          { required: true, message: "Email is required", trigger: "blur" },
          { type: "email" }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" }
        ],
        confirmPassword: { validator: validatePassCheck, trigger: "blur" }
      },
      userRule: {
        userName: [
          { required: true, message: "User Name is required", trigger: "blur" }
        ],
        name: [
          { required: true, message: "Name is required", trigger: "blur" }
        ],
        surname: [
          { required: true, message: "Surname is required", trigger: "blur" }
        ],
        emailAddress: [
          { required: true, message: "Email is required", trigger: "blur" },
          { type: "email" }
        ]
      }
    };
  },
  methods: {
    open(args, action) {
      var output = this.$refs.userDialog.open();
      this.$nextTick(function() {
        this.action = action;
        this.editUser = JSON.parse(JSON.stringify(args));
        this.$nextTick(function() {
          this.$refs.userForm.clearValidate();
        });
      });
      return output;
    },
    cancel() {
      this.$refs.userDialog.cancel();
    },
    async save() {
      if (!!this.editUser.id && this.action == "edit") {
        this.$refs.userForm.validate(async val => {
          if (val) {
            this.loading = true;
            await this.$store.dispatch({
              type: "user/update",
              data: this.editUser
            });
            this.loading = false;
            this.$refs.userDialog.close(null);
          }
        });
      } else {
        this.$refs.userForm.validate(async val => {
          if (val) {
            this.loading = true;
            await this.$store.dispatch({
              type: "user/create",
              data: this.editUser
            });
            this.loading = false;
            this.$refs.userDialog.close(null);
          }
        });
      }
    }
  },
  computed: {
    roles() {
      //打开user界面已经初始化过了
      return this.$store.state.user.roles;
    },
    fromRoles() {
      return this.action == "edit" ? this.userRule : this.newUserRule;
    }
  }
};
</script>

<style>

</style>

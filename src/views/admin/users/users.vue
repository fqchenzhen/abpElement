<template>
  <card-layout :title="L('Users')" :actions="actions" @click="handleClick">
    <datatable-paging :border="true" :dataSource="users" v-loading="users.length == 0 || loading">
      <el-table-column
        prop="userName"
        :label="L('UserName')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fullName"
        :label="L('FullName')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="emailAddress"
        :label="L('EmailAddress')">
      </el-table-column>
      <el-table-column
        :label="L('IsActive')">
        <template slot-scope="scope">
          <el-checkbox disabled v-model="scope.row.isActive"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        :label="L('Actions')"
        width="155">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="edit(scope.row)">{{L('Edit')}}</el-button>
          <el-button size="small" type="danger" @click="deleteUser(scope.row)">{{L('Delete')}}</el-button>
        </template>
      </el-table-column>
    </datatable-paging>
    <user-edit-dialog ref="userdialog"></user-edit-dialog>
  </card-layout>
</template>

<script>
import userDialog from "./user-edit-dialog";
export default {
  name: "users",
  components: {
    "user-edit-dialog": userDialog
  },
  data() {
    return {
      actions: [
        [
          {
            id: "New",
            type: "primary",
            text: "New",
            icon: "fa fa-plus"
          },
          {
            id: "Refresh",
            type: "success",
            text: "Refresh",
            icon: "fa fa-refresh"
          }
        ]
      ],
      editUser: {}
    };
  },
  methods: {
    handleClick(id) {
      switch (id) {
        case "New":
          this.create();
          break;
        case "Refresh":
          this.getpage();
          break;
        default:
          break;
      }
    },
    edit(row) {
      this.$refs.userdialog
        .open(row, "edit")
        .then(async result => {
          await this.getpage();
        })
        .catch(err => {});
    },
    create() {
      this.$refs.userdialog
        .open({ isActive: true }, "create")
        .then(async result => {
          await this.getpage();
        })
        .catch(err => {});
    },
    async deleteUser(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$store.dispatch({
            type: "user/delete",
            data: row
          });
          await this.getpage();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    pageChange(page) {
      this.$store.commit("user/setCurrentPage", page);
      this.getpage();
    },
    pagesizeChange(pagesize) {
      this.$store.commit("user/setPageSize", pagesize);
      this.getpage();
    },
    async getpage() {
      await this.$store.dispatch({
        type: "user/getAll"
      });
    }
  },
  computed: {
    users() {
      return this.$store.state.user.users;
    },
    totalCount() {
      return this.$store.state.user.totalCount;
    },
    currentPage() {
      return this.$store.state.user.currentPage;
    },
    pageSize() {
      return this.$store.state.user.pageSize;
    },
    loading() {
      return this.$store.state.user.loading;
    }
  },
  async created() {
    this.getpage();
    await this.$store.dispatch({
      type: "user/getRoles"
    });
  }
};
</script>

<style>

</style>

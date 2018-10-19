<template>
  <card-layout :title="L('Roles')" :actions="actions" @click="handleClick">
    <datatable-paging :border="true" :dataSource="roles" v-loading="loading">
      <el-table-column
        prop="name"
        :label="L('RoleName')">
      </el-table-column>
      <el-table-column
        prop="displayName"
        :label="L('DisplayName')">
      </el-table-column>
      <el-table-column
        :label="L('Actions')"
        width="155">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="edit(scope.row)">{{L('Edit')}}</el-button>
          <el-button size="small" type="danger" @click="deleteRole(scope.row)">{{L('Delete')}}</el-button>
        </template>
      </el-table-column>
    </datatable-paging>
    <role-dialog ref="roledialog"></role-dialog>
  </card-layout>
</template>

<script>
import roleDialog from "./role-edit-dialog";
export default {
  name:"roles",
  data() {
    return {
      editRole: {},
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
      ]
    };
  },
  components: {
    "role-dialog": roleDialog
  },
  methods: {
    edit(row) {
      this.$refs.roledialog
        .open(row, "edit")
        .then(async result => {
          await this.getpage();
        })
        .catch(err => {});
    },
    create() {
      this.$refs.roledialog
        .open({ isActive: true, permissions: [] }, "create")
        .then(async result => {
          await this.getpage();
        })
        .catch(err => {});
    },
    deleteRole() {},
    async getpage() {
      await this.$store.dispatch({
        type: "role/getAll"
      });
    },
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
    }
  },
  computed: {
    roles() {
      return this.$store.state.role.roles;
    },
    totalCount() {
      return this.$store.state.role.totalCount;
    },
    currentPage() {
      return this.$store.state.role.currentPage;
    },
    pageSize() {
      return this.$store.state.role.pageSize;
    },
    loading() {
      return this.$store.state.role.loading;
    }
  },
  async created() {
    this.getpage();
    await this.$store.dispatch({
      type: "role/getAllPermissions"
    });
  }
};
</script>

<style>

</style>

<template>
    <card-layout :title="L('Tenants')" :actions="actions" @click="handleClick">
      <datatable-paging :border="true" :dataSource="tenants" v-loading="loading">
        <el-table-column
          prop="tenancyName"
          :label="L('TenancyName')">
        </el-table-column>
        <el-table-column
          prop="name"
          :label="L('Name')">
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
            <el-button size="small" type="danger" @click="deleteTenant(scope.row)">{{L('Delete')}}</el-button>
          </template>
        </el-table-column>
      </datatable-paging>
      <tenant-dialog ref="tenantdialog"></tenant-dialog>
    </card-layout>
</template>

<script>
import tenantDialog from "./tenant-edit-dialog";
export default {
  name:"tenants",
  data() {
    return {
      editTenant: {},
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
    "tenant-dialog": tenantDialog
  },
  methods: {
    async getpage() {
      await this.$store.dispatch({
        type: "tenant/getAll"
      });
    },
    edit(row) {
      this.$refs.tenantdialog
        .open(row, "edit")
        .then(async result => {
          await this.getpage();
        })
        .catch(err => {});
    },
    create() {
      this.$refs.tenantdialog
        .open({ isActive: true }, "create")
        .then(async result => {
          await this.getpage();
        })
        .catch(err => {});
    },
    deleteTenant(row) {
      this.$confirm("此操作将永久删除该租户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$store.dispatch({
            type: "tenant/delete",
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
    tenants() {
      return this.$store.state.tenant.tenants;
    },
    totalCount() {
      return this.$store.state.tenant.totalCount;
    },
    currentPage() {
      return this.$store.state.tenant.currentPage;
    },
    pageSize() {
      return this.$store.state.tenant.pageSize;
    },
    loading() {
      return this.$store.state.tenant.loading;
    }
  },
  created() {
    this.getpage();
  }
};
</script>

<style>

</style>

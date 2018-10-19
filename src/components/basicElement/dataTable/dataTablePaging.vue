<template>
  <el-container class="datatable-paging">
    <datatable-no-paging :cols="cols"
                         :dataSource="realDataSource"
                         :border="border"
                         @sort-change="handleSort">
      <slot></slot>
    </datatable-no-paging>
    <el-footer class="datatable-footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 50, 100, 150]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataSource.length">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import { subDataTable } from "./subDataTable";
export default {
  name: "datatable-paging",
  mixins: [subDataTable],
  props: {
    dataSource: {
      type: Array,
      default: []
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      data: [],
      size: this.pageSize,
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange(size) {
      this.size = size;
      this._fetchData();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this._fetchData();
    },
    handleSort({ column, prop, order }) {
      this.dataSource = this.dataSource.sort((a, b) => {
        if (order == "ascending") {
          return a[prop] < b[prop];
        } else if (order == "descending") {
          return a[prop] > b[prop];
        } else {
          return 0;
        }
      });
      this._fetchData();
    },
    _fetchData() {
      var start = (this.currentPage - 1) * this.size;
      var end = this.currentPage * this.size;
      if (end > this.dataSource.length) {
        end = this.dataSource.length;
      }
      //this.dataSource.map(x => x) for clone
      this.data = this.dataSource.map(x => x).splice(start, this.size);
    }
  },
  computed:{
    //改成computed属性才能实时监听数组变化
    realDataSource(){
      return this.dataSource;
    }
  },
  created() {
    this._fetchData();
  }
};
</script>

<style lang="less">
.datatable-paging {
  .el-footer{
    padding: 10px 0 0 0;
  }
}
</style>

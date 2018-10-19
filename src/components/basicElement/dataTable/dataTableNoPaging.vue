<template>
  <el-table :data="dataSource"
            :border="border">
    <slot>
    <!--循环cols-->
      <el-table-column v-for="(col,index) in elementCols"
                        :key="index"
                        :prop="col.prop"
                        :label="col.label"
                        :width="col.width"
                        :min-width="col.minWidth"
                        :sortable="col.sortable"
                        :formatter="col.formatter"
                        :align="col.align"
                        :fixed="col.fixed"
                        :header-align="col.headerAlign"
                        :resizable="col.resizable"
                        :show-overflow-tooltip="col.showOverflowTooltip">
      </el-table-column>
    </slot>
  </el-table>
</template>

<script>
import { subDataTable } from "./subDataTable";
export default {
  name: "datatable-no-paging",
  mixins: [subDataTable],
  props: {
    dataSource: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>

<style>

</style>

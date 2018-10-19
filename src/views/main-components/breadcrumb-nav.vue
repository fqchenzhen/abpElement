<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item 
      v-for="item in currentPath" 
      :to="{ name: item.name }"
      :key="item.name"
    >{{ item.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "breadcrumbNav",
  props: {
    currentPath: Array
  }
};
</script>

<style>

</style>

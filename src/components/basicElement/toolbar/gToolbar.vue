<template>
  <div class="g-toolbar" :style="{'text-align':align}">
    <template v-for="(group,index) in actions">
      <el-button-group :key="index">
        <template v-for="item in group">
          <template v-if="!item.actions">
            <el-button :type="item.type" :size="btnSize" :key="item.id" :disabled="item.disabled"
                       @click="handleClick(item.id)" :round="false" :icon="item.icon">{{item.text}}
            </el-button>
          </template>
          <template v-else>
            <el-button :type="item.type" :size="btnSize" :key="item.id" :disabled="item.disabled">
              <el-dropdown @command="handleCommand" trigger="click" style="color:inherit">
                <span class="el-dropdown-link">  {{item.text}}<i class="el-icon-arrow-down el-icon--right"></i> </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="act in item.actions" :key="act.id" :command="act.id"><i :class="act.icon"
                                                                                                   v-if="act.icon"></i>
                    {{act.text}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-button>
          </template>
        </template>
      </el-button-group>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    actions: {
      type: Array,
      default: function() {
        return [];
      }
    },
    align: {
      type: String,
      default: "right"
    },
    btnSize: {
      type: String,
      default: "small"
    }
  },
  methods: {
    handleClick(actionId) {
      this.$emit("click", actionId);
    }
  }
};
</script>

<style lang="less">
.g-toolbar {
  margin: 5px 0px 5px 5px;
}

.el-button [class*="fa-"] + span,
.el-button [class*="icon-"] + span {
  margin-left: 5px;
}
</style>

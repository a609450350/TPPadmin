<template>
  <div>
<el-popover
  placement="top"
  width="160"
  trigger="manual"
  v-model="visible">
  <p>这是一段内容这是一段内容确定删除吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
    <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
  </div>
  <el-button slot="reference" @click="visible = !visible">删除</el-button>
</el-popover>
<el-popover
  placement="top"
  width="160"
  trigger="manual"
  v-model="visible">
  <p>这是一段内容这是一段内容确定删除吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
    <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
  </div>
  <el-button slot="reference" @click="visible= !visible">删除</el-button>
</el-popover>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
      };
    }
  }
</script>

<style lang="scss" scoped>

</style>
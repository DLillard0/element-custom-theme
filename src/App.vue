<template>
  <div id="app" :style="themeStyle">
    <div class="left">
      <el-row>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
      </el-row>
      <el-row>
        <el-tag>Tag 1</el-tag>
        <el-tag type="success">Tag 2</el-tag>
        <el-tag type="info">Tag 3</el-tag>
        <el-tag type="warning">Tag 4</el-tag>
        <el-tag type="danger">Tag 5</el-tag>
      </el-row>
      <el-row>
        <el-alert title="success alert" type="success"></el-alert>
        <el-alert title="info alert" type="info"></el-alert>
        <el-alert title="warning alert" type="warning"></el-alert>
        <el-alert title="error alert" type="error"></el-alert>
      </el-row>
    </div>
    <div class="right">
      <div class="editor">
        <div class="item" v-for="i in theme" :key="i.name">
          <div class="label">{{ i.name }}</div>
          <div class="content">
            <el-input v-model="i.value"></el-input>
            <el-color-picker v-model="i.value"></el-color-picker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      theme: [
        { name: '--color-primary', value: '#409EFF' },
        { name: '--color-success', value: '#67C23A' },
        { name: '--color-warning', value: '#E6A23C' },
        { name: '--color-danger', value: '#F56C6C' },
        { name: '--color-info', value: '#909399' }
      ]
    }
  },
  computed: {
    themeStyle () {
      return this.theme.reduce((style, item) => {
        style[item.name] = item.value
        return style
      }, {})
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  padding: 24px;
  .left {
    flex-grow: 1;
    margin-right: 24px;
    .el-row + .el-row {
      margin-top: 24px;
    }
    .el-tag + .el-tag {
      margin-left: 24px;
    }
    .el-alert + .el-alert {
      margin-top: 24px;
    }
  }
  .right {
    .editor {
      width: 285px;
      background: #f5f7fa;
      border: 1px solid #ebeef5;
      border-radius: 5px;
      padding: 16px;
      .item {
        & + .item {
          margin-top: 16px;
        }
        .label {
          margin-bottom: 8px;
        }
        .content {
          display: flex;
          .el-input {
            margin-right: 16px;
          }
        }
      }
    }
  }
}
</style>

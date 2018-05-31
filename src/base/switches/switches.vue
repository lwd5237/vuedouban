<template>
  <ul class="switches">
    <li class="switch-item"
        v-for="(item,index) in switches"
        :class="{'active':currentIndex === index, 'small-font':smallFont === true}"
        @click="switchItem(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    switches: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    },
    smallFont: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    switchItem(index) {
      this.$emit('switch', index)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .switches
    position: relative
    background: #fff
    display: flex
    z-index: 1
    align-items: center
    font-size: 0
    .switch-item
      display: inline-block
      box-sizing: border-box
      flex: 1
      text-align: center
      padding: 15px
      font-size: $font-size-medium-x
      color: $color-text
      border-bottom: 1px solid transparent
      &.small-font
        padding: 14px 5px
        font-size: $font-size-small
      &.active
        color: $color-theme
        border-bottom: 1px solid $color-theme
</style>

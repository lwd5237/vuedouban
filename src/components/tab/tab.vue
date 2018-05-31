<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/hot-show">
      <span class="tab-icon">
        <i class="icon-video-camera"></i>
      </span>
      <span class="tab-link">热映</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/among">
      <span class="tab-icon">
        <i class="icon-stats-bars"></i>
      </span>
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/user-center">
      <span class="tab-icon">
        <i class="icon-user"></i>
      </span>
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    position: fixed
    width: 100%
    bottom: 0
    left: 0
    z-index: 1000
    display: flex
    height: 60px
    background: #fff
    font-size: $font-size-medium
    border-top: 1px solid $color-theme
    .tab-item
      flex: 1
      text-align: center
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      .tab-icon
        font-size: $font-size-large-x
        color: $color-text
      .tab-link
        font-size: $font-size-small
        color: $color-text
      &.router-link-active
        .tab-icon
          color: $color-theme
        .tab-link
          color: $color-theme
</style>
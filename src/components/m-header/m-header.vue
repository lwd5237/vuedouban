<template>
  <div class="m-header" @click="inSearch()">
    <div class="logo">
      <img src="./douban-logo.png" alt="logo">
    </div>
    <div class="searchBox">
      <span><i class="icon-search"></i></span>
      <span>电影/影人/标签</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    inSearch() {
      this.$emit('inSearch')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .m-header
    display: flex
    box-sizing: border-box
    width: 100%
    height: 50px
    background: #fff
    padding: 10px 15px 5px 15px
    align-items: center
    .logo
      flex: 0 0 35px
      height: 35px
      margin-right: 15px
      img
        width: 35px
        height: 35px
    .searchBox
      flex: 1
      height: 35px
      line-height: 35px
      text-align: center
      background: #eee
      border-radius: 5px
</style>
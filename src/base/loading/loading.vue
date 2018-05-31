<template>
  <div>
    <div class="loading" v-if="hasMore">
      <img width="24" height="24" src="./loading.gif" :class="{'font-size': fontSize === true}">
      <p class="desc">{{title}}</p>
    </div> 
    <div class="noMore" v-else>没有更多了...</div>
  </div>
  
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      },
      hasMore: {
        type: Boolean,
        default: true
      },
      movieType: {
        type: Boolean,
        default: false
      },
      fontSize: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .loading
    width: 100%
    text-align: center
    .font-size
      width: 40px
      height: 40px
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
  .noMore
    text-align: center
    padding-bottom: 10px
</style>

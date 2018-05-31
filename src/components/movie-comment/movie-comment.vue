<template>
  <div class="movieComment">
    <ul>
      <li class="commentItem" v-for="(item, index) in comments">
        <h2>{{item.title}}</h2>
        <div class="comment-box">
          <span class="img">
            <img :src="item.author.avatar" style="width:36px;height:36px" alt="">
          </span>
          <span class="name">{{item.author.name}}</span>
          <span><star :size="24" :score="item.rating.value" :showScore="showScore"></star></span>
        </div>
        <p>{{item.summary}}</p>
      </li>
    </ul>
    <loading :hasMore="hasMore" v-show="this.$route.path.indexOf('review')> -1 && this.comments.length"></loading>
    <div class="movieCount" v-show="this.$route.path==='/movie/'+id" @click="selectItem(count)">全部影评{{count}}个</div>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'base/star/star'
import Loading from 'base/loading/loading'
export default {
  props: {
    comments: {
      type: Array,
      default: function () {
        return []
      }
    },
    count: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: ''
    },
    hasMore: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showScore: false
    }
  },
  methods: {
    selectItem(count) {
      this.$emit('select', count)
    }
  },
  components: {
    Star,
    Loading
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .movieComment
    position: relative
    padding: 0 15px
    background: #fff
    .commentItem
      padding-top: 20px
      h2
        padding: 5px 0
        font-size: $font-size-medium-x
        color: #333
      .comment-box
        display: flex
        align-items: center
        .img
          display: inline-block
          width: 36px
          height: 36px
          border-radius: 50%
          overflow: hidden
        span
          margin-right: 10px
          font-size: $font-size-small
      p
        padding: 5px 0 
        font-size: $font-size-medium
        line-height: 20px
        margin-bottom: 5px
        text-align: justify
        text-justify: inter-ideograph
    .movieCount
      text-align: center
      font-size: $font-size-medium-x
      color: $color-theme
      padding: 20px 0
</style>
<template>
  <div class="sortComment">
    <ul>
      <li class="commentItem" v-for="(item, index) in comments">
        <div class="user-img">
          <div class="img">
            <img :src="item.author.avatar" style="width:36px;height:36px" alt="">
          </div>    
        </div>
        <div class="comment-box">
          <div class="comment-msg">
            <div class="nameRating">
              <span>{{item.author.name}}</span>
              <span>
                <star :size="24" :score="item.rating.value" :showScore="showScore" class="sort-star"></star>
              </span>
            </div>
            <div class="goodNum">
              <i class="icon-thumbs-up"></i>
              <span>{{item.useful_count}}</span>
            </div>
            <p>{{item.content}}</p>
            <span>{{item.created_at}}</span>
          </div>
        </div>
      </li>
    </ul>
    <loading :hasMore="hasMore" v-show="this.$route.path.indexOf('sort') > -1 && this.comments.length"></loading>
    <div class="sortCount" v-show="this.$route.path==='/movie/'+id" @click="selectItem">全部短评{{count}}个</div>
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
  .sortComment
    padding: 0 15px
    background: #fff
    .commentItem
      position: relative
      padding-top: 20px
      .user-img
        width: 36px
        padding-right: 10px
        position: absolute
        top: 20px
        left: 0
        .img
          width: 36px
          height: 36px
          border-radius: 50%
          overflow: hidden
      .comment-msg
        margin-left: 46px
        padding-bottom: 10px
        position: relative
        .nameRating
          font-size: $font-size-medium
          color: #333
          .sort-star
            display: inline
        .goodNum
          position: absolute
          top: 0
          right: 0
          font-size: $font-size-medium
          color: #777
        p
          font-size: $font-size-medium-x
          color: #333
          line-height: 20px
          margin-top: 10px
          margin-bottom: 10px
          text-align: justify
          text-justify: inter-ideograph
    .sortCount
      text-align: center
      font-size: $font-size-medium-x
      color: $color-theme
      padding: 20px 0
</style>
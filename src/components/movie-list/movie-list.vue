<template>
  <div class="movie-list">
    <ul>
      <li class="movie-item" v-for="(movie,index) in movies" @click="clickItem(movie)">
        <div class="date" v-if="needDate && !dateEqual(index)">{{movie.date}}</div>
        <div class="movie-content">
          <div class="movie-img">
            <img v-lazy="movie.image" style="width:80px;height:112px;"alt="">
          </div>
          <div class="movie-msg">
            <div class="title">{{movie.title}}</div>
            <div class="rating">
              <star :size="24" :score="movie.rating" :showScore="showScore"></star>
            </div>
            <div class="director">导演: {{movie.director}}</div>
            <div class="casts">主演: {{movie.casts}}</div>
            <div class="collect_count" v-show="canShow">{{movie.collectCount}}人看过</div>
          </div>
        </div>
      </li>
    </ul>
    <loading :hasMore="hasMore" v-show="this.$route.path ==='/hot-show'"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'base/star/star'
import Loading from 'base/loading/loading'
export default {
  props: {
    movies: {
      type: Array,
      default: []
    },
    needDate: {
      type: Boolean,
      default: false
    },
    hasMore: {
      type: Boolean,
      default: true
    },
    canShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showScore: true
    }
  },
  created() {
    this.listHeight = []
    this.indexMap = {}
  },
  methods: {
    clickItem(movie) {
      this.$emit('select', movie)
    },
    dateEqual(index) { // 确定相邻两部电影日期是否一样，划分日期分组
      if (index === 0) {
        return false
      }
      return this.movies[index].date === this.movies[index - 1].date
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
  @import "~common/stylus/mixin"
  .date
    width: 100%
    background-color: #eee
    padding-left: 5px
    margin-bottom: 10px
    height: 30px
    line-height: 30px
  .movie-content
    display: flex
    box-sizing: border-box
    background: #fff
    margin-bottom: 10px
    .movie-img
      flex: 0 0 90px
    .movie-msg
      flex: 1
      display: flex
      flex-direction: column
      justify-content: space-around
      overflow: hidden
      .title
        font-size: $font-size-medium-x
        color: $color-title
      .director
        font-size: $font-size-small
      .casts
        font-size: $font-size-small
        no-wrap()
      .collect_count
        color: $color-title
        font-size: $font-size-small

  .movie-list
    padding-top: 10px
</style>
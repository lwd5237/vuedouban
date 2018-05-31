<template>
  <div class="rank-list">
    <ul>
      <li class="movie-item" v-for="(movie, index) in movies" @click="clickItem(movie)">
        <div class="rankIndex">
          <div class="rankIndexBox">{{page * 50 + (index + 1)}}</div>
        </div>
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
          </div>
        </div>
      </li>
    </ul>
    <loading :hasMore="hasMore" :movieType="movieType"></loading>
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
    hasMore: {
      type: Boolean,
      default: true
    },
    page: {
      type: Number,
      default: 0
    },
    movieType: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showScore: true
    }
  },
  methods: {
    clickItem(movie) {
      this.$emit('select', movie)
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
  .movie-item
    padding-bottom: 10px
    &:last-child
      padding-bottom: 0
    .rankIndex
      text-align: center
      .rankIndexBox
        width: 50px
        height: 76px
        margin: 0 auto
        line-height: 76px
        position: relative
        &:before
          position: relative
          content: ''
          display: block
          left: -60px
          top: 38px
          width: 60px
          height: 1px
          background: #ccc
        &:after
          position: absolute
          content: ''
          display: block
          right: -60px
          top: 38px
          width: 60px
          height: 1px
          background: #ccc
    .movie-content
      display: flex
      box-sizing: border-box
      background: #fff
      border: 1px solid #ccc
      padding: 10px
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
</style>
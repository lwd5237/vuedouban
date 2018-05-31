<template>
  <transition name="slide">
    <div class="search-result">
      <div class="header">
        <i class="icon-cheveron-left" @click="back"></i>
        <div class="title">
          <span>关于{{title}}的电影</span>          
        </div>
      </div>
      <div class="result-box">
        <scroll :data="movies" class="rank-list-box" :pullup="pullup" @scrollToEnd="loadMore">
          <search-list :movies="movies" :hasMore="hasMore" @select="inMovieDetail"></search-list>
        </scroll>
      </div>  
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getMovieTag} from 'api/search'
  import SearchList from 'components/search-list/search-list'
  import {createSearchList} from 'common/js/movieList'
  import Scroll from 'base/scroll/scroll'
  const COUNT = 10
  export default {
    data() {
      return {
        title: '',
        movies: [],
        hasMore: true,
        pullup: true,
        loadingFlag: true
      }
    },
    created() {
      this._getMovieTag()
    },
    methods: {
      back() {
        this.$router.back()
      },
      _getMovieTag() {
        this.title = this.$route.query.name
        getMovieTag(0, COUNT, this.title).then((res) => { 
          this.movies = createSearchList(res.subjects)
        })
      },
      inMovieDetail(movie) {
        this.$router.push({
          path: `/movie/${movie.id}`
        })
      },
      loadMore() {
        if (!this.loadingFlag) {
          return
        }
        this.loadingFlag = false
        if (this.hasMore) {
          getMovieTag(this.movies.length, COUNT, this.title).then((res) => { 
            this.movies = this.movies.concat(createSearchList(res.subjects))
            this._checkMore(res)
            this.loadingFlag = true
          })
        }
      },
      _checkMore(data) {
        let movies = data
        if (!this.movies.length || (movies.start + movies.count) >= movies.total) {
          this.hasMore = false
        }
      }
    },
    components: {
      SearchList,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search-result
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    .header
      position: relative
      padding: 15px 0
      border-bottom: 1px solid #ccc
      .icon-cheveron-left
        position: absolute
        left: 15px
        top: 11px
        font-size: 26px
        color: $color-theme
      .title
        margin: 0 45px
        span
          display: inline-block
          width: 100%
          font-size: 14px
          color: #333
          no-wrap()
    .result-box
      position: fixed
      top: 48px
      left: 0
      right: 0
      bottom: 0
      .rank-list-box
        height: 100%
        overflow: hidden

  .slide-enter-active, .slide-leave-active
    transition: opacity 0.3s
  .slide-enter, .slide-leave-to
    opacity: 0
</style>
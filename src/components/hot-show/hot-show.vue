<template>
  <div class="hot-show">
    <m-header @inSearch="inSearch"></m-header>
    <switches :switches="switches" :currentIndex="currentIndex" @switch="movieTab" class="movieTab"></switches>
    <div class="list-wrapper">
      <scroll class="list-scroll" 
              :data="movieHot" 
              :pullup="pullup" 
              @scrollToEnd="loadMore"
              v-show="currentIndex === 0"
              ref="movieHot"
              >
        <movie-list :movies="movieHot" :hasMore="hasMoreMovieHot" @select="inMovieDetail"></movie-list>
      </scroll>
      <scroll class="list-scroll"
              :data="movieComing" 
              :pullup="pullup" 
              @scrollToEnd="loadMore"
              v-show="currentIndex === 1"
              ref="movieComing"
              >
        <movie-list :needDate="needDate" :movies="movieComing" :hasMore="hasMoreMovieComing" @select="inMovieDetail"></movie-list>
      </scroll>
    </div>  
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import Switches from 'base/switches/switches'
import { getMovieHot, getMovieComing } from 'api/movie-show'
import { createMovieList } from 'common/js/movieList'
import MovieList from 'components/movie-list/movie-list'
import Scroll from 'base/scroll/scroll'

const EACH_COUNT = 10; // 每次请求数据的长度
export default {
  data () {
    return {
      switches: [
        {name: '正在热映'},
        {name: '即将上映'}
      ],
      currentIndex: 0,
      needDate: true,
      movieHot: [],
      movieComing: [],
      pullup: true,
      hasMoreMovieHot: true,
      hasMoreMovieComing: true
    }
  },
  created() {
    this.listHeight = []
    this.scrollMap = {}
    this._getMovieHot()
  },
  methods: {
    movieTab (index) {
      this.currentIndex = index
      if (this.currentIndex === 1 && !this.movieComing.length) {
        this._getMovieComing()
      }
      setTimeout(() => { // scroll组件计算高度，确保正确滚动
        this.$refs.movieComing.refresh();
        this.$refs.movieHot.refresh();
      }, 20)
    },
    inMovieDetail(movie) {
      this.$router.push({
        path: `/movie/${movie.id}`
      })
    },
    inSearch() {
      console.log(123)
      this.$router.push({
        path: '/search'
      })
    },
    _getMovieHot() {
      this.hasMoreMovieHot = true
      getMovieHot(0, EACH_COUNT).then((res) => {
        this.movieHot = createMovieList(res.subjects)
        this._checkMore(res)
      })
    },
    _checkMore(data) {
      const movies = data.subjects
      if (!movies.length || data.start + data.count >= data.total) {
        if (this.currentIndex === 0 ) {
          this.hasMoreMovieHot = false
        } else if (this.currentIndex === 1) {
          this.hasMoreMovieComing = false
        }
      }
    },
    getHeight(height) { // 保存子组件传入的高度列表
      this.listHeight = height;
    },
    getMap(map) { // 保存子组件传入的日期索引
      this.scrollMap = map;
    },
    _getMovieComing() {
      getMovieComing(0, EACH_COUNT).then((res) => {
        this.movieComing = createMovieList(res.subjects)
      })
    },
    loadMore() {
      if (this.hasMoreMovieHot && this.currentIndex === 0) {
        getMovieHot(this.movieHot.length, EACH_COUNT).then((res) => {
          this.movieHot = this.movieHot.concat(createMovieList(res.subjects))
          this._checkMore(res)
        })
      }
      if (this.hasMoreMovieComing && this.currentIndex === 1) {
        getMovieComing(this.movieComing.length, EACH_COUNT).then((res) => {
          this.movieComing = this.movieComing.concat(createMovieList(res.subjects))
          this._checkMore(res)
        })
      }
    }
  },
  components: {
    MHeader,
    Switches,
    MovieList,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .list-wrapper
    position: fixed
    top: 97px
    bottom: 60px
    left: 0
    right: 0
    padding: 0 15px
    z-index: -1
    .list-scroll
      height: 100%
      overflow: hidden
</style>
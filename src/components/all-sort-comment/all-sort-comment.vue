<template>
  <transition name="slide">
    <div class="AllSortComment">
      <div class="header">
        <div class="header-box">
          <i class="icon-cheveron-left back" @click="back"></i>
          <span class="title">{{title}}</span>
          <i class="icon-arrow-outline-up" @click="goTop"></i>
        </div>
      </div>
      <scroll :data="comments"
              class="list-scroll"
              :pullup="pullup"
              @scrollToEnd="loadMore"
              ref="sort"
      >
        <div>
          <div class="sort-box">
            <div class="count">全部短评{{count}}个</div>
          </div>
          <sort-comment :comments="comments" :hasMore="hasMoreSort"></sort-comment>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import SortComment from 'components/sort-comment/sort-comment'
import {getSort} from 'api/comments'
import {getMovieDetail} from 'api/movie-detail'
import Scroll from 'base/scroll/scroll'
const REVIEW_COUNT = 10
export default {
  data() {
    return {
      comments: [],
      movieId: 26683723,
      title: '',
      count: 0,
      pullup: true,
      hasMoreSort: true,
      loadingFlag: true
    }
  },
  created() {
    this.getQuery()
    this._getCount()
    this._getSort()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    goTop() {
      this.$refs.sort.scrollTo(0,0,500)
    },
    getQuery() {
      let routerQuery = this.$route.query.dataObj
      let routerQueryTitle = this.$route.query.name
      this.title = routerQueryTitle
      this.movieId = routerQuery
    },
    _getSort() {
      getSort(this.movieId, 0, REVIEW_COUNT).then((res) => {
        this.comments = res.comments
      })
    },
    _getCount() {
      getMovieDetail(this.movieId).then((res) => {
       this.count = res.comments_count
      })
    },
    loadMore() {
      if (!this.loadingFlag) {
        return
      }
      this.loadingFlag = false
      if (this.hasMoreSort) {
        getSort(this.movieId, this.comments.length, REVIEW_COUNT).then((res) => {
          this.comments = this.comments.concat(res.comments)
          this._checkMore(this.comments)
          this.loadingFlag = true
        })
      }
      console.log(1111)
    },
    _checkMore(data) {
      const sort = data
      if (!sort.length || (data.start + data.count >= data.total)) {
        console.log(sort.length)
        this.hasMoreSort = false
      }
    }
  },
  components: {
    SortComment,
    Scroll
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .AllSortComment
    position: absolute
    overflow: hidden
    z-index: 101
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    .list-scroll
      background: #fff
      height: 100%
    .header
      position: fixed
      background: #fff
      z-index: 102
      top: 0
      left: 0
      right: 0
      .header-box
        display: flex
        box-sizing: border-box
        padding: 0 15px 0 10px
        align-items: center
        height: 48px
        width: 100%
        border-bottom: 1px solid #ccc
        i
          flex: 0 0 20px
          font-size: 20px
          color: $color-theme
        .back
          font-size: 30px
        span
          flex: 1
          font-size: 16px
          padding-left: 20px
          color: #333
    .sort-box
      padding: 49px 15px 10px 15px
      .count
        padding: 8px 0
        font-size: 14px
        color: #777

    .slide-enter-active,.slide-leave-active
      transition: all 0.3s
    .slide-enter, .slide-leave-to
      transform: translate3d(100%, 0, 0)
</style>
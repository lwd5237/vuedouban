<template>
  <transition name="slide">
    <div class="AllMovieComment">
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
              ref="review"
      >
        <div>
          <div class="review-box">
            <div class="count">全部影评{{count}}个</div>
          </div>
          <movie-comment :comments="comments" :hasMore="hasMoreReview"></movie-comment>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import MovieComment from 'components/movie-comment/movie-comment'
import {getReview} from 'api/comments'
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
      hasMoreReview: true,
      loadingFlag: true
    }
  },
  created() {
    this.getQuery()
    this._getReview()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    goTop() {
      this.$refs.review.scrollTo(0, 0, 500)
    },
    getQuery() {
      let routerQuery = this.$route.query.dataObj
      let routerQueryTitle = this.$route.query.name
      this.title = routerQueryTitle
      this.movieId = routerQuery
      console.log(routerQuery)
    },
    _getReview() {
      getReview(this.movieId, 0, REVIEW_COUNT).then((res) => {
        this.count = res.total
        this.comments = res.reviews
        console.log(res)
        console.log(this.getWant)
      })
    },
    loadMore() {
      if (!this.loadingFlag) {
        return
      }
      this.loadingFlag = false
      if (this.hasMoreReview) {
        getReview(this.movieId, this.comments.length, REVIEW_COUNT).then((res) => {
          this.comments = this.comments.concat(res.reviews)
          this._checkMore(this.comments)
          this.loadingFlag = true
        })
      }
      console.log(1111)
    },
    _checkMore(data) {
      const review = data
      if (!review.length || (data.start + data.count >= data.total)) {
        console.log(review.length)
        this.hasMoreReview = false
      }
    }
  },
  components: {
    MovieComment,
    Scroll
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .AllMovieComment
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
    .review-box
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
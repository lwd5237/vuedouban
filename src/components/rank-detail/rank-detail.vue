<template>
  <transition name="slide">
    <div class="rank-detail">
      <div class="header">
        <i class="icon-cheveron-left back" @click="back"></i>
        <div class="title">{{movieType}}</div>
      </div>
      <div class="rank-box">
        <switches :currentIndex="currentIndex" :switches="switches" :smallFont="smallFont" @switch="selectItem" class="rankSwitch" v-show="movieType==='豆瓣TOP250'"></switches>
        <div class="rank-top" v-show="movieType == '豆瓣TOP250'">
            <scroll :data="top50" class="rank-list-box" :pullup="pullup" @scrollToEnd="loadMore"  v-show="currentIndex === 0">
              <rank-list :movies="top50" @select="inMovieDetail" :movieType="movieType1" :hasMore="hasMoreTop50"></rank-list>
            </scroll>
            <scroll :data="top100" class="rank-list-box" :pullup="pullup" @scrollToEnd="loadMore"  v-show="currentIndex === 1">
              <rank-list :movies="top100" :page="1" @select="inMovieDetail" :movieType="movieType1" :hasMore="hasMoreTop100"></rank-list>
            </scroll>
            <scroll :data="top150" class="rank-list-box" :pullup="pullup" @scrollToEnd="loadMore"  v-show="currentIndex === 2">
              <rank-list :movies="top150" :page="2" @select="inMovieDetail" :movieType="movieType1" :hasMore="hasMoreTop150"></rank-list>
            </scroll>
            <scroll :data="top200" class="rank-list-box" :pullup="pullup" @scrollToEnd="loadMore"  v-show="currentIndex === 3">
              <rank-list :movies="top200" :page="3" @select="inMovieDetail" :movieType="movieType1" :hasMore="hasMoreTop200"></rank-list>
            </scroll>
            <scroll :data="top250" class="rank-list-box" :pullup="pullup" @scrollToEnd="loadMore"  v-show="currentIndex === 4">
              <rank-list :movies="top250" :page="4" @select="inMovieDetail" :movieType="movieType1" :hasMore="hasMoreTop250"></rank-list>
            </scroll>
        </div>
        <div class="rank-other" v-show="otherData.length">
          <scroll :data="otherData" class="rank-other-box">
              <rank-list :movies="otherData" @select="inMovieDetail" :hasMore="hasMore"></rank-list>
            </scroll>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Switches from 'base/switches/switches'
  import {getMovieDetail} from 'api/movie-detail'
  import {attachImageUrl} from 'common/js/movieList'
  import Scroll from 'base/scroll/scroll'
  import Star from 'base/star/star'
  import {mapMutations, mapGetters} from 'vuex'
  import {getTop250, getWeek, getNew, getUsa} from 'api/movie-among'
  import RankList from 'components/rank-list/rank-list'
  import {createRankList} from 'common/js/movieList'
  const ONE_PAGE_COUNT = 10
  export default {
    data() {
      return {
        currentIndex: 0,
        switches: [
          {name: '1-50'},
          {name: '51-100'},
          {name: '101-150'},
          {name: '151-200'},
          {name: '201-250'}
        ],
        smallFont: true,
        movieType: '',
        top50: [],
        top100: [],
        top150: [],
        top200: [],
        top250: [],
        otherType: [],
        pullup: true,
        hasMore: false,
        hasMoreTop50: true,
        hasMoreTop100: true,
        hasMoreTop150: true,
        hasMoreTop200: true,
        hasMoreTop250: true,
        COMPLETE: true,
        otherData: [],
        movieType1: true
      }
    },
    created() {
      this.getTitle()
      this._getMovieType()
    },
    methods: {
      back() {
        this.$router.back()
      },
      inMovieDetail(movie) {
        this.$router.push({
          path: `/movie/${movie.id}`
        })
      },
      selectItem(index) {
        this.currentIndex = index
        if (this.currentIndex === 1 && !this.top100.length) {
          getTop250(51, ONE_PAGE_COUNT).then((res) => {
             this.top100 = createRankList(res.subjects)
          })
        } else if (this.currentIndex === 2 && !this.top150.length) {
          getTop250(101, ONE_PAGE_COUNT).then((res) => {
             this.top150 = createRankList(res.subjects)
          })
        } else if (this.currentIndex === 3 && !this.top200.length) {
          getTop250(151, ONE_PAGE_COUNT).then((res) => {
             this.top200 = createRankList(res.subjects)
          })
        } else if (this.currentIndex === 4 && !this.top250.length) {
          getTop250(201, ONE_PAGE_COUNT).then((res) => {
             this.top250 = createRankList(res.subjects)
          })
        }
      },
      getTitle() {
        this.movieType = this.$route.query.name
      },
      _getMovieType() {
        if (this.movieType === '豆瓣TOP250') {
          getTop250(0, ONE_PAGE_COUNT).then((res) => {
             this.top50 = createRankList(res.subjects)
          })
        } else if (this.movieType === '本周口碑榜'){
          getWeek().then((res) => {
            this.otherData = createRankList(res.subjects)
            console.log(this.otherData)
          })
        } else if (this.movieType === '新片榜') {
          getNew().then((res) => {
            this.otherData = createRankList(res.subjects)
            console.log(this.otherData)
          })
        } else if (this.movieType === '北美票房榜') {
          getUsa().then((res) => {
            this.otherData = createRankList(res.subjects)
            console.log(this.otherData)
          })
        }
      },
      loadMore() {
        if (this.hasMoreTop50 && this.currentIndex === 0 && this.COMPLETE) {
          this.COMPLETE = false
          getTop250(this.top50.length, ONE_PAGE_COUNT).then((res) => {
             this.top50 = this.top50.concat(createRankList(res.subjects))
             this._checkMore(res)
             this.COMPLETE = true
          })
        } else if (this.hasMoreTop100 && this.currentIndex === 1 && this.COMPLETE) {
          this.COMPLETE = false
          getTop250(this.top100.length, ONE_PAGE_COUNT).then((res) => {
             this.top100 = this.top100.concat(createRankList(res.subjects))
             this._checkMore(res)
             this.COMPLETE = true
          })
        } else if (this.hasMoreTop150 && this.currentIndex === 2 && this.COMPLETE) {
          this.COMPLETE = false
          getTop250(this.top150.length, ONE_PAGE_COUNT).then((res) => {
             this.top150 = this.top150.concat(createRankList(res.subjects))
             this._checkMore(res)
             this.COMPLETE = true
          })
        } else if (this.hasMoreTop200 && this.currentIndex === 3 && this.COMPLETE) {
          this.COMPLETE = false
          getTop250(this.top200.length, ONE_PAGE_COUNT).then((res) => {
             this.top200 = this.top200.concat(createRankList(res.subjects))
             this._checkMore(res)
             this.COMPLETE = true
          })
        } else if (this.hasMoreTop250 && this.currentIndex === 4 && this.COMPLETE) {
          this.COMPLETE = false
          getTop250(this.top250.length, ONE_PAGE_COUNT).then((res) => {
             this.top250 = this.top250.concat(createRankList(res.subjects))
             this._checkMore(res)
             this.COMPLETE = true
          })
        }
      },
      _checkMore(data) {
        const movies = data.subjects
        console.log(this.top50.length)
          if (this.currentIndex === 0 && this.top50.length >= 50) {
            this.hasMoreTop50 = false
          } else if (this.currentIndex === 1 && this.top100.length >= 50) {
            this.hasMoreTop100 = false
          }  else if (this.currentIndex === 2 && this.top150.length >= 50) {
            this.hasMoreTop150 = false
          } else if (this.currentIndex === 3 && this.top200.length >= 50) {
            this.hasMoreTop200 = false
          } else if (this.currentIndex === 4 && this.top250.length >= 50) {
            this.hasMoreTop250 = false
          }
      }
    },
    components: {
      Switches,
      RankList,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank-detail
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    box-sizing: border-box
    .header
      display: flex
      padding: 10px
      background: #fff
      align-items: center
      border-bottom: 1px solid #ccc
      i
        width: 30px
        font-size: 24px
      .title
        flex: 1
        color: #333
    .rank-box
      z-index: -1
      margin: 0 10px
      position: fixed
      top: 45px
      left: 0
      right: 0
      bottom: 0
      .rank-top
        height: 100%
        .rankSwitch
          z-index: 201
        .rank-list-box
          height: 100%
          overflow: hidden
      .rank-other
        height: 100%
        .rank-other-box
          height: 100%
          margin: 0 10px
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
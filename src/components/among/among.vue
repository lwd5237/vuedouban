<template>
  <div class="among">
    <div v-show="this.$route.path === '/among'">
      <m-header @inSearch="inSearch"></m-header>
      <div class="among-box">
        <scroll :date="this.usa" class="list-scroll">
          <ul>
            <h1>精选榜单</h1>
            <li class="among-msg among-a" @click="clickRank">
              <div class="title">
                <h2>{{topTitle}}</h2>
                <span>8分以上好电影</span>
              </div>
              <div class="among-img" ref="top250">
                <img v-lazy="top250[0]" alt="">
                <img v-lazy="top250[1]" alt="">
                <img v-lazy="top250[2]" alt="">
              </div>
            </li>
            <li class="among-msg among-b"  @click="clickWeek">
              <div class="title">
                <h2>{{weekTitle}}</h2>
                <span>{{ weekDate }}</span>
              </div>
              <div class="among-img" ref="week">
                <img v-lazy="item" v-for="item in week" alt="">
              </div>
            </li>
            <li class="among-msg among-c" @click="clickNew">
              <div class="title">
                <h2>{{newMovieTitle}}</h2>
                <span>{{ weekDate }}</span>
              </div>
              <div class="among-img" ref="new">
                <img v-lazy="item" v-for="item in newMovie" alt="">
              </div>
            </li>
            <li class="among-msg among-d" @click="clickUsa">
              <div class="title">
                <h2>{{usaTitle}}</h2>
                <span>票房最高排名</span>
              </div>
              <div class="among-img" ref="usa">
                <img v-lazy="item" v-for="item in usa" alt="">
              </div>
            </li>
          </ul>
        </scroll>
      </div>      
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import {getWeekDate} from 'common/js/date'
import {getTop250, getWeek, getNew, getUsa} from 'api/movie-among'
import {attachImageUrl} from 'common/js/util'
import Scroll from 'base/scroll/scroll'

export default {
  data() {
    return {
      weekDate: '',
      top250: [],
      week: [],
      newMovie: [],
      usa: [],
      topTitle: '豆瓣TOP250',
      weekTitle: '本周口碑榜',
      newMovieTitle: '新片榜',
      usaTitle: '北美票房榜'
    }
  },
  created() {
    this._getWeekDate()
    this._getMovieImg()
  },
  methods: {
    _getWeekDate() {
      this.weekDate = getWeekDate()
    },
    inSearch() {
      console.log(123)
      this.$router.push({
        path: '/search'
      })
    },
    _getMovieImg() {
      getTop250(0, 3).then((res) => {
        for ( let i=0; i < 3; i++) {
         this.top250.push(attachImageUrl(res.subjects[i].images.large))
        }
      })
      getWeek().then((res) => {
        for ( let i=0; i < 3; i++) {
         this.week.push(attachImageUrl(res.subjects[i].subject.images.large))
        }
      })
      getNew().then((res) => {
        for ( let i=0; i < 3; i++) {
         this.newMovie.push(attachImageUrl(res.subjects[i].images.large))
        }
      })
      getUsa().then((res) => {
        for ( let i=0; i < 3; i++) {
         this.usa.push(attachImageUrl(res.subjects[i].subject.images.large))
        }
      })
    },
    clickRank() {
      this.$router.push({
        path: '/among/rank-detail',
        query: {
          name: `${this.topTitle}`
        }
      })
    },
    clickWeek() {
      this.$router.push({
        path: '/among/rank-detail',
        query: {
          name: `${this.weekTitle}`
        }
      })
    },
    clickNew() {
      this.$router.push({
        path: '/among/rank-detail',
        query: {
          name: `${this.newMovieTitle}`
        }
      })
    },
    clickUsa() {
      this.$router.push({
        path: '/among/rank-detail',
        query: {
          name: `${this.usaTitle}`
        }
      })
    }
  },
  components: {
    MHeader,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .among
    position: relative
    .among-box
      position: fixed
      padding: 10px 15px
      box-sizing: border-box
      top: 50px
      bottom: 60px
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        h1
          font-size: $font-size-medium-x
        .among-msg
          display: flex
          align-items: center
          height: 114px
          border-radius: 5px
          margin-top: 10px
          .title
            flex: 0 0 138px
            text-align: center
            color: #fff
            h2
              font-size: $font-size-large
              font-weight: bold
              padding-bottom: 3px
          .among-img
            max-width: 207px
            margin: 0 auto
            flex: 1
            height: 114px
            display: flex
            align-items: center
            justify-content: center
            img
              width: 28%
              &:nth-child(2)
                width: 34%
        .among-a
          background: url("./among_a.png") repeat-x
        .among-b
          background: url("./among_b.png") repeat-x
        .among-c
          background: url("./among_c.png") repeat-x
        .among-d
          background: url("./among_d.png") repeat-x
</style>
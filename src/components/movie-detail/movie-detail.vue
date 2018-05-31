<template>
  <transition name="slide">
    <div class="movie-detail">
      <div class="header">
        <span class="back"><i class="icon-cheveron-left" @click="back"></i></span>
        <span><i class="icon-video-camera"></i> 电影</span>
        <span><i></i></span>
      </div>
      <scroll class="list-wrapper"
              v-show="this.$route.path === '/movie/'+ movieDetail.id"
              :data="movieDetail.trailers"
              ref="scroll"
              >
        <div>
          <div class="movie-img">
            <img :src="movieDetail.images" style="width:187px;height:265px"alt="">
          </div>
          <div class="movie-box">
            <div class="movie-msg">
              <h2>{{movieDetail.title}}</h2>
              <div>{{movieDetail.genres}}</div>
              <div>原名: {{movieDetail.original_title}}</div>
              <div>上映时间: {{movieDetail.mainland_pubdate}}</div>
              <div>片长: {{movieDetail.durations}}</div>
            </div>
            <div class="start-msg">
              <div>豆瓣评分</div>
              <span>{{movieDetail.average}}</span>
              <div><star :size="24" :score="movieDetail.average" :showScore="showScore"></star></div>
              <div>{{movieDetail.ratings_count}}人</div>
            </div>
          </div>
          <div class="btn-box">
            <div class="wantBtn" :class="{'currentBtn': this.onselect}" ref="want" @click="_want"></div>
            <div class="watchedBtn" :class="{'currentBtn': this.onselecttwo}" @click="_watched" ref="watched">看过 ☆☆☆☆☆</div>
          </div>
          <div class="summary">
            <h2>剧情简介</h2>
            <p>{{movieDetail.summary}}</p>
          </div>
          <div class="movie-people" v-if="movieDetail">
            <h2>影人</h2>
            <scroll class="scrollBox" :scrollX="scrollX" :scrollY="false" ref="scrollBox">
                <div class="people-box" ref="peopleBox">
                  <ul>
                    <li v-for="item in movieDetail.casts" class="people-msg">
                        <img :src="item.avatars" style="width:90px;height:120px" alt="">
                          <p>{{item.name}}</p>
                          <p class="direc" v-show="item.directors">导演</p>       
                    </li>              
                  </ul>              
                </div>
            </scroll>
          </div>
          <switches :switches="switches" :currentIndex="currentIndex" @switch="selectItem"></switches>
          <div class="sortCommentBox" v-show="currentIndex === 0">
            <sort-comment :count="movieDetail.comments_count"
                          :id="movieDetail.id"
                          :comments="movieDetail.popular_comments"
                          @select="inSort"
                          ></sort-comment>
          </div>
          <div class="movieCommentBox" v-show="currentIndex === 1">
            <movie-comment :count="movieDetail.reviews_count" 
                           :id="movieDetail.id"
                           :comments="movieDetail.popular_reviews"
                           @select="inReview"
                           ></movie-comment>
          </div>
        </div>
      </scroll>
      <router-view></router-view>
      <loading class="loading" :fontSize="true" v-show="!movieId"></loading>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Switches from 'base/switches/switches'
  import SortComment from 'components/sort-comment/sort-comment'
  import MovieComment from 'components/movie-comment/movie-comment'
  import {getMovieDetail} from 'api/movie-detail'
  import {attachImageUrl} from 'common/js/movieList'
  import Scroll from 'base/scroll/scroll'
  import Star from 'base/star/star'
  import Loading from 'base/loading/loading'
  import {mapMutations, mapGetters, mapActions} from 'vuex'
  export default {
    name: 'movieDetail',
    data() {
      return {
        currentIndex: 0,
        switches: [
          {name: '短评'},
          {name: '影评'}
        ],
        movieDetail: [],
        movieId: 0,
        movieTitle: '',
        showScore: false,
        scrollX: true,
        onselect: false,
        onselecttwo: false
      }
    },
    created() {
      this._getMovieDetail()
    },
    computed: {
      ...mapGetters([
        'want',
        'watched'
      ])
    },
    methods: {
      _want() {
        let index = -1
        this.saveWant(this.movieId)
        this.want.forEach((el, i) => {
          if (el === this.movieId) {
            index = i
          }
        })
        if (index > -1) {
          console.log(1)
          this.onselect = true
          this.$refs.want.innerHTML = '已想看'
        } else {
          console.log(2)
          this.onselect = false
          this.$refs.want.innerHTML = '想看'        
        }
        console.log(this.want)
      },
      back() {
        this.$router.back()
      },
      _watched() {
        let index = -1
        this.saveWatched(this.movieId)
        this.watched.forEach((el, i) => {
          if (el === this.movieId) {
            index = i
          }
        })
        if (index > -1) {
          console.log(1)
          this.onselecttwo = true
          this.$refs.watched.innerHTML = '已看过'
        } else {
          console.log(2)
          this.onselecttwo = false
          this.$refs.watched.innerHTML = '看过 ☆☆☆☆☆'        
        }        
      },
      _getCasts(res) {
        let arr = []
        res.casts.forEach((el, i) => {
          if (el.avatars) {
            arr.push(el)
          }
        })
        let sub = res.directors[0]
        if (sub.avatars) {
          let b = 'directors'
          sub[b] = true
          arr.unshift(sub)         
        }
        if (arr.length > 1) {
          for(let i=0; i < arr.length; i++) {
            if (arr[0].name === arr[1].name) {
              arr.splice(1, 1)
            }
          }        
        }
        return arr
      },
      selectItem(index) {
        this.currentIndex = index
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      },
      _getMovieDetail() {
        if (!this.want.length) {
          this.saveWant('')
        }
        if (!this.watched.length) {
          this.saveWatched('')
        }
        setTimeout(() => {
          let movieId = this.$route.path.slice(7)
          getMovieDetail(movieId).then((res) => {
            res.images = attachImageUrl(res.images.large)
            res.genres = this.resGenres(res.genres)
            res.durations = res.durations[0]
            res.average = res.rating.average
            res.popular_reviews = res.popular_reviews.slice(0, 4)
            res.casts = this._getCasts(res)
            console.log(res.casts)
            for (let i=0; i < res.casts.length; i++) {
              res.casts[i].avatars = attachImageUrl(res.casts[i].avatars.large)
            }
            this.movieId = res.id
            this.movieTitle = res.title
            this.movieDetail = res
            console.log(res)
          })
        }, 20)

      },
      resGenres(data) {
        let newData = ''
        for (let i = 0; i < data.length; i++) {
          if (i < (data.length-1)) {
            newData += data[i] + '/'
          } else {
            newData += data[i]
          }
        }
        return newData
      },
      inReview() {
        this.$router.push({
          path: `/movie/${this.movieId}/review/${this.movieId}`,
          query: {
            name: this.movieTitle,
            dataObj: this.movieId
          }
        })
      },
      inSort() {
        this.$router.push({
          path: `/movie/${this.movieId}/sort/${this.movieId}`,
          query: {
            name: this.movieTitle,
            dataObj: this.movieId
          }
        })
      },
      ...mapActions([
        'saveWant',
        'saveWatched'
      ])
    },
    watch: {
      movieDetail() {
        const movieLen = this.movieDetail.casts.length
        this.$refs.peopleBox.style.width = (movieLen * 90 + (movieLen - 1) * 10) + 'px'
        this.$nextTick(() => {
          this.$refs.scrollBox.refresh()
        })
      },
      movieId() {
        let index = -1
        console.log(this.want)
        if (this.want) {
          this.want.forEach((el, i) => {
            if (el === this.movieId) {
              index = i
            }
          })
        }
        if (index > -1) {
          this.onselect = true
          this.$refs.want.innerHTML = '已想看'
        } else {
          this.onselect = false
          this.$refs.want.innerHTML = '想看'
        }

        let index1 = -1
        if (this.watched) {
          this.watched.forEach((el, i) => {
            if (el === this.movieId) {
              index1 = i
            }
          })
        }
        if (index1 > -1) {
          this.onselecttwo = true
          this.$refs.watched.innerHTML = '已看过'
        } else {
          this.onselecttwo = false
          this.$refs.watched.innerHTML = '看过 ☆☆☆☆☆'
        }
      }
    },
    components: {
      Switches,
      SortComment,
      MovieComment,
      Scroll,
      Star,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .movie-detail
    position: fixed
    top: 0
    bottom: 0
    right: 0
    left: 0
    z-index: 201
    background: #555
    .header
      background: rgba(0, 0, 0, 0.3)
      width: 100%
      height: 40px
      z-index: 100
      box-sizing: border-box
      padding: 10px 10px
      position: fixed
      top: 0
      text-align: center
      .back
        position: absolute
        left: 5px
        font-size: $font-size-large-x
      span
        font-size: $font-size-large
        color: #fff
    .list-wrapper
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: #fff
      .movie-img
        width: 100%
        background: #555
        text-align: center
        padding: 50px 0 20px 0
      .movie-box
        padding: 10px 15px
        display: flex
        background: #fff
        .movie-msg
          flex: 1
          h2
            font-size: $font-size-large-x
            color: #333
            margin-bottom: 5px
          div
            font-size: $font-size-small
            line-height: 20px
        .start-msg
          flex: 0 0 84px
          box-sizing: border-box
          height: 90px
          border: 1px solid #ccc
          border-radius: 5px
          text-align: center
          padding: 15px 0
          div
            font-size: $font-size-small
            line-height: 14px
          span
            font-size: $font-size-large
            color: #333
      .btn-box
        padding: 15px
        position: relative
        background: #fff
        text-align: center
        padding-bottom: 30px
        border-bottom: 1px solid #ccc
        div
          height: 35px
          line-height: 35px
          border: 1px solid $color-theme
          border-radius: 5px
          color: $color-theme
        .wantBtn
          position: absolute
          width: 30%
          top: 15px
          left: 15px
          margin-right: 10%
          &.currentBtn
            border: 1px solid rgb(254, 155, 9)
            color: rgb(254, 155, 9)
        .watchedBtn
          width: 60%
          margin-left: 40%
          &.currentBtn
            border: 1px solid rgb(254, 155, 9)
            color: rgb(254, 155, 9)
      .summary
        display: inline-block
        box-sizing: border-box
        padding: 10px 15px
        background: #fff
        font-size: 0
        h2
          font-size: $font-size-small
        p
          text-indent: 2em
          font-size: 14px
          padding-top: 10px
          line-height: 20px
          letter-spacing: 2px
          color: #333;
          text-align: justify
          text-justify: inter-ideograph
      .movie-people
        padding: 15px
        width: 100%
        background: #fff
        box-sizing: border-box
        .scrollBox
          width: 100%
          overflow: hidden
          .people-box
            margin-top: 10px
            display: inline-block
            white-space: nowrap
            width: 800px
            .people-msg
              display: inline-block
              vertical-align: top
              white-space: normal
              width: 90px
              margin-right: 10px
              &:last-child
                margin-right: 0
              p
                text-align: center
                padding: 5px 0
                no-wrap()
              .direc
                color: #333
                font-size: 12px
                padding: 0
    .loading
      position: absolute
      top: 50%
      margin-top: -100px
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
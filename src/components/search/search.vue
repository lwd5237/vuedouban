<template>
  <transition name="slide">
    <div class="search">
      <div class="search-header">
          <i class="icon-search"></i>
          <div class="search-box">
            <input class="search-input" v-model="query" type="text" v-on:input="getSearchRes" placeholder="搜索电影/影人">
          </div>  
          <div class="cancel" @click="back">取消</div>
      </div>
      <scroll class="list-scroll">
        <div v-show="!query">
          <div class="search-tip">
            <div class="tip-box">
              <span class="spanTag" v-for="item in doubanTag" @click="inResult(item)">{{item}}</span>
            </div>
            <div class="tip-box">
              <span class="spanTag" v-for="item in movieTag" @click="inResult(item)">{{item}}</span>
            </div>
            <div class="tip-box">
              <span class="spanTag" v-for="item in contryTag" @click="inResult(item)">{{item}}</span>
            </div>
          </div>
          <div class="search-history">
            <div class="his-header">
              <h2>搜索历史</h2>
              <i class="icon-bin" @click="popUp"></i>
            </div>
            <div class="his-box">
              <ul>
                <li v-for="(item, index) in historys" class="his-list" >
                  <div class="his-name">
                    <span>{{item}}</span>                
                  </div>
                  <i class="icon-cross" @click="deleteHistory(item)"></i>
                </li>
              </ul>
              <div v-show="!historys.length" class="tip-msg">暂无搜素历史记录:)</div>
            </div>
          </div>        
        </div>
      </scroll>
      <div v-show="query" class="search-res">
        <scroll :data="movies" 
                class="scroll-content" 
                :pullup="pullup" 
                @scrollToEnd="loadMore" 
                ref="scrollContent" 
                :listenScroll="listenScroll"
                @scroll="scroll"
                :probeType="probeType"
        >
          <search-list :movies="movies" :hasMore="hasMore" @select="inMovieDetail"></search-list>
        </scroll>
      </div>
      <div v-show="popup" class="popup">
        <div class="popup-content">
          <div class="popup-title">是否清空所有搜索历史</div>
          <div class="popup-btn">
            <span @click="cancel">取消</span>
            <span @click="empty">清空</span>
          </div>
        </div>
      </div>
      <div class="backTop" v-show="this.scrollY < -300" @click="backTop">
        <span>回到顶部</span>
      </div>
      <router-view></router-view>
    </div>   
  </transition>
</template>

<script type="text/ecmascript-6">
  import SearchList from 'components/search-list/search-list'
  import {getMovieQuery} from 'api/search'
  import {createSearchList} from 'common/js/movieList'
  import Scroll from 'base/scroll/scroll'
  import {mapGetters, mapActions, mapState} from 'vuex'
  const COUNT = 10
  export default {
    data() {
      return {
        doubanTag: ['经典', '豆瓣高分', '冷门佳片'],
        movieTag: ['剧情', '爱情', '喜剧', '科幻', '动作', '嫌疑', '治愈', '青春', '文艺'],
        contryTag: ['日本', '韩国'],
        history: ['你好', '明天', 'heili', 'sljdfl', 'jsdfl', 'jsffjld'],
        query: '',
        movies: [],
        hasMore: true,
        pullup: true,
        loadingFlag: true,
        timer: false,
        popup: false,
        scrollY: -1
      }
    },
    computed: {
      ...mapGetters([
        'historys'
      ])
    },
    created() {
      this._initHis()
      this.listenScroll = true
      this.probeType = 3
    },
    methods: {
      back() {
        this.$router.back()
        this.query = ''
      },
      backTop() {
        this.$refs.scrollContent.scrollTo(0, 0, 500)
      },
      _initHis() {
        if(!this.historys.length) {
          this.saveHistory('')
        }
      },
      inResult(item) {
        let tagName = item
        this.$router.push({
          path: '/search/search-result',
          query: {
            name : tagName
          }
        })
      },
      scroll(pos) {
        this.scrollY = pos.y
        console.log(pos.y)
      },
      inMovieDetail(movie) {
        this.saveHistory(this.query)        
        this.$router.push({
          path: `/movie/${movie.id}`
        })
      },
      _checkMore(data) {
        let movies = data
        if (!this.movies || (movies.start + movies.count) >= movies.total) {
          this.hasMore = false
        }
      },
      loadMore() {
        if (!this.loadingFlag) {
          return
        }
        this.loadingFlag = false
        setTimeout(() => {
          if(this.hasMore) {
            getMovieQuery(this.movies.length, COUNT, this.query).then((res) => {
              this.movies = this.movies.concat(createSearchList(res.subjects))
              this._checkMore(res)
              this.loadingFlag = true
            })
          }        
        }, 300)
      },
      getSearchRes() {
        if (this.query === '') {
          this.movies = []
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          if (this.query) {
            getMovieQuery(0, COUNT, this.query).then((res) => {
              console.log(res)
              this.movies = createSearchList(res.subjects)
            })
          }
        }, 300)
      },
      popUp() {
        this.popup = true
      },
      cancel() {
        this.popup = false
      },
      empty() {
        this.popup = false
        this.emptyHistory()
      },
      clearHis(index) {
        this.history.splice(index, 1)
        console.log(this.history)
      },
      ...mapActions([
        'saveHistory',
        'emptyHistory',
        'deleteHistory'
      ])
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

  .search
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 2
    background: #fff
    .search-header
      position: relative
      width: 100%
      height: 30px
      padding: 10px 0
      background: $color-theme
      .icon-search
        font-size: 14px
        position: absolute
        top: 18px
        left: 38px
      .search-box
        margin-left: 25px
        margin-right: 62px
        .search-input
          box-sizing: border-box
          font-size: 14px
          width: 100%
          padding: 0 30px
          height: 30px
          border-radius: 5px
      .cancel
        position: absolute
        height: 30px
        line-height: 30px
        padding: 0 15px
        top: 10px
        right: 0
        color: #fff
    .list-scroll
      position: fixed
      top: 50px
      bottom: 0
      width: 100%
      overflow: hidden
    .search-tip
      margin: 0 15px
      .tip-box
        padding: 20px 0
        border-bottom: 1px solid #ccc
        .spanTag
          display: inline-block
          margin-bottom: 15px
          border-radius: 5px
          border: 1px solid $color-theme
          color: $color-theme
          padding: 10px 15px
          margin-right: 15px
          font-size: 12px
    .search-history
      .his-header
        position: relative
        padding: 15px
        h2
          font-size: 18px
          color: $color-theme
        .icon-bin
          position: absolute
          top: 15px
          right: 15px
          color: $color-theme
      .his-box
        .his-list
          position: relative
          padding: 0 15px
          .his-name
            margin-right: 50px
            no-wrap()
          .icon-cross
            position: absolute
            top: 0
            right: 17px
            font-size: 12px
        .tip-msg
          text-align: center
          padding: 10px
    .search-res
      position: fixed
      top: 50px
      left: 0
      right: 0
      bottom: 0
      .scroll-content
        height: 100%
        overflow: hidden
    .popup
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: rgba(0, 0, 0, 0.3)
      display: flex
      justify-content: center
      align-items: center
      .popup-content
        width: 240px
        height: 100px
        background: #fff
        border-radius: 10px
        .popup-title
          text-align: center
          height: 60px
          line-height: 60px
          color: $color-theme
        .popup-btn
          text-align: center
          height: 40px
          line-height: 40px
          span
            display: block
            float: left
            width: 50%
            color: #333
    .backTop
      position: fixed
      right: 0
      top: 75%
      background: $color-theme
      padding: 3px
      color: #fff

  .slide-enter-active, .slide-leave-active
    transition: opacity 0.3s
  .slide-enter, .slide-leave-to
    opacity: 0
</style>
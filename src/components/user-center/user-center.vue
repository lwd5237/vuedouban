<template>
  <div class="user-center">
    <div class="user-center-header">
      <div class="user">
        <div class="user-img">
          <img src="./user_head_picture.png" alt="">
        </div>
        <div class="name">
          <span>一叶知秋</span>
        </div>
      </div>      
    </div>
    <div class="user-center-box">
      <switches :switches="switches" :currentIndex="currentIndex" @switch="switchTab"></switches>
      <div class="user-msg">
        <scroll v-show="currentIndex === 0" class="scroll-list" ref='scrollWant' :data="wantData">
          <movie-list :movies="wantData" :canShow="false" :hasMore="hasMore" @select="inMovieDetail"></movie-list>
        </scroll>
        <scroll v-show="currentIndex === 1" class="scroll-list" ref='scrollWatched' :data="watchedData">
          <movie-list :movies="watchedData" :canShow="false" :hasMore="hasMore" @select="inMovieDetail"></movie-list>
        </scroll>        
      </div>     
    </div>  
  </div>
</template>

<script type="text/ecmascript-6">
import Switches from 'base/switches/switches'
import MovieList from 'components/movie-list/movie-list'
import {createRankList, createMovieList1} from 'common/js/movieList'
import {getMovieDetail} from 'api/movie-detail'
import {mapGetters, mapActions} from 'vuex'
import Scroll from 'base/scroll/scroll'
export default {
  name: 'userCenter1',
  data() {
    return {
      switches: [
        {name: '想看'},
        {name: '看过'},
        {name: '影人'}
      ],
      currentIndex: 0,
      testId: [],
      wantData: [],
      watchedData: [],
      hasMore: false
    }
  },
  computed: {
    ...mapGetters([
      'want',
      'watched'
    ])
  },
  created() {
    this._getMovieDetail()
  },
  methods: {
    inMovieDetail(movie) {
      this.$router.push({
        path: `/movie/${movie.id}`
      })
    },
    switchTab(index) {
      this.currentIndex = index
      if (!this.watchedData.length && this.currentIndex === 1) {
        for (let i = 0; i < this.watched.length; i++) {
          getMovieDetail(this.watched[i]).then((res) => {
            res = createMovieList1(res)
            this.watchedData = this.watchedData.concat(res)
          }).catch((err) => {
            console.log(err)
          })
        }
      }
      setTimeout(() => { // scroll组件计算高度，确保正确滚动
        this.$refs.scrollWant.refresh()
        this.$refs.scrollWatched.refresh()
      }, 20)
    },
    _getMovieDetail() {
      if (!this.want.length) {
        this.saveWant('')
      }
      if (!this.watched.length) {
        this.saveWatched('')
      }
      for (let i = 0; i < this.want.length; i++) {
        getMovieDetail(this.want[i]).then((res) => {
          res = createMovieList1(res)
          this.wantData = this.wantData.concat(res)
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    ...mapActions([
      'saveWant',
      'saveWatched'
    ])
  },
  components: {
    Switches,
    MovieList,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .user-center-header
    position: fixed
    top: 0
    left: 0
    right: 0
    overflow: hidden
    background: url('./user_bg.png')
    .user
      width: 100%
      height: 134px
      padding: 0 20px
      display: flex
      align-items: center
      .user-img
        flex: 0 0 80px
        img
          width: 60px
          height: 60px
          border-radius: 50%
      .name
        flex: 1
        color: #fff
  .user-center-box
    margin-top: 134px
    .user-msg
      position: fixed
      top: 181px
      bottom: 60px
      width: 100%
      padding: 10px 15px 0 15px
      box-sizing: border-box
      .scroll-list
        height: 100%
        overflow: hidden
</style>
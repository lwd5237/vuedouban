<template>
  <div class="search-list">
    <ul>
      <li class="movie-item" v-for="(movie, index) in movies" @click="clickItem(movie)">
        <div class="movie-content">
          <div class="movie-img">
            <img v-lazy="movie.image" style="width:50px;height:70px;"alt="">
          </div>
          <div class="movie-msg">
            <div class="title">{{movie.title}}</div>
            <div class="rating">
              <div>{{movie.rating+' / '+movie.pubdates}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <loading :hasMore="hasMore"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
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
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .search-list
    padding: 10px
    .movie-item
      padding-bottom: 5px
      &:last-child
        padding-bottom: 0      
      .movie-content
        display: flex
        .movie-img
          width: 60px
        .movie-msg
          padding-top: 10px
          flex: 1
          width: 0
          .title
            no-wrap()
            padding-bottom: 5px
            font-size: 14px
            color: #333
          .rating
            font-size: 12px
    
</style>
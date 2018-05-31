import Vue from 'vue'
import Router from 'vue-router'
import HotShow from 'components/hot-show/hot-show'
import Among from 'components/among/among'
import UserCenter from 'components/user-center/user-center'
import MovieDetail from 'components/movie-detail/movie-detail'
import AllSortComment from 'components/all-sort-comment/all-sort-comment'
import AllMovieComment from 'components/all-movie-comment/all-movie-comment'
import RankDetail from 'components/rank-detail/rank-detail'
import Search from 'components/search/search'
import SearchResult from 'components/search-result/search-result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/hot-show'
    },
    {
      path: '/hot-show',
      component: HotShow
    },
    {
      path: '/among',
      component: Among,
      children: [
        {
          path: 'rank-detail',
          component: RankDetail
        }
      ]
    },
    {
      path: '/user-center',
      component: UserCenter
    },
    {
      path: '/movie/:movieId',
      component: MovieDetail,
      children: [
        {
          path: 'sort/:sortId',
          component: AllSortComment
        },
        {
          path: 'review/:reviewId',
          component: AllMovieComment
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: 'search-result',
          component: SearchResult
        }
      ]
    }
  ]
})

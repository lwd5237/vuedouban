import * as types from './mutation-types'
const mutations = {
  [types.SET_WANT](state, want) {
    state.want = want
  },
  [types.SET_WATCHED](state, watched) {
    state.watched = watched
  },
  [types.SET_HISTORYS](state, historys) {
    state.historys = historys
  }
}
export default mutations
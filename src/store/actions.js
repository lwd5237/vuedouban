import * as types from './mutation-types';
import {setHis, emptyHis, deleteHis} from 'common/js/search'
import {setWant, setWatched} from 'common/js/want'

export const saveWant = function({commit}, want){
  commit(types.SET_WANT, setWant(want))
}

export const saveWatched = function({commit}, watched){
  commit(types.SET_WATCHED, setWatched(watched))
}

export const saveHistory = function({commit}, history){
  commit(types.SET_HISTORYS, setHis(history))
}

export const emptyHistory = function({commit}, history){
  commit(types.SET_HISTORYS, emptyHis(history))
}

export const deleteHistory = function({commit}, history){
  commit(types.SET_HISTORYS, deleteHis(history))
}
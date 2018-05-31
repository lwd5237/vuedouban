import {commonParams} from './config'
import axios from 'axios'

export function getMovieTag(start, count, tag) {
  const url = `/v2/movie/search?tag=${tag}`
  const data = Object.assign({}, commonParams, {
    start,
    count
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function getMovieQuery(start, count, ret) {
  const url = `/v2/movie/search?q=${ret}`
  const data = Object.assign({}, commonParams, {
    start,
    count
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
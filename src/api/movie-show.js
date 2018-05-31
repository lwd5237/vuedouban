import {commonParams} from './config'
import axios from 'axios'

export function getMovieHot(start, count) {
  const url = '/v2/movie/in_theaters'
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
export function getMovieComing(start, count) {
  const url = '/v2/movie/coming_soon'
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
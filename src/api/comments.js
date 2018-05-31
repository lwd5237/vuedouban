import {commonParams} from './config'
import axios from 'axios'

export function getReview(id, start, count) {
  const url = `/v2/movie/subject/${id}/reviews`
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
export function getSort(id, start, count) {
  const url = `/v2/movie/subject/${id}/comments`
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
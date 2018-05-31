import {commonParams} from './config'
import axios from 'axios'

export function getTop250(start, count) {
  const url = '/v2/movie/top250'
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
export function getWeek() {
  const url = '/v2/movie/weekly'
  const data = Object.assign({}, commonParams, {
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
export function getNew() {
  const url = '/v2/movie/new_movies'
  const data = Object.assign({}, commonParams, {
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
export function getUsa() {
  const url = '/v2/movie/us_box'
  const data = Object.assign({}, commonParams, {
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
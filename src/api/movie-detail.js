import {commonParams} from './config'
import axios from 'axios'

export function getMovieDetail(id) {
  const url = `/v2/movie/subject/${id}`
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
import axios from 'axios'
import store from '../store'

export const baseURL = '/api' //'https://garden.hdk4.com/__gank_api__' //

export default function core(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json'
  };
  options.url = url;
  store.dispatch('setLoading', true);
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      withCredentials: true,
      headers,
      baseURL,
      timeout: 40000
    });
    instance(options).then(response => {
      // console.log('then', response, options)
      const res = response.data
      if (res.error) {
        reject(res)
      } else {
        resolve(res)
      }
      store.dispatch('setLoading', false)
    }).catch(error => {
      // console.log('catch', error)
      reject(error)
      store.dispatch('setLoading', false)
    });
  });
}

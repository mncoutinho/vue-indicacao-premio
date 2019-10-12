import axios from 'axios'
import { Loading, Notify } from 'quasar'

let loadFunction = config => {
  Loading.show()
  return config
}
let finishFunction = response => {
  if (response.data.messages !== undefined && response.data.messages.length !== 0) {
    let tipoMensagem = response.data.type === 'SUCCESS' ? 'positive' : 'info'
    response.data.messages.forEach(mensagem => {
      Notify.create({message: mensagem, type: tipoMensagem, position: 'center', timeout: 1500})
    })
  }
  Loading.hide()
  return response
}
let errorFunction = error => {
  if (error.response.data.messages !== undefined && error.response.data.messages.length !== 0) {
    error.response.data.messages.forEach(mensagem => {
      Notify.create({message: mensagem, type: 'negative', position: 'center', timeout: 1500})
    })
  }
  Loading.hide()
  return Promise.reject(error)
}

const restApi =
axios.create({baseURL: process.env.API + '/rest-api/crea', headers: {'Authorization': localStorage.getItem('TOKEN')}})
const restApiClean =
axios.create({baseURL: process.env.API + '/rest-api/crea', headers: {'Authorization': localStorage.getItem('TOKEN')}})
const restCouchDb =
axios.create({baseURL: process.env.COUCH_DB})

restApi.interceptors.request.use(loadFunction)
restApi.interceptors.response.use(finishFunction, errorFunction)
restApi.interceptors.request.use(function (config) {
  config.headers['Authorization'] = localStorage.getItem('TOKEN')
  return config
}, function (error) {
  return Promise.reject(error)
})

restApiClean.interceptors.request.use(function (config) {
  config.headers['Authorization'] = localStorage.getItem('TOKEN')
  return config
}, function (error) {
  return Promise.reject(error)
})

export default ({ Vue }) => {
  Vue.prototype.$axios = restApi
  Vue.prototype.$axiosClean = restApiClean
  Vue.prototype.$axiosCouchDB = restCouchDb
}

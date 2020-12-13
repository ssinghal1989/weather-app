import axios from 'axios'
const get = (url: string) => {
  return axios.get(url)
}

const httpService = {
  get
}

export default httpService

import axios from 'axios';

export const getNews = () => {
  return axios.get('http://192.168.225.244:3000/')
               .then(json=>json.data)
}
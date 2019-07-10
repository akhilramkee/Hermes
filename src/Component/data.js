import axios from 'axios';

export const getNews = () => {
  return axios.get('https://lit-ridge-28665.herokuapp.com/')
               .then(json=>json.data)
}

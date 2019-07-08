import axios from 'axios';

export const getNews = () => {
  return axios.get('https://randomuser.me/api/?results=10&inc=name,registered&nat=fr')
              .then(json => json.data.results.map(result => (
                   {
                        name: `${result.name.first} ${result.name.last}`,
                        id: result.registered
                    })))
              .then(newData => newData)
}
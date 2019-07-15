import axios from 'axios';
import { ArticleSchema } from './Constants';
const Realm = require('realm');

export const getNews = () => {
  return axios.get('https://lit-ridge-28665.herokuapp.com/')
               .then(json=>json.data)
}

export const RealmUpdate = (ARTICLE) =>{
  Realm.open({schema: [ArticleSchema]})
  .then(realm => {
    // Create Realm objects and write to local storage
    realm.write(() => {
      ARTICLE.forEach(obj =>{
       if(realm.objects('Article').filtered("id = '"+obj.id.toString()+"'").length == 0)
            realm.create('Article',obj);
      })
    });
  })
  .catch(err=>{
    alert(err);
  })
}

export const RealmQuery = () =>{
  Realm.open({schema:[ArticleSchema]})
        .then(realm =>{
          realm.objects('Article');
        })
        .catch(err =>{
          alert(err);
        })
}
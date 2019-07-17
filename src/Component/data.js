import axios from 'axios';
import { ArticleSchema } from './Constants';
const Realm = require('realm');

export const getNews = async () => {
  const json = await axios.get('https://lit-ridge-28665.herokuapp.com/');
  return json.data;
}

export const RealmUpdate = (ARTICLE) =>{
  Realm.open({schema: [ArticleSchema]})
  .then(realm => {
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

export const RealmQuery = async (query="All") =>{
  if(query === "All"){
  try {
      const realm = await Realm.open({ schema: [ArticleSchema] });
    //  alert(realm.objects('Article'));
      return realm.objects('Article');
    }
    catch (err) {
      alert(err);
    }
  }else{
  try {
      const realm_1 = await Realm.open({ schema: [ArticleSchema] });
      return realm_1.objects('Article').filtered('Category == $0', query);
    }
    catch (err_1) {
      alert(err_1);
    }
  }
}

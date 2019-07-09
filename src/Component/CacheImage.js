import React,{Component} from 'react';
import { View , Image, Platform } from 'react-native';
let RNFS = require('react-native-fs');
var sh = require('shorthash');

export default class CacheImage extends Component{

    state = {
            source:null,
    }

    loadFile = (path)=>{
        this.setState({source:{uri:path}});
    }

    downloadFile = (uri ,path)=>{
        RNFS.downloadFile({fromUrl:uri, toFile: path}).promise
            .then(res => this.loadFile(path));
         
    }

    componentDidMount(){
        const { uri } = this.props;
        const name = sh.unique(uri);
        const extension = (Platform.OS === 'android')?'file://' : ''
        const path = `${extension}${RNFS.CachesDirectoryPath}/${name}.jpeg`;

        RNFS.exists(path).then( exists => {
            if(exists)
                this.loadFile(path);
            else
                this.downloadFile(uri,path);
        })
    }

    render(){
        return(
            <Image style = { this.props.style } source = { this.state.source } resizeMode="cover"/>
        );
    }
}
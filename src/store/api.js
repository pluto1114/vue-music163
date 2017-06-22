

import Vue from 'vue'
import VueResource from 'vue-resource'
var querystring = require('querystring');

Vue.use(VueResource)

Vue.http.options.emulateJSON = true;
export function fetchSongList (options) {
	var otherParams ={
        'csrf_token': "",
        'type':1,
        'offset':0,
        'limit':10,
        'total':true
    };

    var postData = Object.assign(options, otherParams);
    console.log(postData);
    var p=Vue.http.post("/api/search/get/web",postData);
    p.then(resp => {
        console.log(resp.data);
    }, resp => {
        console.log("request error");
    });
	return p;
}
export function fetchSong (music_id) {
	var p=Vue.http.get("/api/song/detail?id="+music_id+"&ids="+'%5B'+music_id+'%5D');
    console.log('url',"http://music.163.com/api/song/detail?id="+music_id+"&ids="+'%5B'+music_id+'%5D')
    p.then(resp=>{
      console.log(resp.data);
    },resp=>{
      console.log("request error");
    });
    return p;
}
export function fetchLyric (music_id) {
	var p=Vue.http.get("/api/song/lyric?os=pc&id="+music_id+'&lv=-1&kv=-1&tv=-1');
    p.then(resp=>{
      console.log(resp.data);
    },resp=>{
      console.log("request error");
    });
    return p;
}
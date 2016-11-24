var http=require('http');
var querystring = require('querystring');

var DataApiPlugin={};


DataApiPlugin.install = function (Vue, options) {
  function status(response){
      if(response.status>=200 && response.status<300){
          return Promise.resolve(response);
      }
      else{
          return Promise.reject(new Error(response.statusText));
      }
  }
  function json(response){
      return response.json();
  }
  
  Vue.http.options.emulateJSON = true;
  Vue.prototype.$searchSong = function (options,callback) {
    var otherParams ={
        'csrf_token': "",
        'type':1,
        'offset':0,
        'limit':10,
        'total':true
    };

    var postData = Object.assign(options, otherParams);
    console.log(postData);
     
    Vue.http.post("/api/search/get/web",postData).then(resp=>{
      console.log(resp.data);
      callback(resp.data);
    },resp=>{
      console.log("请求出错");
    });
  }
  Vue.prototype.$showSong = function (options,callback) {
   
    Vue.http.get("/api/song/detail?id="+options.music_id+"&ids="+'%5B'+options.music_id+'%5D').then(resp=>{
      console.log(resp.data);
      callback(resp.data);
    },resp=>{
      console.log("请求出错");
    });
  }
  
}
module.exports = DataApiPlugin

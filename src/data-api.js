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
     
    fetch("/api/search/get/web",{method:'POST',body:querystring.stringify(postData)})
    .then(status)
    .then(json)
    .then(function(data){
        return callback(data);
    })
    .catch(function(err){
        console.log("Fetch错误:"+err);
    });
  }
  Vue.prototype.$showSong = function (options,callback) {
    fetch("/api/song/detail?id="+options.music_id+"&ids="+'%5B'+options.music_id+'%5D')
    .then(status)
    .then(json)
    .then(function(data){
        return callback(data);
    })
    .catch(function(err){
        console.log("Fetch错误:"+err);
    });
  }
  
}
module.exports = DataApiPlugin

var http=require('http');
var querystring = require('querystring');

var postData ={
    'csrf_token': "",
    's': "王菲",
    'type':1,
    'offset':0,
    'limit':5,
    'total':true
};
var options = {
  method: "POST",  
  host: "music.163.com",  
  port: 80,  
  path: "/api/search/get/web",  
  headers: {  
      "Content-Type": 'application/x-www-form-urlencoded',  
      'Referer': 'http://music.163.com/search/' 
  }  
};
 
var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  var resData = [];
  res.on('data', function (chunk) {
    resData.push(chunk);
  });
  res.on('end', function() {
    var data = resData.join("");
    console.log(JSON.parse(data));
  })
});
 
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
 
// 发送请求
req.write(querystring.stringify(postData));
req.end();
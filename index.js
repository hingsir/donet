var fs = require('fs')
var fileHelper = require('./libs/fileHelper.js')
var _path_ = require('path')

function deploy(dest){
   fileHelper.copyDir('./libs/donet-route', dest);
   fileHelper.copyDir('./Views', dest + '/Views', function(viewPath, data){
     var viewbag = fs.readFileSync(_path_.dirname(viewPath) + '/'+ _path_.parse(viewPath).name + '.viewbag')
     return String(data).replace(/@\{/, function($){
       return $ + '\r\n' + viewbag
     })
   })

}

module.exports = deploy;
deploy('D://dest')

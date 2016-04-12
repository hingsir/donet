var fs = require('fs')
var fileHelper = require('./libs/fileHelper.js')
var _path_ = require('path')

function deploy(dest){

   fileHelper.copyDir('./libs/donet-route', dest);

   fileHelper.copyDir('./views', dest + '/Views', function(viewPath, data){
     var viewBagPath = viewPath.replace(/\/Views\//, '/test/viewbag/').replace(/\.\w+$/, '.viewbag')
     var viewbag = fs.readFileSync(viewBagPath)
     return String(data).replace(/^/, function($){
       return '@{\n' + viewbag + '}\n'
     })
   })

   fileHelper.copyDir('./test/async', dest + '/async')

}

module.exports = deploy;

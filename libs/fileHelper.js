var fs = require('fs')
var stat = fs.stat
var makeArray = require('make-array')

module.exports = fileHelper = {
  copyFile: function(src, dst, middleware){
    fs.readFile(src, function(err, data){
      if(err) throw err
      if(middleware){
        data = middleware(dst, data);
      }
      fs.writeFile(dst, data)
    })
  },
  copyDir: function(src, dst, middleware){
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
      if( err ){
        throw err;
      }
      paths.forEach(function( path ){
        var _src = src + '/' + path,
          _dst = dst + '/' + path,
          readable, writable;
        stat( _src, function( err, st ){
          if( err ){
            throw err;
          }
          // 判断是否为文件
          if( st.isFile() ){
            fileHelper.copyFile(_src, _dst, middleware)
          }
          // 如果是目录则递归调用自身
          else if( st.isDirectory() ){
            fileHelper.exists( _src, _dst, fileHelper.copyDir, middleware);
          }
        });
      });
    });
  },

  exists: function(src, dst, callback, middleware){
    fs.exists( dst, function( exists ){
      // 已存在
      if( exists ){
        callback( src, dst, middleware );
      }
      // 不存在
      else{
        fs.mkdir( dst, function(){
          callback( src, dst, middleware );
        });
      }
    });
  },

  getDir: function(dir){
    var dirs = [];
    var paths = fs.readdirSync(dir);
    paths.forEach(function(_path){
      var st = fs.statSync(_PATH_.join(dir, _path));
      if(st.isDirectory()){
        dirs.push(_path);
      }
    });
    return dirs;
  }
}

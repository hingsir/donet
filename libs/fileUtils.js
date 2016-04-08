/**
 * Created by ChenChao on 2016/2/25.
 */

var fs = require( 'fs' );
var _PATH_ = require('path');
var stat = fs.stat;

module.exports = functions = {
  copy: function(src, dst){
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
            // 创建读取流
            readable = fs.createReadStream( _src );
            // 创建写入流
            writable = fs.createWriteStream( _dst );
            // 通过管道来传输流
            readable.pipe( writable );
          }
          // 如果是目录则递归调用自身
          else if( st.isDirectory() ){
            functions.exists( _src, _dst, functions.copy );
          }
        });
      });
    });
  },

  exists: function(src, dst, callback){
    fs.exists( dst, function( exists ){
      // 已存在
      if( exists ){
        callback( src, dst );
      }
      // 不存在
      else{
        fs.mkdir( dst, function(){
          callback( src, dst );
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
};

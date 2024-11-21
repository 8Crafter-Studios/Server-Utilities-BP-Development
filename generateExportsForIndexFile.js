const fs=require('fs');
const path = 'BP/src/modules/ui'

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

console.log(getFiles(path).filter(da=>da!=path+'/index.ts').map(db=>'export * from \x22./'+db.slice(path+'/'.length, -3)+'\x22').join('\n'))
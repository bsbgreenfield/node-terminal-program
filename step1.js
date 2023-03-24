const fs = require('fs')
const process = require('process')

function cat(path){
    fs.readFile(`${path}`, 'utf8', function(err, data){
        if (err){
            console.log(`error reading file ${argv[2]}`)
            console.log(`no such file or directory ${process.argv[2]}`)
            process.exit(1)
        }
        console.log(data)
    })
}

cat(process.argv[2])
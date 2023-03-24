const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(path){
    fs.readFile(`${path}`, 'utf8', function(err, data){
        if (err){
            console.log(`error reading file ${process.argv[2]}`)
            console.log(`no such file or directory ${process.argv[2]}`)
            process.exit(1)
        }
        console.log(data)
    })
}

async function webcat(url){
    try{
        let resp = await axios.get(url)
        console.log(resp.data)
    }
    catch(err){
        console.error(`error fetching ${url}: ${err}`)
        process.exit(1)
    }
}

let arg = process.argv[2]
if (arg.slice(0, 4 ) == 'http'){
    webcat(arg)
}
else{
    cat(arg)
}
const fs = require('fs')
const process = require('process')
const axios = require('axios')
const { argv } = require('process')

function cat(path, out=null){
    fs.readFile(`${path}`, 'utf8', function(err, data){
        if (err){
            console.log(`error reading file ${process.argv[2]}`)
            console.log(`no such file or directory ${process.argv[2]}`)
            process.exit(1)
        }
        resolveData(data, out)
    })
}

async function webcat(url, out=null){
    try{
        let resp = await axios.get(url)
        resolveData(resp.data, out)
    }
    catch(err){
        console.error(`error fetching ${url}: ${err}`)
        process.exit(1)
    }
}

function resolveData(textData, out){
    if (out){
        fs.writeFile(out, textData, 'utf8', function(err, data){
            if (err){
                console.log(`Error reading ${data}: ${err}`)
                process.exit(1)
            }
        })
    }
    else {
        console.log(textData)
    }
}

let arg = process.argv[2]
// if valid input with less than three args
if (arg != '--out' && process.argv.length < 3){
    console.log(process.argv.length)
    if (arg.slice(0, 4 ) == 'http'){
        webcat(arg)
    }
    else{
        cat(arg)
    }
}
// if valid input with 5 args
else if (arg == '--out' && process.argv.length == 5 ){
    if (process.argv[3].slice(0,4) == 'http'){
        webcat(process.argv[3], process.argv[4])
    }
    else{
        cat(process.argv[3], process.argv[4])
    }
}
// more than 3 args, but option is not --out
else {
    console.error(`option ${arg} not recognized`)
}

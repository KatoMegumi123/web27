const fs = require('fs');
let shit = "hahahaha";
fs.readFile('./nodejs-intro/data.txt',(err,data)=>{
    console.log("Err: ",err);
    console.log("Data: ",data);
});

fs.writeFile('./nodejs-intro/data.txt',shit,(err)=>{
    console.log("Err: ",err);
    console.log("Da sua");
})

fs.watchFile('./nodejs-intro/data.txt',(current,previous) => {
    console.log('File changed');
    fs.unwatchFile('./nodejs-intro/data.txt');
});
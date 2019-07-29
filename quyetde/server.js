const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.send("hahaha");
});

app.get('/ask', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/ask.html'));
});

app.listen(3000, (error)=>{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log('Dang nghe o cong 3000...');
    }

});
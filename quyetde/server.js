const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/ask.html'));
});

app.get('/ask', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/ask.html'));
});

app.post('/create-question',(req,res)=>{
    const newQuestion = {
        content:  req.body.questionContent,
        like: 0,
        dislike: 0,
        id: new Date().getTime(),
    };
    
    fs.readFile('data.json',{encoding: 'utf8'},(error,data)=>{
        if(error){
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        else {
            const questions = JSON.parse(data);
            questions.push(newQuestion);

            fs.writeFile('data.json', JSON.stringify(questions), (err) => {
                if(err){
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                }
                else {
                    res.status(201).json({
                        success: true,
                        data: newQuestion,
                    });
                }
            });
        }
    });


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
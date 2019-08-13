const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/quyetde',{useNewUrlParser: true},(e)=>{
    if(e)
    {
        console.log(e);
        process.exit();
    }
    else{
        const QuestionModel = require('./model');
        const app = express();

        app.use(express.static('public'));
        app.use(bodyParser.json());

        app.get('/', (req,res)=>{
            res.sendFile(path.resolve(__dirname,'./public/vote.html'));
        });

        app.get('/vote', (req,res)=>{
            QuestionModel.aggregate([{ $sample: { size: 1 } }],(err,response)=>{
                if(err)
                {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                }
                else
                {
                    res.status(201).json({
                        success: true,
                        data: response[0],
                    });
                }
            });
        });

        app.get('/ask', (req,res)=>{
            res.sendFile(path.resolve(__dirname,'./public/ask.html'));
        });

        app.post('/create-question',(req,res)=>{
            const newQuestion = {
                content:  req.body.questionContent,
            };
            
            QuestionModel.create(newQuestion,(error,data)=>{
                if(error)
                {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                }
                else
                {
                    res.status(201).json({
                        success: true,
                        data: {
                            ...data._doc,
                            id: data._doc._id,
                        },
                    });
                }
            });
            
        });

        app.get("/questions/:questionId", (req,res)=>{
            res.sendFile(path.resolve(__dirname,'./public/question.html'));
        });

        app.put("/vote/:questionId/:vote", (req,res)=>{
            // params: thanh phan cua duong dan co the thay doi
            const questionId = req.params.questionId;
            const vote = req.params.vote;
            var updateContent = {};
            updateContent[vote] = 1;
            QuestionModel.findByIdAndUpdate(questionId,{$inc:{[vote]:1}},(err,data)=>{
                if(err)
                {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                }
                else
                {
                    res.status(200).json({
                        success: true,
                    });
                }
            });    
        });

        app.get("/get-question-by-id/:questionId", (req,res)=>{
            // params: thanh phan cua duong dan co the thay doi
            const questionId = req.params.questionId;
            QuestionModel.findById(questionId,(err,data)=>{
                if(err)
                {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                }
                else
                {
                    if(!data)
                    {
                        res.status(404).json({
                            success: false,
                            message: "Not found",
                        });
                    }
                    else
                    {
                        res.status(201).json({
                            success: true,
                            data: data,
                        });
                    }    
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
        
        app.get('/search',(req,res)=>{
            res.sendFile(path.resolve(__dirname,'./public/search.html'));
        });

        app.get("/search-by-pattern/:pattern",(req,res)=>{
            const pattern = req.params.pattern;
            QuestionModel.find({"content":{$regex: pattern, $options: 'i'}},(err,docs)=>{
                if(err)
                {
                    res.status(500).json({
                        success: false,
                        message: err.message,
                    });
                }
                else
                {
                    res.status(201).json({
                        success: true,
                        data: docs,
                    });
                }
            });
        });
    }
});



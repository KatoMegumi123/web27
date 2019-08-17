const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/minihackathon',{useNewUrlParser: true},(e)=>{
    if(e)
    {
        console.log(e);
        process.exit();
    }
    else{
        const GamesModel = require('./model');
        const app = express();

        app.use(express.static('public'));
        app.use(bodyParser.json());

        app.get('/', (req,res)=>{
            res.sendFile(path.resolve(__dirname,'./public/scorekeeper.html'));
        });

        app.get('/newGames',(req,res)=>{
            console.log(req.query);
            var newGame = {
                players,
            }
            var players = req.query.players.split(',');
            newGame.players = [];
            for(let i=0;i<4;i++)
            {
                newGame.players[i] = {};
                newGame.players[i]["name"] = players[i];
                newGame.players[i]["game"] = [];
            }
            GamesModel.create(newGame,(error,data)=>{
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

        app.get("/games/:gameId", (req,res)=>{
            res.sendFile(path.resolve(__dirname,'./public/game-detail.html'));
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



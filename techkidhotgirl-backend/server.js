const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const cors = require('cors');

const mongoose = require('mongoose');
const usersRouter = require('./users/users.routes');
const postsRouter = require('./posts/posts.routes');
const upLoadRouter = require('./uploads/uploads.routes');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/hotgirls', { useNewUrlParser: true }, (e) => {
    if (e) {
        throw e;
    }
    else {
        const app = express();

        app.use(express.static('public'));
        app.use(bodyParser.json());
        app.use(cors({
            origin: ["http://localhost:3000"],
            credentials: true,
            methods: ['GET', 'PUT', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        app.use(session({
            secret: 'homquaemdentruong',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false },
        }));
        app.use('/users', usersRouter);
        app.use('/posts', postsRouter);
        app.use('/uploads', upLoadRouter);

        app.listen(3001, (error) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Dang nghe o cong 3001...');
            }
        });
    }
});



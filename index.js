const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');


//EJS does not need to be 'required' - Instead express will require it behind the scenes and it can be invoked by  declaring 'view engine' as an argument for the set method.
// EJS assumes our 'views' (templates), exist in a directory called 'views'  - the file within 'views' needs to end with .ejs, this file contains standard HTML
app.set('view engine', 'ejs');

// Set the views directory by taking the current directory 'Templating' and joining it with the 'views' path 
app.set('views', path.join(__dirname, '/views'))

//We can now respond to the HTTPS req with the .ejs file as a res using the 'render' method
app.get('/', (req, res) => {
    res.render('home')
});

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ];
    res.render('cats', { cats })
});

// Example where subreddit parameter is deconstructed as an  object then used in the response to display the provided path parameter
// If subreddit exists in data.json, then render requested data - Else return an error page saying we can't find that path ('/r/')
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data })
    } else {
        res.render('notfound', { subreddit })
    }
});

// Example where an if statement is used in the random.ejs file to only show html when conditions are met
app.get('/rand', (req, res) => {
    const num = Math.floor( Math.random() *  10) + 1;
    res.render('random', { num })
});


app.listen(3000,() => {
    console.log('Listening on Port 3000')
});

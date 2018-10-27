const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // If hosting locally, set port to 3000
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view enging', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.')
        }
    });
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
        res.render('home.hbs', {
            pageTitle: 'Home Page',
            welcomeMessage: 'Hi asshole.  Welcome to the site.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcomeMessage: 'This is the About Page.'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        welcomeMessage: 'View Project Porfolio.'
    });
});

app.get('/bad', (req, res) => {
    res.send( {
        errorMessage: 'Invalid request.'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//Used for Session Cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

//Extract Styles and Scripts from Sub Pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Setup the view Engine
app.set('view engine','ejs');
app.set('views', './views');

// MongoStore is used to store the session cookie in the database
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'haha',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
            mongooseConnection: db,
            autoremove: 'disabled'
        },
        function (err){
            console.log(err || 'Connect-MongoDB Setup OK');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());  

app.use(passport.setAuthenticatedUser);

//Use express Router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        // console.log('Error:', err);
        console.log(`Error in Running the Server: ${err}`);
        // return;
    }

    console.log(`Server running on port: ${port}`);
});

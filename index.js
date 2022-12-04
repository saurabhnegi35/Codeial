const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//Extract Styles and Scripts from Sub Pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



const port = 8000;

//Use express Router
app.use('/', require('./routes'));

// Setup the view Engine
app.set('view engine','ejs');
app.set('views', './views');

app.listen(port, function(err) {
    if (err) {
        // console.log('Error:', err);
        console.log(`Error in Running the Server: ${err}`);
        // return;
    }

    console.log(`Server running on port: ${port}`);
});

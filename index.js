const express = require('express');
const app = express();

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




// const express = require('express');
// const app = express();
// const port = 8000;

// // use express router
// app.use('/', require('./routes'));

// // set up the view engine
// app.set('view engine', 'ejs');
// app.set('views', './views');


// app.listen(port, function(err){
//     if (err){
//         console.log(`Error in running the server: ${err}`);
//     }

//     console.log(`Server is running on port: ${port}`);
// });

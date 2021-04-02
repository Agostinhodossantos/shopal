const express = require('express')
const app = express()
const port = process.env.PORT || 2000;
const ejs = require("ejs");


// Set the view engine to ejs
app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);


app.get('/product', (req, res) => {
    res.render('pages/product')
})

app.get('/', (req, res) => {
    res.render('pages/index');
})



app.listen(port, ()=> {
    console.log(` app listening at http://localhost:${port}`)
})
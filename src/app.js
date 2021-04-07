const express = require('express')
const app = express()
const port = process.env.PORT || 2000;
const ejs = require("ejs");
const providers = require('./providers')


// Set the view engine to ejs
app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);


app.get('/product', async(req, res) => {
    const id = req.query.id;
    const product =  await providers.getProductById(id);
    var category = product["data"].product["category"];
    var relatedProduct = await providers.getProductByCategory(category, 8);

    if(product != null) {
        res.render('pages/product', {
            product, relatedProduct
        })
    } else {
        res.status(404).send('Not found');
    }

    
})

app.get('/', async(req, res) => {
    var newProducts = await providers.getNewProducts();
    var moreVisitedProduct = await providers.getMoreVisitedProducts();
    var categoryList = await providers.getCategory(6);

    var carsProduct = await providers.getProductByCategory("Veículos", 6)
    var homeProduct = await providers.getProductByCategory("Imobiliária", 6)
    var techProduct = await providers.getProductByCategory("Tecnologia", 6)

    console.log(homeProduct )
    res.render('pages/index', {
        newProducts, moreVisitedProduct, categoryList, carsProduct, homeProduct, techProduct
    });
})



app.listen(port, ()=> {
    console.log(` app listening at http://localhost:${port}`)
})
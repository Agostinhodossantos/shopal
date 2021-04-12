const express = require('express')
const app = express() 
const port = process.env.PORT || 2000;
const ejs = require("ejs");
const providers = require('./providers')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);


app.get('/', async(req, res) => {
    var newProducts = await providers.getNewProducts();

    var moreVisitedProduct = await providers.getMoreVisitedProducts();
    var categoryList = await providers.getCategory(6);

    var carsProduct = await providers.getProductByCategory("Veículos", 6)
    var homeProduct = await providers.getProductByCategory("Imobiliária", 6)
    var techProduct = await providers.getProductByCategory("Tecnologia", 6)

    console.log(techProduct)
    res.render('pages/index', {
        newProducts, moreVisitedProduct, categoryList, carsProduct, homeProduct, techProduct
    });
})

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

app.get("/productby/:id", async(req, res) => {
    var category = req.params.id
    var relatedProduct = await providers.getProductByCategory(category, 0);
    res.render("pages/productbycategory", {relatedProduct, category})
})

app.get("/search/:id", async(req, res) => {
    var query = req.params.id
    var queryProduct = await providers.searchProduct(query);
    console.log(queryProduct)
    res.render("pages/product-search",{ queryProduct, query} )
})

app.post("/newsletter", (req, res) => {
    console.log(req.body)
 
    providers.subscribeNews(req.body)
})

app.listen(port, ()=> {
    console.log(` app listening at http://localhost:${port}`)
})
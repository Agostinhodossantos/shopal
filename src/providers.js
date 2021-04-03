const axios = require('axios').default;
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;

async function getProducts() {
    var products = [];

    await axios.get(`${BASE_URL}/products`)
    .then(function (response) {
      // set data rensponse in products
      products = response.data;
    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      products = null;
    })
    .then(function () {
      // always executed
    });

    return products
}

async function getProductById(id) {
    var product = {};
    
    await axios.get(`${BASE_URL}/product/${id}`)
    .then(function (rensponse) {
        product = rensponse.data;
    })
    .catch(function (error) {
        product = null;
    })
    
    return product;
}

async function getNewProducts() {
    // todo get new product
    var newProduct = await getProducts();
    var newProductList = [];

    for(prod of newProduct) {
        if(prod["data"].product["title"].length > 35) {
            prod["data"].product["title"] = prod["data"].product["title"].substring(0, 35)+"..".trim();
        }else {
            prod["data"].product["title"] = prod["data"].product["title"]+"\n \n";
        }

        if(prod["data"].product["img"] != 'undifined' && prod["data"].product["img"] != "" ) {
            newProductList.push(prod["data"].product);
        }
       

    }
    return newProductList;
}

async function getMoreVisitedProducts() {
    // todo get product by visit
    var moreVisitedProducts = await getProducts();
    return moreVisitedProducts;
}

async function getProductByCategory(category) {
    // todo get product by category 
    var productByCategory = await getProductByCategory();
    return productByCategory;
}

async function getCategory() {
    var allproducts = await getProducts();
    var categoryList = [];

    for(allproducts of product) {
        categoryList.push(product.category)
    }

    return categoryList;
}

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.getNewProducts = getNewProducts;
exports.getMoreVisitedProducts = getMoreVisitedProducts;
exports.getProductByCategory = getProductByCategory;

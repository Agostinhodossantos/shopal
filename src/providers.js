const axios = require('axios').default;
const utils = require("./utils")
require('dotenv').config();
const BASE_URL = process.env.BASE_URL;

async function getProducts() {
    var products = [];

    if(products.length > 6) {
        console.log("Return list")
        return products;
    }

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
       
        prod["data"].product["title"] = await utils.getProductTitle(prod["data"].product["title"] )
        prod["data"].product["locationCity"] = await utils.getLocation( prod["data"].product["locationCity"] )
        prod["data"].product["price"] =  prod["data"].product["price"]+" MT"

        if(prod["data"].product["img"] != 'undifined' && prod["data"].product["img"] != "" ) {
            newProductList.push(prod["data"].product);
        }
       

    }
    return newProductList;
}


async function getMoreVisitedProducts(limit = 20) {
    // todo get product by visit
    var moreVisitedProducts = await getProducts();
    var moreVisitedProductsList = [];
    var count = 0;

    for(prod of moreVisitedProducts) {
        prod["data"].product["title"] = await utils.getProductTitle(prod["data"].product["title"] )
        prod["data"].product["locationCity"] = await utils.getLocation( prod["data"].product["locationCity"] )
        prod["data"].product["price"] =  prod["data"].product["price"]+" MT"

        moreVisitedProductsList.push(prod["data"].product)
        if(limit == count) {
            break
        }
    }
    return moreVisitedProductsList.reverse();
}

async function getProductByCategory(category, limit) {
    var productByCategory = await getProducts()
    var productByCategoryList = [];
    var count = 0;

    for(prod of productByCategory) {

        prod["data"].product["title"] = await utils.getProductTitle(prod["data"].product["title"] )
        prod["data"].product["locationCity"] = await utils.getLocation( prod["data"].product["locationCity"] )
        prod["data"].product["price"] =  prod["data"].product["price"]+" MT"

        if(prod["data"].product["category"].includes(category)) {
            productByCategoryList.push(prod["data"].product);
            count++
        }

        if(count == limit) {
            break;
        }
    }

    return productByCategoryList;
}

async function getCategory(limit) {
    var allproducts = await getProducts();
    var categoryList = [];
    var count = 0;
    for(product of allproducts) {
        categoryList.push(product["data"].product["category"])
        count++
        if(limit != null){
            if(count == limit) {
                break;
            }
        }
       
    }
    var setCategory = new Set(categoryList);

    return  setCategory;
}

async function subscribeNews(data) {

    console.log("----")
    console.info(data)
    axios.post(`${BASE_URL}/subscribe`, {
        data
    }).then(function (res) {
        return true
    }).catch(function (error) {
        return false
    })

}

module.exports = {
    getProducts,
    getProductById,
    getNewProducts,
    getMoreVisitedProducts,
    getProductByCategory,
    getCategory,
    subscribeNews
}
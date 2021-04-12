async function getLocation(location) {

    var styledLocation = "";
    if(location.length > 12) {
        styledLocation = location.substring(0, 12).trim()+"..";
    } else {
        styledLocation = location;
    }
    return styledLocation;
}


async function getProductTitle(title) {
    var styledTitle = "";
    if(title.length > 35) {
        styledTitle =  title.substring(0, 35).trim()+"..";
    }else {
        styledTitle = title+"\n \n";
    }
    return styledTitle
}

async function queryProductBy(title,category,  subCategory, query) {
    if(title.includes(query) || category.includes(category) || subCategory.includes(query)) {
        console.log(title, query)
        return true
    }else {
        return false
    }
}



module.exports = {
    queryProductBy,
    getLocation,
    getProductTitle
}
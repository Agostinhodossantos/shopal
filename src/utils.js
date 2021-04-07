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


exports.getLocation = getLocation;
exports.getProductTitle = getProductTitle;
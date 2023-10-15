const generateRandomString = (len = 100) => {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let strlen = chars.length;
    let random_str = "";

    for(let i = 0; i< len; i++) {
        let posn = Math.floor(Math.random() * strlen);
        random_str += chars[posn];
    }
    return random_str;
}

export default generateRandomString;
const nodeCache = require('node-cache');

const myCache = new nodeCache();

const cache = (req, res, next) => {
    
    if (req.params.code) {
        //getting data from cache
        const value = myCache.get(req.params.code);
        console.log(value)
        if (value) {
            res.redirect(value)
        } else {
            next();
        }
    } else {
        //getting data from cache
        const value = myCache.get(req.body.longUrl);
        console.log(value)
        if (value) {
            res.send(value)
        } else {
            next();
        }
    }

}

module.exports = { cache, myCache };
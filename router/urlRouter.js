const express = require('express');
const ShortUrl = require('../model/urlModel');
const shortid = require('shortid');
const validUrl = require('valid-url');
const router = express.Router();
const jwtUtil = require('../jwtUtil')
const { cache, myCache } = require('../routeCache')

//cache duration
const cacheDuration = 7*24*60*60;

router.post('/shorten',jwtUtil.verifyToken , cache, async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  try {
    let shortUrl = await ShortUrl.findOne({ longUrl });

    if (shortUrl) {
      //setting data in cache
      const success = myCache.set(longUrl, shortUrl.shortUrl, cacheDuration);
      return res.send(shortUrl.shortUrl);
    }

    const code = shortid.generate();
    const shortUrlStr = `http://localhost:3000/${code}`;

    shortUrl = new ShortUrl({
      longUrl,
      shortUrl: shortUrlStr,
      code
    });
    //saving shortUrl in DB
    await shortUrl.save();

    //setting data in cache
    myCache.set(longUrl, shortUrl.shortUrl, cacheDuration);

    return res.send(shortUrl.shortUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:code',cache, async (req, res) => {
  try {

    const shortUrl = await ShortUrl.findOne({ code: req.params.code });

    if (!shortUrl) {
      return res.status(404).json({ error: 'URL not found' });
    }
    myCache.set(req.params.code, shortUrl.shortUrl, cacheDuration);
    return res.redirect(shortUrl.longUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
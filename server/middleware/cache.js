const NodeCache = require('node-cache');

// Cache for 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600 });

// Middleware function
const verifyCache = (req, res, next) => {
  try {
    // Create a unique key based on the request body (e.g., topic + language)
    const { topic, language } = req.body;
    
    // Only cache generation requests
    if (!topic) return next();

    const key = `${topic}-${language || 'English'}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      console.log(`⚡ Serving from Cache: ${key}`);
      return res.json(cachedResponse);
    }

    // Attach the cache set method to the response object so controllers can use it
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body);
      res.sendResponse(body);
    };

    next();
  } catch (err) {
    console.error("Cache Error:", err);
    next();
  }
};

module.exports = verifyCache;
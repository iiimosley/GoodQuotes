'use strict';

const { natural_language_understanding } = require('../config/watson-config');

module.exports.getSmartQuote = (req,res,next) => {

  console.log(req.body.search);

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  
  let parameters = {
    'text': req.body.search,
    'features': {
      'keywords': {
        'emotion': true,
        'sentiment': true,
      }
    }
  };

  natural_language_understanding.analyze(parameters, (err, response) => {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(response, null));
      return res.json(response);
    }
  });

}

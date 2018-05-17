'use strict';

const { natural_language_understanding } = require('../config/watson-config');

module.exports.getSmartQuote = (req,res,next) => {

  console.log(req.body.uid);

  const { User_Quote, Quote } = req.app.get("models");
  User_Quote.findAll({
    raw: true,
    where: {
      user_id: req.body.uid
    },
    include: [{ model: Quote, attributes: ['content', 'author'] }]
  }).then(quotes => {
    let concatQ = quotes.map(q => q[`Quote.content`]).join(' ');

    if (concatQ.length > 180) {
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

      let parameters = {
        'html': concatQ,
        'features': {
          'keywords': {}
        }
      };

      natural_language_understanding.analyze(parameters, (err, response) => {
        if (err) {
          res.status(404).json({ msg: 'Could not retrieve SmartQuote. Please try again.' })
        } else {
          console.log(response);
          res.status(200).json(response);
        }
      });
    } else {
      res.status(400).json({msg: 'Too few characters to complete search. Add some more quotes!'})
    }

  });
}

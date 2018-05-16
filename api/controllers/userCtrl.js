'use strict';

module.exports.addUserQuote = (req, rsp, next) => {
  console.log(req.body);
};

module.exports.deleteUserQuote = (req, res, next) => {
  console.log(req.body);
};

module.exports.addUserTag = (req, res, next) => {
  const { User_Tag, Tag } = req.app.get("models");
  Tag.findOne({where:{tag_content: req.body.tag}})
  .then(rsp => {
    if (!rsp) {
      Tag.create({tag_content: req.body.tag})
      .then(newTag => {
        User_Tag.create({
          user_id: req.body.uid,
          tag_id: newTag.dataValues.id
        });
      });
    } else {
      User_Tag.create({
        user_id: req.body.uid,
        tag_id: rsp.dataValues.id
      });
    }
  });
};

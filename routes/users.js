
exports = module.exports = function (app, mongoose) {

  var express = require('express');
  var router = express.Router();

  /* GET users listing. */
  router.get('/', function (req, res, next) {
    // let User = new app.db.models.User({ name: "Umair", email: "umairahmedbajwa97@gmail.com" });
    // User.save().then(data => {
    //   res.send(data);
    // });

    const users = [
      { name: "Umair", age: 22, profession: "Fullstack Developer and DevOps Engineer" },
    ]

    res.send(users)
  });

  app.use('/user', router);
};

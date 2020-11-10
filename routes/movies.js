const express = require('express');
const { authToken } = require('../middleware/auth');
const { movieModel, validMovie } = require("../models/movies_model");
const router = express.Router();



/* GET home page. */
router.get('/', (req, res, next) => {

  movieModel.find({})
    .limit(2)
    .then(data => {
      console.log(data);
      res.json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })

});


router.get('/ofUser', authToken, (req, res, next) => {
  let getuserId = req._id;
  movieModel.find({ user_id: getuserId })
    .limit(2)
    .then(data => {
      console.log(data);
      res.json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
});


router.post('/add', authToken, async (req, res) => {
  let getUserId = req._id;
  let valid = validMovie(req.body);
  if (!valid.error) {

    try {
      // מוסיף את האיי די של המשתמש
      // לפי הטוקן וככה יש אבטחה טובה יותר
      req.body.user_id = getUserId;
      let data = await movieModel.insertMany([req.body]);
      res.json(data)
    }
    catch (err) {
      res.status(400).json({ message: "ERROR :(" });
    }
  }
  else {
    res.status(400).json(valid.error.details);
  }
})


router.put("/edit", authToken, async (req, res) => {
  let getUserId = req._id;
  let valid = validMovie(req.body);
  if (!valid.error) {

    try {
      let data = await movieModel.updateOne({ _id: req.body.id }, req.body);
      res.json(data)
    }
    catch (err) {
      res.status(400).json("ERROR: " + err);
    }
  }
  else {
    res.status(400).json(valid.error.details);
  }
})

module.exports = router;

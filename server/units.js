const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;

//DEFINE SCHEMA AND MODEL
const armySchema = new mongoose.Schema({
  title: String,
  units: Array,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Army = mongoose.model('Army', armySchema);

router.post('/', auth.verifyToken, User.verify, async (req, res) => {
  const army = new Army({
    title: req.body.title,
    units: req.body.units,
    user: req.user,
  });
  try {
    await army.save();
    res.send(army);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/', auth.verifyToken, User.verify, async (req,res) =>{
  try {
    let armyList = await Army.find({
      user: req.user,
    });
    return res.send(armyList);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) =>{
  try {
    var army = await Army.findOne({
      _id: req.params.id
    });
    army.title = req.body.title;
    army.units = req.body.units;
    army.save();
    res.sendStatus(200);
  } catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) =>{
  try {
    await Army.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Army,
  routes: router,
}

var score = require('../models/score');

function index(){
    score.find({})
    .sort({points: 1})
    .then(scores => {
      res.json(scores);
    });
}

function create(){
    score.create(req.body)
    .then(score => {
      res.json(score);
    })
    .catch(err => {
      res.json({error: err});
    });
}


module.exports = {
    index,
    create
}
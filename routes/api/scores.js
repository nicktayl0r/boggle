var express = require('express');
var router = express.Router();
var scoresCtrl = require('../../controllers/scores');

router.post('/newScores', scoresCtrl.create)
router.get('/scores', scoresCtrl.index);

module.exports = router;
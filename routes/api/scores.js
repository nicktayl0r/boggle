var express = require('express');
var router = express.Router();
var scoresCtrl = require('../../controllers/scores');


router.get('/', scoresCtrl.index);
router.post('/game', scoresCtrl.addScore)




module.exports = router;
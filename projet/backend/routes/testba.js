const express = require('express')
router = express.Router(),

test=require("../controllers/test")

router.get('/', test.test)

module.exports = router
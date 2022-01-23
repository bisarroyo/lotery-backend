const express = require('express');
const {verifyToken, isUser} = require('../middlewares/verify.handler');

const router = express.Router();

router.get('/',
  verifyToken,
  isUser,
  async (req, res) => {
    res.json({message: "pass"})
  }
);



module.exports = router;
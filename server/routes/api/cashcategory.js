

const encrypter = require('./../../helpers/encrypter');
const model = require('./../../models');
const express = require('express');
const crypto = require('crypto');
const auth = require('./../../middlewares/auth');
const router = express.Router();

// Cash Category Model
const { Cashcategory } = model.cashcategory;

/**
 * @method  GET
 * @router  /api/cashcategory
 * @desc    get all cashcategories
 * @access  Public
 */
router.get('/', auth.authenticateToken, (req, res) => {
   Cashcategory.find()
       .sort({created_at: -1})
       .then(cashcategories => res.json({
           message: 'success',
           data: cashcategories,
       }));
});



module.exports = router;
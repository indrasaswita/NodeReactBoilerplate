

const encrypter = require('./../../helpers/encrypter');
const model = require('./../../models');
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./../../middlewares/auth');


// User Model
const { User: Users } = model.user;

// @router 		GET /api/user
// @desc 		have the prefix to api/users
// @access 		Public
router.get('/', [
  authenticateToken,
], (req, res) => {
    Users.find()
        .sort({ created_at: -1 })
        .then(users => {
            res.json({
                message: 'success',
                data: {
                    users: users
                },
            });
        });

    // res.status(200).send("hello world");
});



/**
 * @method  DELETE
 * @router  /api/user/:id
 * @desc    to Delete a User
 * @access  public
 */
router.delete('/:id', [
  authenticateToken,
], (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            user.remove().then(() => {
                res.json({
                    message: 'successfully delete'
                });
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'data not found'
            });
        });
});

/**
 * @method  PUT
 * @router  /api/user/:id/cashtype/add
 * @desc    add cashtype by user
 * @access  public
 */
router.put('/:id/cashtype/add', [
  authenticateToken,
], (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            let cashtypes = [];
            if(user.cashtypes == null
                || user.cashtypes.length == 0) {
                cashtypes = [req.body];
            } else {
                cashtypes = user.cashtypes;
                cashtypes.push(req.body);

                let map = new Map();
                cashtypes.forEach((cashtype) => {
                    map.set(cashtype.name, cashtype);
                });
                map = new Map([...map.entries()].sort());

                cashtypes = [...map.values()];
            }
            user.cashtypes = cashtypes;

            Users.updateOne({
                _id: user._id
            }, user, (err, res2) => {
                if(err) {
                    res.status(500).json({
                        message: 'error when updating',
                        error: err
                    });
                }
                res.status(200).json({
                    message: '1 document updated',
                });
            });
        })
        .catch(err => {
            res.status(404).json({
                message: 'user not found with this ID',
            });
        });
});


module.exports = router;
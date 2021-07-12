
const jwt = require('jsonwebtoken');
const encrypter = require('./../../helpers/encrypter');
const model = require('./../../models');
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

const generateAccessToken = (username) => {
    return jwt.sign({username}, process.env.JWT_SECRET, { expiresIn: '10h', algorithm: "HS256" });
};

// User Model
const { User } = model.user;

// @router 		GET /api/user
// @desc 		have the prefix to api/users
// @access 		Public
router.get('/', (req, res) => {
    User.find()
        .sort({ created_at: -1 })
        .then(users => res.json({
            message: 'success',
            data: users,
        }));

    // res.status(200).send("hello world");
});

/**
 * @method  POST
 * @router  /api/user/register
 * @desc    save new user data
 * @access  public
 */
router.post('/register', (req, res) => {
    const hash = encrypter.encrypt(req.body.password);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: hash,
        location: req.body.location,
    });

    newUser
        .save()
        .then(user => res.json({
            message: 'success',
            data: user,
        }));
});

/**
 * @method  POST
 * @router  /api/user/login
 * @desc    set login and return its jwt ttl
 * @access  public
 */
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, ['email', 'name', 'password'])
        .then(user => {
            const result = encrypter.check(password, user.password);
            const token = generateAccessToken(req.body.email);
            if(result)
                res.json({
                    message: 'success',
                    data: {
                        token: token,
                        user: user,
                    },
                });
            else
                res.status(403).json({
                    message: 'wrong password input'
                });
        })
        .catch(error => {
            console.log(error);
            res.status(403).json({
                message: 'no user by email, ' + email,
            });
        });
});

/**
 * @method  DELETE
 * @router  /api/user/:id
 * @desc    to Delete a User
 * @access  public
 */
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
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
router.put('/:id/cashtype/add', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            let cashtypes = [];
            if(user.cashtypes == null || user.cashtypes.length == 0) {
                cashtypes = [req.body];
            } else {
                cashtypes = user.cashtypes;
                cashtypes.push(req.body);

                let map = new Map;
                cashtypes.forEach((cashtype) => {
                    map.set(cashtype.name, cashtype);
                });
                map = new Map([...map.entries()].sort());

                cashtypes = [...map.values()];
            }
            user.cashtypes = cashtypes;

            User.updateOne({
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
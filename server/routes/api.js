// module.exports = (app) => {
//
//     // api bound
//     const users = require('./api/users');
//
//     // api prefix called
//
//
//     // raw api create
//     /*app.get("/", (req, res) => {
//         res.status(200).send("Nice 200 response code.");
//         // res.render("index", {title: "Home"});
//     });*/
//
//
// }
const express = require('express');
const router = express.Router();
const users = require('./api/users');
const auth = require('./api/auth');
const cashcategories = require('./api/cashcategories');


router.use('/auth', auth);
router.use('/users', users);
router.use('/cashcategories', cashcategories);


module.exports = router;
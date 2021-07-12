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
const user = require('./api/user');
const cashcategory = require('./api/cashcategory');


router.use('/user', user);
router.use('/cashcategory', cashcategory);


module.exports = router;
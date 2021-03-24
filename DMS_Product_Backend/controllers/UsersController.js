var usermodel = require('../model/UserModel');
var adminmodel = require('../model/AdminModel');
var bcrypt = require('bcryptjs');
const { check, validationResult, body } = require('express-validator');
var saltRounds = 10; //hash type




// var express = require('express');
// var multer = require('multer');
// var path = require('path');

// var storage = multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, callback) => {
//         let ext = path.extname(file.originalname);
//         callback(null, file.fieldname + '-' + Date.now() + ext);
//     }
// });

// var imageFileFilter = (req, file, cb) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('You can upload only image files!'), false);
//     }
//     cb(null, true);
// };

// var upload = multer({
//     storage: storage,
//     fileFilter: imageFileFilter,
//     limits: { fileSize: 1000000 }
// });


//checking user email if they are already registered
function emailValidator(req, res, next) {
    usermodel.User.findOne({
            where: { email: req.body.email }
        })
        .then(function(result) {

            if (result.dataValues != '') {
                next({ "status": 301, "message": "Email already Exits" })
                return;
            }
        })
        .catch(function(err) {
            next({ "status": 201, "message": "Email available" });
        })

}



function passwordValidator(value) {
    // console.log(value)
    if (value)
        if (value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")) {
            return true;
        }

    throw new Error('Password confirmation does not match password');
}












//checking user email if they are already registered
function validator(req, res, next) {
    console.log(req.body);
    usermodel.User.findOne({
            where: { email: req.body.email }
        })
        .then(function(result) {
            // console.log(result.dataValues);

            if (result) {
                return res.status(422).send({ 'errors': ["Email already registered as User"] });
            } else adminmodel.Admin.findOne({
                where: { email: req.body.email }
            }).then(function(result) {

                if (result)
                    return res.status(422).send({ 'errors': ["Email already registered as Admin"] })

                next();
            })

        })

}

//hashing password of user to maintain security
function hashGenerator(req, res, next) {
    req.body.password // this is the plaintext password
    bcrypt.hash(req.body.password, saltRounds)
        .then(function(hash) {
            // console.log(hash);
            req.hashvalue = hash;
            next();
        })
        .catch(function(err) {})

}


//registering user with hash password
function registerUser(req, res) {

    // return console.log(errors)

    usermodel.User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.hashvalue,
            img: req.body.image,
            role:"user",
            status: "normal"

        })
        .then(function(err, user) {

            res.status(200).send({ message: "registered successfully" })
        })
        .catch(function(err) {

            res.status(500).send({ message: err.message })
        })
}
//registering user with hash password
function registerAdmin(req, res, next) {
    // console.log(req.body);
    adminmodel.Admin.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.hashvalue

        })
        .then(function(result) {

            next();
        })
        .catch(function(err) {

            next({ "status": 500, "message": "DB Error" })
        })
} //registering user with hash password


function authChangePassword(req, res, next) {
    console.log(req.body)

    if (req.user.is_admin == "true") {
        adminmodel.Admin.findOne({

                where: { id: req.user.user_id }
            })
            .then(function(result) {

                bcrypt.compare(req.body.currentpassword, result.dataValues.password, function(err, doc) {
                    // console.log("compare")
                    if (!err && doc) {
                        bcrypt.hash(req.body.newpassword, saltRounds)
                            .then(async function(hash) {
                                // console.log(hash)
                                result.password = hash;
                                await result.save()
                                // console.log(hash);
                                req.success = true;
                                return next();
                            })
                            .catch(function(err) {
                                return next();
                            })
                    } else {
                        return next()

                    }

                });

            })
            .catch(function(err) {
                // res.status(500).send();

                return next()
            })
    } else {
        usermodel.User.findOne({

                where: { id: req.user.user_id }
            })
            .then(function(result) {

                bcrypt.compare(req.body.currentpassword, result.dataValues.password, function(err, doc) {
                    // console.log("compare")
                    if (!err && doc) {
                        bcrypt.hash(req.body.newpassword, saltRounds)
                            .then(async function(hash) {
                                // console.log(hash)
                                result.password = hash;
                                await result.save()
                                // console.log(hash);
                                req.success = true;
                                return next();
                            })
                            .catch(function(err) {
                                return next();
                            })
                    } else {
                        return next()

                    }

                });

            })
            .catch(function(err) {
                // res.status(500).send();

                return next()
            })

    }


}

module.exports = {
    validator,
    registerUser,
    hashGenerator,
    emailValidator,
    registerAdmin,
    passwordValidator,
    authChangePassword
}
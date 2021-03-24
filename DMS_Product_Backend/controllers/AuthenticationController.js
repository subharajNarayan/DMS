// check if the user is registered or not 
var {sequelize} = require('../configuration/dbconfig');
var usermodel = require('../model/UserModel');
var adminmodel = require('../model/AdminModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// function validator(req,res,next){

// usermodel.User.findOne({

//  where:{email : req.body.lemail}
// })
// // use had already registered
// .then(function(result){

//  if (result != null){
//          bcrypt.compare(req.body.lpassword, result.dataValues.password,
//              function(err,res){
//                  if(res){
//                      next({"status":200,"message":"Valid User Login"});
//                      return;
//                  } 
//                  if (err) {
//                          next();
//                  }
//                  });



//              }

// // store the user's hash password obtained from database in a variable and pass it through req object
// // req.userHashPassword = result.dataValues.password
//  // next();

// })
// // err denotes the user was not found - > user was not registerd 
// .catch(function(err){

//  adminmodel.Admin.findOne({
//  where:{email : req.body.lemail}
// })

// .then(function(result){

//  if (result != null){
//          bcrypt.compare(req.body.lpassword, result.dataValues.password,
//              function(err,res){
//                  if(res){
//                      next({"status":201,"message":"Valid Admin Login"});
//                      return;
//                  } else {
//                      next({"status":409,"message":"Credential didn't match"});
//                  }
//                  });

//              }
//              else{
//                  next({"status":410,"message":"No Records"});    
//              }



// })
// .catch(function(err){
//  next({"status" :400,"message": "Please register first to login"})
// })
// })


// }

function checkUser(req, response, next) {
    // console.log('cjelajfds')
    usermodel.User.findOne({
            where: { email: req.body.lemail }
        })
        // comapre's first parameter password obtained from login form i.e. req.body.password
        // second parameter the value passed from previous function (from database) through req object
        .then(function(result) {

            if(result.dataValues.status == 'blocked') {
                req.message = 'You are blocked. Please contact us';
                return next();
            }
            
            if (result) {
                bcrypt.compare(req.body.lpassword, result.dataValues.password, function(err, doc) {
                    if (!err && doc) {
                        req.user = result.dataValues
                        req.status = 200;
                    }
                    next();
                });
            } else {
                next();
            }


        })
        .catch(function(err) {
            next();
        })
}

function checkAdmin(req, response, next) {
    // if(req.user) return next();
    // console.log('checkadmin')
    adminmodel.Admin.findOne({
            where: { email: req.body.lemail }
        })
        // comapre's first parameter password obtained from login form i.e. req.body.password
        // second parameter the value passed from previous function (from database) through req object
        .then(function(result) {

            if (result) {
                bcrypt.compare(req.body.lpassword, result.dataValues.password, function(err, doc) {
                    if (!err && doc) {
                        req.user = result.dataValues
                        req.status = 201;
                        req.isAdmin = true;
                    }
                    next();
                });
            } else {
                next();
            }

        })
        .catch(function(err) {
            next({ "status": 404, "message": "No Record" });
        })
}



function jwtTokenGen(req, res, next) {

    if (!req.user) return next();

    jwt.sign({
            username: req.user.email,
            password: req.user.password,
            user_id: req.user.id,
            is_admin: req.isAdmin?'true':'false'
        }, 'universalDMSDesingedByArunDasAtCoventry', {
            expiresIn: "10h"
        },

        function(err, token) {


            if (err) {
                // console.log(err)
                next();
            } else {
                req.genToken = token;
                // console.log(token)
                next();
                // console.log(token)   
            }

        }
    )
}

function tokenVerify(req, res, next) {

    if (req.headers.authorization == undefined) {

        next({ status: 403, message: 'no authorization header present' })

    } else {

        let token = req.headers.authorization.slice(7, req.headers.authorization.length)

        jwt.verify(token, 'universalDMSDesingedByArunDasAtCoventry', function(err, decoded) {
            
            if (err) {
                next({ status: 403, message: err.message })
                // console.log(err);
            } else {
                req.user = decoded;
                // console.log(decoded); 
                next();
            }
        })
    }
}

function userCount(request, response) {
    sequelize.query('select count(*) as number from users',  { type: sequelize.QueryTypes.SELECT})
    .then(([result]) => {
        const {number} = result;
        response.status(200).send(number+'');
    })
}
function adminCount(request, response) {
    sequelize.query('select count(*) as number from admin',  { type: sequelize.QueryTypes.SELECT})
    .then(([result]) => {
        const {number} = result;
        response.status(200).send(number+'');
    })
}



module.exports = {
    // validator,
    // check,
    checkUser,
    checkAdmin,
    jwtTokenGen,
    tokenVerify,
    userCount,
    adminCount
}
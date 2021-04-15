var express = require('express');
var application = new express();
var multer = require('multer');
var bodyParser = require('body-parser');
var {sequelize} = require('./configuration/dbconfig')

var usermodel = require('./model/UserModel');
var textmodel = require('./model/TextModel');
var adminmodel = require('./model/AdminModel');
var textmodel = require('./model/TextModel');
var feedbackmodel = require('./model/FeedBack');
var boostmodel = require('./model/Boost');
var documentmodel = require('./model/Document');
var pagesmodel = require('./model/Pages');
var paymentmodel = require('./model/Payment');
var paymentrequestmodel = require('./model/PaymentRequest');
var ratemodel = require('./model/Rate');
var stoprequestmodel = require('./model/Stop_request');
var websitemodel = require('./model/Website');



var authController = require('./controllers/AuthenticationController');
var userController = require('./controllers/UsersController');
var adminController = require('./controllers/AdminController');
var boostController = require('./controllers/BoostController');
var pageController = require('./controllers/PageController');
var textController = require('./controllers/TextController');
var paymentController = require('./controllers/PaymentController');


var { body, validationResult, check } = require('express-validator');

application.use(bodyParser.urlencoded({ extended: true }))

//upload image for adnroid
var uploadRouter = require('./routes/upload');

//this is the first middleware - application middleware , all routes hit this middleware first
application.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,authorization');
    next(); // next passes to another application middleware 
})

// this will parse the json data in form body that arrives from client-browser (ajax)
application.use(bodyParser.json());


//this will hit the upload route to upload a file and return filename
application.use('/upload', uploadRouter);

//User API
//registration
application.post('/v1/users', [
    userController.validator,
    userController.hashGenerator
],

    userController.registerUser

)
//registration api for user
application.post('/v1/checkemail', userController.emailValidator)



application.get('/api/check/auth', authController.tokenVerify, function (request, response) {

    if (request.user) {
        request.user.password = undefined;
        return response.json(request.user);
    }

    return response.status(403).send();

});

//Admin API
//registration api for admin
application.post('/v1/admin', [
    userController.validator,
    userController.hashGenerator,
    userController.registerAdmin
],
    function (req, res) {
        res.status(201);
        res.send({ "message": "Admin was registered" })

    })

//login api for users
application.post('/v1/auth',
    [
        authController.checkUser,
        authController.checkAdmin,
        authController.jwtTokenGen
    ],

    function (req, res) {

        if (!req.user) {
            return res.status(404).json({
                message: req.message || 'No record found'
            });
        } else if (req.user && !req.genToken) {
            return res.status(405).json({
                message: 'Failed to generate access token'
            });
        } else {
            let msg = {
                201: 'Admin',
                200: 'User'
            };
            return res.status(req.status).json({
                message: 'Welcome ' + msg[req.status],
                token: req.genToken
            });
        }

    })



//get all users
application.get('/v1/users', authController.tokenVerify, adminController.getAllUsers)

application.get('/api/userCount', authController.userCount);

application.get('/api/adminCount', authController.adminCount);

//get all users
application.get('/v1/blockedusers', authController.tokenVerify, adminController.getAllBlockedUsers, function (req, res) {
    res.status(200);
})


//get single text
application.get('/v1/findAuthUser', authController.tokenVerify, adminController.findAuthUser);
application.put(
    '/v1/editAuthUser',
    bodyParser.urlencoded({ extended: true }),
    authController.tokenVerify,
    adminController.editAuthUser
)


application.post('/v1/changepassword', authController.tokenVerify, userController.authChangePassword, (req, res) => {
    if (req.success) {
        return res.status(200).json({ message: 'Password Changed' });
    } else {
        return res.status(500).json({ message: 'Password did not match' });
    }
})


//block user
application.put('/v1/blockuser/:userid', authController.tokenVerify, adminController.blockUser, function (req, res) {

    res.status(200);
    res.send({
        "message": "User Blocked"
    })
})
//block user
application.put('/v1/unblockuser/:userid', authController.tokenVerify, adminController.unblockUser, function (req, res) {
    res.status(200);
    res.send({
        "message": "User unBlocked"

    })
})


//Boost API
//add campaign
application.post('/v1/campaign', bodyParser.urlencoded({ extended: true }), authController.tokenVerify, boostController.addMyCampaign,
    function (req, res) {
        res.status(200);
        res.send({
            "message": "Campaign added"

        })
    })

//stop campaign
application.post('/v1/stopboostrequest', bodyParser.urlencoded({ extended: true }), authController.tokenVerify, boostController.stopBoostRequest,
    function (req, res) {
        res.status(200);
        res.send({
            "message": "Request sent"

        })
    })


//search all campaign of a user
application.get('/v1/campaign', authController.tokenVerify, boostController.searchMyCampaign, function (req, res) {
    res.status(200);
})


//Pages API
//request for new page
application.post('/v1/requestpage', bodyParser.urlencoded({ extended: true }), authController.tokenVerify, pageController.createMyPage,
    function (req, res) {
        res.status(200);
        res.send({
            "message": "Request Success"

        })
    })


//Search all pages of a user
application.get('/v1/findPages', authController.tokenVerify, pageController.findPages, function (req, res) {
    res.status(200);
})


//Payment api
//request for payment
application.post('/v1/requestpayment', bodyParser.urlencoded({ extended: true }), authController.tokenVerify, paymentController.createMyRequest,
    function (req, res) {
        res.status(200);
        res.send({
            "message": "Request Success"

        })
    })

//retrieve users payments
application.get('/v1/findPayments', authController.tokenVerify, paymentController.findMyPayments, function (req, res) {
    res.status(200);
})




//Text API
//add text
application.post('/v1/text',
    bodyParser.urlencoded({ extended: true }), authController.tokenVerify, textController.addMyText,
    function (req, res) {

        res.status(200);
        res.send({
            "message": "Text added"

        })
    })


//search all text
application.get('/v1/text', authController.tokenVerify, textController.searchMyText, function (req, res) {
    res.status(200);
})


//search all text
application.get('/v1/getRecentUser', authController.tokenVerify, adminController.getRecentUser, function (req, res) {
    res.status(200);
})

//get single text
application.get('/v1/findtext/:noteid', authController.tokenVerify, textController.findText, function (req, res) {
    res.status(200);
})

// edit single text
application.put('/v1/text/:noteid', authController.tokenVerify, textController.editText, function (req, res) {

    res.status(200);
    res.send({
        "message": "Text Edited"

    })
})

//Delete Single text
application.delete('/v1/text/:noteid', authController.tokenVerify, textController.deleteNote, function (req, res) {

    res.status(200);
    res.send({
        "message": "Text deleted"

    })

})
//Delete Single text
application.delete('/v1/feedback/:feedbackid', authController.tokenVerify, textController.deleteFeedback, function (req, res) {

    res.status(200);
    res.send({
        "message": "feedback deleted"

    })

})


//Users FeedBack

application.post('/v1/givefeedback', bodyParser.urlencoded({ extended: true }), authController.tokenVerify, textController.giveFeedback)



//get single text
application.get('/v1/feedback', authController.tokenVerify, textController.allfeedback, function (req, res) {
    res.status(200);
})




// responsible for file response
application.get('/image/:filename', function (request, response) {
    const fs = require('fs');
    if (fs.existsSync(__dirname + '/public/uploads/' + request.params.filename)) {
        response.sendFile(__dirname + '/public/uploads/' + request.params.filename);
    } else {
        response.status(404).send();
    }
});


application.listen(3001, async () => {
    // await sequelize.sync({ force: true });
    console.log('server started at 3001');
});

module.exports = application;
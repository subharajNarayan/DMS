var usermodel = require('../model/UserModel');
var adminmodel = require('../model/AdminModel');


function getAllUsers(req, res) {
    usermodel.User.findAll({
            where: { status: "normal" }
        })
        .then(function(result) {
            res.status(200);
            res.json(result)
        })
        .catch(function(err) {
            res.status(200).json(err);
        })
}

function getAllBlockedUsers(req, res) {
    usermodel.User.findAll({
            where: { status: "blocked" }
        })
        .then(function(result) {
            res.status(200);
            res.json(result)
        })
        .catch(function(err) {

        })
}

function blockUser(req, res) {
    usermodel.User.update({
            status: "blocked"
        }, {
            where: { id: req.params.userid }
        })
        .then(function(result) {
            res.status(201);
            res.send({ "message": "User blocked succesfuly" })
        })
        .catch(function(err) {

        })
}

function unblockUser(req, res) {
    usermodel.User.update({
            status: "normal"
        }, {
            where: { id: req.params.userid }
        })
        .then(function(result) {
            res.status(201);
            res.send({ "message": "User unblocked succesfuly" })
        })
        .catch(function(err) {

        })
}

function findAuthUser(req, res) {
    if (req.user.is_admin == "true") {
        adminmodel.Admin.findOne({
                where: { id: req.user.user_id }
            })

            .then(function(result) {
                if (result != "") {
                    res.status(200);
                    res.json(result)
                } else {
                    res.status(404).send();
                }
            })
            .catch(function(err) {
                res.status(404).send();
            })
    } else {
        usermodel.User.findOne({
                where: { id: req.user.user_id }
            })

            .then(function(result) {
                if (result != "") {
                    res.status(200);
                    res.json(result)
                } else {
                    res.status(404).send();
                }
            })
            .catch(function(err) {
                res.status(404).send();
            })
    }


}

function editAuthUser(req, res) {
    if (req.user.is_admin == "true") {
        adminmodel.Admin.update({
                fname: req.body.fname,
                lname: req.body.lname,
                address: req.body.address,
                gender: req.body.gender,
                country: req.body.country,
                phone: req.body.phone,
                img: req.body.img
            }, {
                where: { id: req.user.user_id}
            })

            .then(function(result) {
                if (result) {
                    res.status(201);
                    res.send({ "message": "Edited succesfuly" })
                } else {
                    res.status(500).send();
                }
            })
            .catch(function(err) {
                res.status(500).send();
            })
    } else {
        usermodel.User.update({
                fname: req.body.fname,
                lname: req.body.lname,
                address: req.body.address,
                gender: req.body.gender,
                country: req.body.country,
                phone: req.body.phone,
                 img: req.body.img
            }, {
                where: { id: req.user.user_id }
            })

            .then(function(result) {
                if (result) {
                    res.status(201);
                    res.send({ "message": "Edited succesfuly" })
                } else {
                    res.status(500).send();
                }
            })
            .catch(function(err) {
                res.status(500).send();
            })
    }


}

function getRecentUser(req, res) {
    if (req.user.is_admin == "true") {
        adminmodel.Admin.findOne({
                
               where: { id: req.user.user_id }
            })

            .then(function(result) {
                if (result) {
                    res.status(201);
                     res.json(result)
                } else {
                    res.status(500).send();
                }
            })
            .catch(function(err) {
                res.status(500).send();
            })
    } else {
        usermodel.User.findOne({
                    
               where: { id: req.user.user_id }
            })

            .then(function(result) {
                if (result) {
                    res.status(201);
                     res.json(result)
                } else {
                    res.status(500).send();
                }
            })
            .catch(function(err) {
                res.status(500).send();
            })
    }


}

module.exports = {
    getAllUsers,
    blockUser,
    unblockUser,
    getAllBlockedUsers,
    findAuthUser,
    editAuthUser,
    getRecentUser

}
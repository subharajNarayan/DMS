var boostmodel = require('../model/Boost');
var feedbackmodel = require('../model/FeedBack');
var stopboostrequestmodel = require('../model/Stop_request');


function addMyCampaign(req, res, next) {
    // return console.log(req.body);
    boostmodel.Boost.create({
            post_name: req.body.post_name,
            post_link: req.body.post_link,
            total_days: req.body.total_days,
            total_budget: req.body.total_budget,
            age: req.body.age,
            rate: req.body.rate,
            gender: req.body.gender,
            area: req.body.area,
            status: req.body.status,
            pages_id: req.body.pages_id,
            requested_by: req.user.user_id
        })
        .then(function(result) {
            next();
        })
        .catch(function(err) {
            console.log(err.message);
            next({ "status": 500, "message": err.message })
        })
}

function searchMyCampaign(req, res) {
    boostmodel.Boost.findAll({
            where: { requested_by: req.user.user_id},
            attributes: ['id', 'post_name', 'total_days', 'total_budget', 'status', 'createdAt', 'rate', 'done_by']
        })
        .then(function(result) {
            res.status(200);
            res.json(result)
        })
        .catch(function(err) {

        })
}

function stopBoostRequest(req, res, next) {
    // return console.log(req.body);
    stopboostrequestmodel.Stop_request.create({
            boost_id: req.body.boost_id,
            reason: req.body.reason,
            status: "pending",
            requested_by: req.user.user_id
        })
        .then(function(result) {
            next();
        })
        .catch(function(err) {
            console.log(err.message);
            next({ "status": 500, "message": err.message })
        })
}



// function searchMyText(req,res){

// 	textmodel.Text.findAll({
// 		attributes: ['id', 'header', 'content','createdAt',"updatedAt"]
// 	})
// 		.then(function(result){
// res.status(200);
// res.json(result)
// 	})
// 	.catch(function(err){

// 	})
// }


function findText(req, res) {
    textmodel.Text.findOne({
            where: { id: req.params.noteid }
        })
        .then(function(result) {
            res.status(200);
            res.json(result)
        })
        .catch(function(err) {

        })
}

function editText(req, res) {
    textmodel.Text.update({
            header: req.body.header,
            content: req.body.content
        }, {
            where: { id: req.params.noteid }
        })
        .then(function(result) {
            res.status(201);
            res.send({ "message": "Text Edited succesfuly" })
        })
        .catch(function(err) {

        })
}


function deleteNote(req, res, next) {
    textmodel.Text.destroy({
            where: { id: req.params.noteid }
        })
        .then(function() {
            res.status(200)
            res.send({ "message": "deleted succesfuly" });
        })
        .catch(function(err) {
            next({ "status": 500, "message": "Couldnot delete" })
        })
}
function deleteFeedback(req, res, next) {
    feedbackmodel.FeedBack.destroy({
            where: { id: req.params.feedbackid }
        })
        .then(function() {
            res.status(200)
            res.send({ "message": "deleted succesfuly" });
        })
        .catch(function(err) {
            next({ "status": 500, "message": "Couldnot delete" })
        })
}


//users feedback

function giveFeedback(req, res, next) {
    feedbackmodel.FeedBack.create({
            email: req.user.username,
            subject: req.body.subject,
            content: req.body.content
        })
        .then(function(result) {
             res.status(200)
            res.send({ "message": "FeedBack Sent" });
        })
        .catch(function(err) {
            next({ "status": 500, "message": "DB Error" })
        })
}


function allfeedback(req,res){
feedbackmodel.FeedBack.findAll({

})
       .then(function(result) {
            res.status(200);
            res.json(result)
        })
        .catch(function(err) {

        })
}

module.exports = {
    addMyCampaign,
    searchMyCampaign,
    stopBoostRequest,
    findText,
    editText,
    deleteNote,
    giveFeedback,
    allfeedback,
    deleteFeedback
}
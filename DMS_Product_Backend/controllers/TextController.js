var textmodel = require('../model/TextModel');
var feedbackmodel = require('../model/FeedBack');


function addMyText(req, res, next) {
    textmodel.Text.create({
            header: req.body.header,
            content: req.body.content,
            belongsto: req.user.username

        })
        .then(function(result) {

            next();
        })
        .catch(function(err) {

            next({ "status": 500, "message": "DB Error" })
        })
}

function searchMyText(req, res) {

    textmodel.Text.findAll({
            where: { belongsto: req.user.username },
            attributes: ['id', 'header', 'content', 'createdAt']
        })
        .then(function(result) {
            res.status(200);
            res.json(result)
        })
        .catch(function(err) {

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
    addMyText,
    searchMyText,
    findText,
    editText,
    deleteNote,
    giveFeedback,
    allfeedback,
    deleteFeedback
}
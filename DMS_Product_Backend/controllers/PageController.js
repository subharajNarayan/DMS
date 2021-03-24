var pagemodel = require('../model/Pages');



function createMyPage(req, res, next) {
    // return console.log(req.body);
    pagemodel.Pages.create({
            page_name: req.body.page_name,
            status: "pending",
            purpose: req.body.purpose,
            users_id: req.user.user_id
        })
        .then(function(result) {
            next();
        })
        .catch(function(err) {
            console.log(err.message);
            next({ "status": 500, "message": err.message })
        })
}

function findPages(req, res) {

   pagemodel.Pages.findAll({
            where: { users_id: req.user.user_id},
            attributes: ['id', 'page_name', 'page_username', 'status', 'purpose']
        })
        .then(function(result) {
            res.status(200);
            res.json(result)
        })
        .catch(function(err) {

        })
}


module.exports = {
    createMyPage,
    findPages

}
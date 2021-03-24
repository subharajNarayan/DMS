var paymentrequest = require('../model/PaymentRequest');
var mypayments = require('../model/Payment');

function createMyRequest(req, res, next) {
    console.log(req.body);
    paymentrequest.PaymentRequest.create({
            date: req.body.date,
            amount: req.body.amount,
            method: req.body.method,            
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

function findMyPayments(req, res) {

   mypayments.Payment.findAll({
            where: { users_id: req.user.user_id},
            attributes: ['id', 'date', 'amount', 'method', 'description']
        })
        .then(function(result) {
            res.status(200);
            res.json(result)
        })
        .catch(function(err) {

        })
}

module.exports = {
    createMyRequest,
    findMyPayments

}
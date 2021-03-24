var db = require('../configuration/dbconfig')
//user table
const PaymentRequest = db.sequelize.define('PaymentRequest', {
  // attributes
  id: {
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement: true,
	primaryKey:true
  },
  date: {
    type: db.Sequelize.STRING
  },
  amount: {
  	type: db.Sequelize.STRING,
  	allowNull: false
  },
  method: {
  	type: db.Sequelize.STRING,
  	allowNull: false
  },
  users_id: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  }
}, 
{
  // options
  freezeTableName:true,
  tableName:'payment_request'
}
);
PaymentRequest.sync({force:false})
.then(function(result){
console.log(result);
})
.catch(function(err){
	console.log(err)
})
module.exports= {
PaymentRequest
}
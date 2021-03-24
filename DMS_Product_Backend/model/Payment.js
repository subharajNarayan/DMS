var db = require('../configuration/dbconfig')
//user table
const Payment = db.sequelize.define('Payment', {
  // attributes
  id: {
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement: true,
	primaryKey:true
  },
  date: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  amount: {
  	type: db.Sequelize.STRING,
  	allowNull: false
  },
  method: {
  	type: db.Sequelize.STRING,
  	allowNull: false
  },
  description: {
  	type: db.Sequelize.STRING,
  	allowNull: false
  },
  approved_by: {
    type: db.Sequelize.INTEGER,
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
  tableName:'payment'
}
);
Payment.sync({force:false})
.then(function(result){
console.log(result);
})
.catch(function(err){
	console.log(err)
})
module.exports= {
Payment
}
var db = require('../configuration/dbconfig')

//user table
const Stop_request = db.sequelize.define('Stop_request', {
  // attributes

  id: {
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement: true,
	primaryKey:true
  },
  boost_id: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  },
  reason: {
  	type: db.Sequelize.STRING,
  	allowNull: false
  },
  status: {
  	type: db.Sequelize.INTEGER,
  	allowNull: false
  },
  requested_by: {
  	type: db.Sequelize.INTEGER,
  	allowNull: false
  }
}, 
{
  // options
  freezeTableName:true,
  tableName:'stop_request'
}
);
Stop_request.sync({force:false})
.then(function(result){
console.log(result);
})
.catch(function(err){
	console.log(err)
})
module.exports= {
Stop_request
}
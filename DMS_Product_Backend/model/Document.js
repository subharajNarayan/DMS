var db = require('../configuration/dbconfig')
//user table
const Document = db.sequelize.define('Document', {
  // attributes
  id: {
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement: true,
	primaryKey:true
  },
  agreement: {
    type: db.Sequelize.STRING
  },
  pan: {
  	type: db.Sequelize.STRING
  },
  pp_size: {
  	type: db.Sequelize.STRING
  },
  users_id: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  },
  approved_by: {
    type: db.Sequelize.INTEGER
  }
}, 
{
  // options
  freezeTableName:true,
  tableName:'document'
}
);
Document.sync({force:false})
.then(function(result){
console.log(result);
})
.catch(function(err){
	console.log(err)
})
module.exports= {
Document
}
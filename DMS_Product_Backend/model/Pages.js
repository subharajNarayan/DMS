var db = require('../configuration/dbconfig')
//user table
const Pages = db.sequelize.define('Pages', {
  // attributes
  id: {
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement: true,
	primaryKey:true
  },
  page_name: {
    type: db.Sequelize.STRING,
  allowNull:false
  },
  page_username: {
  	type: db.Sequelize.STRING
  },
  status: {
  	type: db.Sequelize.STRING,
  allowNull:false
  },
  purpose: {
    type: db.Sequelize.STRING,
  allowNull:false
  },
  created_by: {
    type: db.Sequelize.INTEGER
  },
  users_id: {
    type: db.Sequelize.INTEGER
  }
}, 
{
  // options
  freezeTableName:true,
  tableName:'pages'
}
);
Pages.sync({force:false})
.then(function(result){
console.log(result);
})
.catch(function(err){
	console.log(err)
})
module.exports= {
Pages
}
var db = require('../configuration/dbconfig')

//user table
const Website = db.sequelize.define('Website', {
  // attributes

  id: {
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement: true,
	primaryKey:true
  },
  website_name: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  link: {
  	type: db.Sequelize.STRING,
  	allowNull: false
  },
  created_by: {
  	type: db.Sequelize.STRING
  },
  users_id: {
  	type: db.Sequelize.INTEGER,
  	allowNull: false
  }
}, 
{
  // options
  freezeTableName:true,
  tableName:'website'
}
);
Website.sync({force:false})
.then(function(result){
console.log(result);
})
.catch(function(err){
	console.log(err)
})
module.exports= {
Website
}
var db = require('../configuration/dbconfig')
//user table
const Admin = db.sequelize.define('Admin', {
  // attributes
  id: {
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement: true,
	primaryKey:true
  },
  fname: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  lname: {
  	type: db.Sequelize.STRING,
  	allowNull: false
  },
  email: {
  	type: db.Sequelize.STRING,
  	allowNull: false
  },
  password: {
  	type: db.Sequelize.STRING,
  	allowNull: false
  },
  img: {
    type: db.Sequelize.STRING    
    // allowNull defaults to true
  }
}, 
{
  // options
  freezeTableName:true,
  tableName:'admin'
}
);
Admin.sync({force:false})
.then(function(result){
console.log(result);
})
.catch(function(err){
	console.log(err)
})
module.exports= {
Admin
}
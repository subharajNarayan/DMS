var db = require('../configuration/dbconfig')

//user table
const FeedBack = db.sequelize.define('FeedBack', {
  // attributes

  id: {
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement: true,
	primaryKey:true
  },

  email: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  subject: {
  	type: db.Sequelize.STRING,
  	

  },
  content: {
  	type: db.Sequelize.STRING,  	
    allowNull: false
  }
}, 

{
  // options
  freezeTableName:true,
  tableName:'feedback'
}

);

FeedBack.sync({force:false})
.then(function(result){
console.log(result);
})
.catch(function(err){
	console.log(err)
})

module.exports= {
FeedBack

}
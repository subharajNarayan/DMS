var db = require('../configuration/dbconfig')
//text table
const Text = db.sequelize.define('text', {
  // attributes

  id: {
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement: true,
	primaryKey:true
  },

  header: {
    type: db.Sequelize.STRING

  },
  content: {
  	type: db.Sequelize.STRING,
  	allowNull: false
  },
  belongsto: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
},

{
  // options
  freezeTableName:true,
  tableName:'text'
}

);

Text.sync({force:false})
.then(function(result){
console.log(result);
})
.catch(function(err){
	console.log(err)
})

module.exports= {
Text
}
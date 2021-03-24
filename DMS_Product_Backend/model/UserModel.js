var db = require('../configuration/dbconfig')

//user table
const User = db.sequelize.define('User', {
	// attributes

	id: {
		type: db.Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
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
	gender: {
		type: db.Sequelize.STRING
	},
	country: {
		type: db.Sequelize.STRING
	},
	address: {
		type: db.Sequelize.STRING
	},
	mobile_no: {
		type: db.Sequelize.INTEGER
	},
	telephone_no: {
		type: db.Sequelize.INTEGER
	},
	img: {
		type: db.Sequelize.STRING
	},
	status: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	approved_date: {
		type: db.Sequelize.STRING
	},
	role: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	approved_by: {
		type: db.Sequelize.INTEGER
	}
}, {
	// options
	freezeTableName: true,
	tableName: 'users'
});


User.sync({ force: false })
	.then(function (result) {
		console.log(result);
	})
	.catch(function (err) {
		console.log(err)
	})


module.exports = {
	User
}
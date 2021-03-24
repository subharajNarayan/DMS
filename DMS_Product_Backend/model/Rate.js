var db = require('../configuration/dbconfig')
//user table
const Rate = db.sequelize.define('Rate', {
    // attributes
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    rate: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    admin_id: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
}, {
    // options
    freezeTableName: true,
    tableName: 'rate'
});
Rate.sync({ force: false })
    .then(function(result) {
        console.log(result);
    })
    .catch(function(err) {
        console.log(err)
    })
module.exports = {
    Rate
}
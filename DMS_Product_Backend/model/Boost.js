var db = require('../configuration/dbconfig')
//user table
const Boost = db.sequelize.define('Boost', {
    // attributes
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    post_name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    post_link: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    total_days: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    total_budget: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    age: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    rate: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    area: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    interest: {
        type: db.Sequelize.STRING
    },
    status: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    stopped_dollar: {
        type: db.Sequelize.INTEGER
    },
    stopped_date: {
        type: db.Sequelize.STRING
    },
    reason: {
        type: db.Sequelize.STRING
    },
    done_by: {
        type: db.Sequelize.INTEGER
    },
    pages_id: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    stopped_by: {
        type: db.Sequelize.INTEGER
    },
    requested_by: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
}, {
    // options
    freezeTableName: true,
    tableName: 'boost'
});
Boost.sync({ force: false })
    .then(function(result) {
        console.log(result);
    })
    .catch(function(err) {
        console.log(err)
    })
module.exports = {
    Boost
}
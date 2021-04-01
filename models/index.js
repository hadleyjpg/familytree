const Squelize = require('sequelize');

const db = {
    Squelize,
    init(config) {
        db.squelize = new Squelize(`mysql://${config.username}:${config.password}@${config.host}/${config.database}`);
        return db.sequelize.authenticate()
            .then(() => {
                return db.sequelize.sync({ force: false });
            })
    },
};

module.exports = db;
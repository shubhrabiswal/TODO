module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
        liked_by: {
            type: Sequelize.INTEGER,
        },
        todo_id: {
            type: Sequelize.INTEGER,
        }
    }, { timestamps: true })

    return Like;
}

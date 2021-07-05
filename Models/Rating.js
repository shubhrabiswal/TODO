module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("rating", {
        rating: {
            type: Sequelize.INTEGER,
            default: 0
        },
        rated_by: {
            type: Sequelize.INTEGER,
        },
        todo_id: {
            type: Sequelize.INTEGER,
        }
    }, { timestamps: true })

    return Rating;
}
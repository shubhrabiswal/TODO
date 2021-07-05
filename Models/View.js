module.exports = (sequelize, Sequelize) => {
    const View = sequelize.define("view", {
        views: {
            type: Sequelize.INTEGER,
            default: 0
        },
        viewed_by: {
            type: Sequelize.INTEGER,
        },
        todo_id: {
            type: Sequelize.INTEGER,
        }
    }, { timestamps: true })

    return View;
}

// viewed_by: {
        //     type: Sequelize.INTEGER,
        //     get: function () {
        //         return JSON.parse(this.getDataValue('viewed_by'));
        //     },
        //     set: function (val) {
        //         return this.setDataValue('viewed_by', JSON.stringify(val));
        //     }
        // },
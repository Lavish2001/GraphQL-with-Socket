'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class Message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.myAssociation = models.Enrollments.belongsTo(models.Courses, {
            //     foreignKey: "course_id",
            //     as: 'Course'
            // });
        }
    };
    Message.init({

        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        sender_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        receiver_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        text: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        sequelize,
        tableName: 'Message',
        timestamps: true,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        underscored: true
    });

    // Define the hook to prevent records with same student id and course id from being saved

    // Enrollments.beforeCreate(async (enroll, options) => {
    //     const existingEnrollment = await Enrollments.findOne({
    //         where: {
    //             student_id: enroll.student_id,
    //             course_id: enroll.course_id
    //         }
    //     });

    //     if (existingEnrollment) {
    //         throw new Error('An enrollment with the same student id and course id already exists.');
    //     }
    // });

    return Message;

};
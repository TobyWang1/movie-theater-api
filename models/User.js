// import our db, Model, DataTypes
const { db, DataTypes, Model } = require('../db/connection')

// Creating a User child class from the Model parent class
class User extends Model {}

User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    sequelize: db,
    modelName: 'users'
  }
)

// exports
module.exports = User

// import our db, Model, DataTypes
const { db, DataTypes, Model } = require('../db/connection')

// Creating a User child class from the Model parent class
class Show extends Model {}

Show.init(
  {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN
  },
  {
    sequelize: db,
    modelName: 'Show'
  }
)

// exports
module.exports = Show

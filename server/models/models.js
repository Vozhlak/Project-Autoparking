const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('User', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Parking = sequelize.define('Parking', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  nameParking: {type: DataTypes.STRING, unique: true},
  isUsed: {type: DataTypes.BOOLEAN, defaultValue: false},
  cost: {type: DataTypes.DECIMAL},
});

const ParkingFloor = sequelize.define('ParkingFloor', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  nameParkingFloor: {type: DataTypes.STRING}
})

const ParkingReservations = sequelize.define('ParkingReservations', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  dateAndTimeOfArrival: {type: DataTypes.DATE},
  dateAndTimeOfDeparture: {type: DataTypes.DATE},
  numberAuto: {type: DataTypes.STRING, unique: true},
  theCostOfParking: {type: DataTypes.DECIMAL}
})

const StoryParkingReservation = sequelize.define('StoryParkingReservation', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, allowNull: false},
  parking: {type: DataTypes.STRING, allowNull: false},
  dateAndTimeOfArrival: {type: DataTypes.DATE, allowNull: false},
  dateAndTimeOfDeparture: {type: DataTypes.DATE, allowNull: false},
  numberAuto: {type: DataTypes.STRING, allowNull: false},
  theCostOfParking: {type: DataTypes.DECIMAL, allowNull: false},
});

ParkingFloor.hasMany(Parking);
Parking.belongsTo(ParkingFloor);

User.hasMany(ParkingReservations);
ParkingReservations.belongsTo(User);

Parking.hasMany(ParkingReservations);
ParkingReservations.belongsTo(Parking);

module.exports = {
  User,
  Parking,
  ParkingFloor,
  ParkingReservations,
  StoryParkingReservation
};
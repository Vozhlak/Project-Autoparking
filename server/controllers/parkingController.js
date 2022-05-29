const { Parking, ParkingFloor, ParkingReservations, StoryParkingReservation, User } = require("../models/models");

class parkingController {

  async createParking (req, res) {
    const {nameParking, ParkingFloorId, cost} = req.body;
    const isUsedName = await Parking.findOne({where: {nameParking}});
    if(isUsedName) {
      return res.status(400).json({message: 'Это наименование уже используется'});
    }
    const parking = await Parking.create({nameParking, ParkingFloorId, cost});
    return res.status(200).json({
      parking
    })
  }

  async createParkingFloor (req, res) {
    const {nameParkingFloor} = req.body;
    try {
      const isUsedName = await ParkingFloor.findOne({where: {nameParkingFloor}});
      if(isUsedName) {
        return res.status(400).json({message: 'Это наименование уже используется'});
      }
      const parkingFloor = await ParkingFloor.create({nameParkingFloor});
      return res.status(200).json({
        parkingFloor
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  async getParking (req, res) {
    const arrayId = [1, 2];
    try {
      const parkingA = await Parking.findAll({attributes: ['id', 'nameParking', 'isUsed', 'cost'], where: {ParkingFloorId: arrayId[0]}, order: [['id', 'ASC']]});
      const parkingB = await Parking.findAll({attributes: ['id', 'nameParking', 'isUsed', 'cost'], where: {ParkingFloorId: arrayId[1]}, order: [['id', 'ASC']]});
      return res.json({
        parkingA,
        parkingB
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  async getAuthParking (req, res) {
    const {id} = req.params;
    const arrayId = [1, 2];
    try {
      const user = await User.findOne({where: {id}})
      if(!user) {
        return res.status(404).json({message: "Пользователь не найден"});
      }

      const parking = await Parking.findAll({attributes: ['id', 'nameParking', 'isUsed', 'cost', 'ParkingFloorId'],
      where: {ParkingFloorId: arrayId[0]}, order: [['id', 'ASC']],
      include: {model: ParkingReservations, attributes: ['id', 'dateAndTimeOfArrival', 'dateAndTimeOfDeparture','theCostOfParking', 'UserId']}})
      .then(parking => {
        return parking
      })

      const parking2 = await Parking.findAll({attributes: ['id', 'nameParking', 'isUsed', 'cost', 'ParkingFloorId'],
      where: {ParkingFloorId: arrayId[1]}, order: [['id', 'ASC']],
      include: {model: ParkingReservations, attributes: ['id', 'dateAndTimeOfArrival', 'dateAndTimeOfDeparture','theCostOfParking', 'UserId']}})
      .then(parking => {
        return parking
      })
      .catch(e => console.log(e));

      return res.json({parking, parking2});
    }
    catch(e) {
      console.log(e);
    }
  }

  async setIsUsedCurrentParking (req, res) {
    const {id} = req.params;
    const parking = await Parking.findOne({where: {id}});
    if(!parking) {
      return res.status(404).json({message: "Увы, данные отсутствуют."});
    }
    if(parking.isUsed) {
      await Parking.update({isUsed: false},{where: {id}})
    } else {
      await Parking.update({isUsed: true},{where: {id}})
    }
    const getDataParking = await Parking.findOne({where: {id}});
    return res.json({
      getDataParking
    })
  }

  async createParkingReservations (req, res) {
    const {userId, parkingId, timeArrival, timeDeparture, numberAuto, theCostOfParking} = req.body;
    try {
      const user = await User.findOne({where: {id: userId}})
      if(!user) {
        return res.status(404).json({message: "Пользователь не найден"});
      }

      const parking = await Parking.findOne({where: {id: parkingId}})
      if(parking.isUsed) {
        return res.status(400).json({message: "Этот паркинг уже занят"});
      }

      await StoryParkingReservation.create({
        userId: user.id,
        parkingId: parkingId,
        dateAndTimeOfArrival: timeArrival,
        dateAndTimeOfDeparture: timeDeparture,
        numberAuto,
        theCostOfParking
      })

      const parkingReservations = await ParkingReservations.create(
        {
          UserId: user.id,
          ParkingId: parkingId,
          dateAndTimeOfArrival: timeArrival,
          dateAndTimeOfDeparture: timeDeparture,
          numberAuto,
          theCostOfParking
        })
      return res.json({
        parkingReservations
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  async getStoryParking(req, res) {
    const {userId} = req.body;
    try {
      const user = await User.findOne({where: {id: userId}})
      if(!user) {
        return res.status(404).json({message: "Пользователь не найден"});
      }

      const storyParkingReservations = await StoryParkingReservation.findAll({where: {userId: user.id}});

      const parking = await Parking.findOne({Where: {id: storyParkingReservations.parkingId}});
      return res.json({user, storyParkingReservations});
    } catch(e) {
      console.log(e);
    }

  }
}

module.exports = new parkingController();
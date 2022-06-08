const { Parking, ParkingFloor, ParkingReservations, StoryParkingReservation, User, PaymentConfirmation } = require("../models/models");
const mailService = require('../service/mail-service');
const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');
const { v4: uuidv4, v4 } = require('uuid');

const qiwiApi = new QiwiBillPaymentsAPI(process.env.QIWI_SECRET_KEY);

const formatedTime = (time) => {
  const newDate = new Date(time);
  const currentTime = newDate.toString();
  const newTime = currentTime.substring(16, 21);
  return newTime;
}

const formatedDate = (date) => {
  const newDate = new Date(date);
  const Newtime = formatedTime(date);

  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабрь'];
  const dateMonth = newDate.getDate();
  const month = months[newDate.getMonth()];
  const year = newDate.getFullYear();
  const formatedDate = dateMonth + ' ' + month + ' ' + year;
  console.log(formatedDate)
  return formatedDate;
}

const sendEmailCheckPay = async(userId, parkingId, timeArrival, timeDeparture, numberAuto, theCostOfParking, numberOrder) => {
  try {
    const UserId = userId;
    const ParkingId = parkingId;
    const TimeArrival = timeArrival;
    const TimeDeparture = timeDeparture;
    const NumberAuto = numberAuto;
    const TheCostOfParking = theCostOfParking;
    const NumberOrder = numberOrder;
    const user = await User.findOne({where: {id: UserId}})
    if(!user) {
      return res.status(404).json({message: "Пользователь не найден"});
    }

    const parking = await Parking.findOne({where: {id: ParkingId}, include: {model: ParkingFloor, attributes: ['nameParkingFloor']}});

    const infoParking = ` на ${parking.ParkingFloorId} этаже  № ${parking.nameParking}`;

    const timeArr = formatedTime(TimeArrival);
    const timeDep = formatedTime(TimeDeparture);
    const formatedDateArrival = formatedDate(TimeArrival);
    const formatedDateDeparture = formatedDate(TimeDeparture);
    console.log("timeArr: ", timeArr);
    console.log("timeDep: ", timeDep);

    const dataPay = {
      infoParking,
      formatedDateArrival,
      formatedDateDeparture,
      timeArr,
      timeDep,
      NumberAuto,
      TheCostOfParking,
      NumberOrder
    }

    mailService.sendCheckPayEmail(user.email, dataPay);
  }
  catch(e) {
    console.log(e);
  }
}
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
      include: {model: ParkingReservations, attributes: ['id', 'dateAndTimeOfArrival', 'dateAndTimeOfDeparture','theCostOfParking', 'UserId', 'ParkingId']}})
      .then(parking => {
        return parking
      })

      const parking2 = await Parking.findAll({attributes: ['id', 'nameParking', 'isUsed', 'cost', 'ParkingFloorId'],
      where: {ParkingFloorId: arrayId[1]}, order: [['id', 'ASC']],
      include: {model: ParkingReservations, attributes: ['id', 'dateAndTimeOfArrival', 'dateAndTimeOfDeparture','theCostOfParking', 'UserId', 'ParkingId']}})
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

  async сancellationOfTheReservation (req, res) {
    const {idParkingReservations} = req.params;

    const parkingReservations = await ParkingReservations.findOne({where: {id: idParkingReservations}});
    if(!parkingReservations) {
      return res.status(404).json({message: "данные отсутствуют"});
    }

    await ParkingReservations.destroy({where: {ParkingId: parkingReservations.ParkingId}});

    const parking = await Parking.findOne({where: {id: parkingReservations.ParkingId}});
    if(!parking) {
      return res.status(404).json({message: "Увы, данные отсутствуют."});
    }

    if(parking.isUsed) {
      await Parking.update({isUsed: false},{where: {id: parking.id}})
    }

    const getDataParking = await Parking.findOne({where: {id: parking.id}});
    return res.json({
      getDataParking
    })
  }

  async createParkingReservations (req, res) {
    const {userId, parkingId, timeArrival, timeDeparture, numberAuto, theCostOfParking, numberOrder} = req.body;
    try {
      const UserId = userId;
      const ParkingId = parkingId;
      const TimeArrival = timeArrival;
      const TimeDeparture = timeDeparture;
      const NumberAuto = numberAuto;
      const TheCostOfParking = theCostOfParking;
      const NumberOrder = numberOrder;
      const user = await User.findOne({where: {id: userId}})
      if(!user) {
        return res.status(404).json({message: "Пользователь не найден"});
      }

      const parking = await Parking.findOne({where: {id: parkingId}, include: {model: ParkingFloor, attributes: ['nameParkingFloor']}});

      const infoParking = `${parking.ParkingFloorId} Этаж ${parking.nameParking}`;

      await StoryParkingReservation.create({
        email: user.email,
        parking: infoParking,
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
      
      if(UserId && ParkingId && TimeArrival && TimeDeparture && NumberAuto && TheCostOfParking && NumberOrder) {
        sendEmailCheckPay(UserId, ParkingId, TimeArrival, TimeDeparture, NumberAuto, TheCostOfParking, NumberOrder);
      } else {
        console.log("data not found!");
      }

      return res.json({
        parkingReservations
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  async getStoryParking(req, res) {
    const {id} = req.params;
    try {
      const user = await User.findOne({where: {id}})
      if(!user) {
        return res.status(404).json({message: "Пользователь не найден"});
      }

      const storyParkingReservations = await StoryParkingReservation.findAll({
        attributes: ['id', 'email', 'parking', 'dateAndTimeOfArrival', 'dateAndTimeOfDeparture', 'numberAuto', 'theCostOfParking'],
        where: {email: user.email}
      });

      return res.json({storyParkingReservations});
    } catch(e) {
      console.log(e);
    }
  }

  async CreateBillPay(req, res) {
    const billId = uuidv4();
    const fields = {
      amount: `1.00`,
      currency: 'RUB',
      comment: 'comment',
      successUrl: 'http://192.168.0.181:3000/paymentConfirmation'
      // successUrl: 'http://localhost:3000/'
  };
    qiwiApi.createBill( billId, fields )
    .then(dataPay => {
      return res.json({ dataPay });
    })
    .catch(error => {
      console.log(error);
    })
  }

  async getStatusPay(req, res) {
    const {billid} = req.params;
    const billId = billid;
    qiwiApi.getBillInfo( billId )
    .then(data => {
      return res.json({ data });
    })
    .catch(error => {
      console.log(error);
    })
  }

  async rejectPay(req, res) {
    const {billId} = req.params;
    const billid = billId;
    qiwiApi.cancelBill( billid )
    .then(data => {
      return res.json({ data });
    })
    .catch(error => {
      return console.log(error);
    })
  }

  async setDataPayQiwi(req, res) {
    const {dataPayQiwi} = req.body;
    console.log(dataPayQiwi);
    try {
      if(!dataPayQiwi) {
        return res.status(404).json({message: "Ошибка данных нет"});
      }

      const numberOrder = Math.floor(100000 + Math.random() * 900000);
      const paydata = await PaymentConfirmation.create({
        billIdQiwi: dataPayQiwi.payDataClient.billid.billId,
        numberOrder,
        parkingId: dataPayQiwi.payDataClient.dataPay.ParkingId,
        userId: dataPayQiwi.payDataClient.dataPay.userId,
        dateAndTimeOfArrival: dataPayQiwi.payDataClient.dataPay.fullDateTimeArrival,
        dateAndTimeOfDeparture: dataPayQiwi.payDataClient.dataPay.fullDateTimeDeparture,
        numberAuto: dataPayQiwi.payDataClient.dataPay.numberAuto,
        theCostOfParking: dataPayQiwi.payDataClient.dataPay.theCostOfParking
      })

      return res.status(200).json({paydata});
    } catch(e) {
      console.log(e);
    }
  }

  async getDataPayQiwi(req, res) {
    const {billid} = req.params;
    try {
      const dataPay = await PaymentConfirmation.findOne({where: {billIdQiwi: billid}})
      if(!dataPay) {
        return res.status(404).json({message: 'Данные отсутствуют'});
      }
      
      return res.json({dataPay});
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = new parkingController();
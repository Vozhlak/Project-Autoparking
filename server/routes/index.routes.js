const Router = require('express').Router;
const { check } = require('express-validator');
const router = new Router();
const userController = require('../controllers/userController');
const parkingController = require('../controllers/parkingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/user/registration', userController.registration);
router.post('/user/login',
  [
    check('email', 'Введён не корректный Email').isEmail(),
    check('password', 'Пароль должен содержать не меньше 8 символов').isLength({min: 8}),
    check('password', 'Пароль должен содержать не больше 14 символов').isLength({max: 14})
  ], userController.login);
router.post('/user/sendEmailActivation',
  [
    check('email', 'Введён не корректный Email').isEmail(),
  ], userController.activationUser);
router.get('/user/auth', authMiddleware, userController.check);
router.post('/parking/create', parkingController.createParking);
router.get('/parking/get', parkingController.getParking);
router.get('/parking/getUserParking/:id', authMiddleware, parkingController.getAuthParking);
router.post('/parking/update/:id', parkingController.setIsUsedCurrentParking);
router.post('/parking/createFloor', parkingController.createParkingFloor);
router.post('/parking/createParkingReservations', authMiddleware, parkingController.createParkingReservations);
router.get('/parking/getStoryParking/:id', authMiddleware, parkingController.getStoryParking);
router.delete('/parking/cancelReservations/:idParkingReservations', parkingController.сancellationOfTheReservation);
router.get('/oplata.qiwi.com/create', parkingController.CreateBillPay);
router.get('/api.qiwi.com/partner/bill/v1/bills/:billid', parkingController.getStatusPay);
router.post('/api.qiwi.com/partner/bill/v1/bills/:billId/reject', parkingController.rejectPay);
router.post('/setDataPayQiwi', parkingController.setDataPayQiwi);
router.get('/getDataPayQiwi/:billid', parkingController.getDataPayQiwi);

module.exports = router;
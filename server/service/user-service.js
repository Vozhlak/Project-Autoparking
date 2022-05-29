// require('dotenv').config();
// const ApiError = require('../error/ApiError');
// const {User} = require('../models/models');
// const bcrypt = require('bcrypt');
// const tokenService = require('./token-service');
// const mailService = require('./mail-service');
// const uuid = require('uuid');
// const path = require('path');
// const mailer = require("nodemailer");
// const { validationResult } = require('express-validator');
// const authMiddleware = require('../middleware/authMiddleware');

// class userService {
//   async registration(email, password) {
//     // const {image} = req.files;

//     //The Work of files img
//     // let fileName = uuid.v4() + ".jpg";
//     // image.mv(path.resolve(__dirname, '..', 'static', fileName));

//     const candidate = await User.findOne({where: {email}});
//     if(candidate) {
//       return res.status(400).json({message: 'Пользователь с таким Email уже существует'});
//     }

//     const hashPassword = await bcrypt.hash(password, 5);
//     const user = await User.create({email, password: hashPassword}) //, image: fileName}); //Create user in BD PostgresSQL
//     // const token = jwtGenerate(user.id, user.email);
    
//     return {message: "THis registr"}
//   }

//   async login(email, password) {
//     try {
//       const errors = validationResult(req);
//       const {email, password} = req.body;

//       if(!errors.isEmpty()) {
//         return res.status(400).json({message: "Введены не корректные данные", errors});
//       }

//       const user = await User.findOne({where: {email}});
//       if(!user) {
//         return res.status(404).json({message: 'Пользователь не найден'});
//       }

//       let comparePassword = bcrypt.compareSync(password, user.password);
//       if(!comparePassword) {
//         return res.status(404).json({message: 'Указан неверный пароль'});
//       }

//       const token = jwtGenerate(user.id, user.email, user.role);
//       return res.json({user, token: token});
//     } catch(e) {

//     }
//   }

//   async sendActivationEmail(email) {
//     try {
      
//     } catch(e) {

//     }
//   }
// }

// module.exports = new userService();
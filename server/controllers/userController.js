require('dotenv').config();
const ApiError = require('../error/ApiError');
const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenService = require('../service/token-service');
const mailService = require('../service/mail-service');
const uuid = require('uuid');
const path = require('path');
const mailer = require("nodemailer");
const { validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

const generateJwt = (id, email, role) => {
  return jwt.sign({id, email, role}, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
};

const codeGenerate = () => {
  return generateCode = (`${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`);
}

const codeList = [];

class userController {
  //Test start
  async getGenerateCode(req, res, next) {
    const New_code = codeGenerate();
    codeList.push(New_code);
    return res.json({codeList});
  }

  async postGenerateCode(req, res, next) {
    const {code} = req.body;
    if(!code) {
      return res.json({message: 'Поле кода пустое'});
    }
    const ls = codeList;

    return res.json({code, ListCode: [ls]});
  }
  //Test end

  async registration(req, res, next) {
    try {
      const {email, password} = req.body;
      const hashPAssword = await bcrypt.hash(password, 5);
      const user = await User.create({email, password: hashPAssword})
      codeList.length = 0;
      return res.json({message: "Пользователь успешно зарегистрирован", user});
    } catch(e) {
      return res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({where: {email}});
      if(!user) {
        return res.status(400).json({message: 'Пользователя с таким email не существует', type: 'customEmail'});
      }
      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
          return res.status(400).json({message: "Неверный пароль", type: 'customPassword'});
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email
        }
      });
    } catch(e) {
      console.log(e);
      return res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
  }

  async check(req, res, next) {
    const user = await User.findOne({where: {id: req.user.id}});
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    })
  }

  async activationUser(req, res) {
    try {
      const errors = validationResult(req);

      if(!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const {email} = req.body;
      const candidate = await User.findOne({where: {email}});
      if(candidate) {
        return res.status(400).json({message: `Пользователь с таким Email уже существует`, type: 'custom'});
      }
      const codeGen = codeGenerate();
      codeList.push(codeGen);
      mailService.sendActivationEmail(email, codeGen);
      console.log("CodeList => ", codeList);
      return res.status(200).json({codeList});
    } catch(e) {
      return res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
  }
}

module.exports = new userController();
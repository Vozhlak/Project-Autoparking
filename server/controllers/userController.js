require('dotenv').config();
const ApiError = require('../error/ApiError');
const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const path = require('path');

const jwtGenerate = (id, email, role) => {
  return jwt.sign({id, email, role}, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
};

class userController {
  async registration(req, res, next) {
    try {
      const {email, password, role} = req.body;
      // const {image} = req.files;

      //The Work of files img
      // let fileName = uuid.v4() + ".jpg";
      // image.mv(path.resolve(__dirname, '..', 'static', fileName));

      if(!email || !password) {
        return next(ApiError.badRequest('Некоректный Email или Password'));
      }

      const candidate = await User.findOne({where: {email}});
      if(candidate) {
        return next(ApiError.badRequest('Пользователь с таким Email уже существует'));
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({email, password: hashPassword}) //, image: fileName}); //Create user in BD PostgresSQL
      const token = jwtGenerate(user.id, user.email, user.role);
      
      return res.json({user, token: token});
    } catch(e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if(!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if(!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }

    const token = jwtGenerate(user.id, user.email, user.role);
    return res.json({user, token: token});
  }

  async check(req, res, next) {
    const token = jwtGenerate(req.user.id, req.user.email, req.user.role);
    return res.json({token});
  }
}

module.exports = new userController();
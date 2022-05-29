const jwt = require('jsonwebtoken');

class tokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'});
    return {
      accessToken
    }
  };
}

module.exports = new tokenService();
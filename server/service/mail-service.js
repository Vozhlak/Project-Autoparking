const nodemailer = require('nodemailer');

class mailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "shun_2013@mail.ru",
        pass: "AhRxwgSdEp1d1eKe6ek8"
      }
    });
  }

  async sendActivationEmail(to, code) {
    await this.transporter.sendMail({
      from: 'shun_2013@mail.ru',
      to,
      subject: 'Активация аккаунта на Auto Parking Online',
      text: '',
      html:
        `<div>
          <h1>Для активации скопируйте или введите код в поле ввода на странице</h1>
          <div><span style='font-size: 26px'>${code}</span></div>
        </div>`
    })
  }

  async sendRestoreAccessEmail(to) {
    await this.transporter.sendMail({
      from: 'shun_2013@mail.ru',
      to,
      subject: 'Восстановление доступа к аккаунту на Auto Parking Online',
      text: '',
      html:
        `<div>
          <h1>Для восстановления доступа к аккаунту скопируйте или введите код в поле ввода на странице</h1>
          <div><span style='font-size: 26px'>124356</span></div>
        </div>`
    })
  }
}

module.exports = new mailService();
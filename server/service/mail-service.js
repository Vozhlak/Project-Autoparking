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

  async sendRestoreAccessEmail(to, code) {
    await this.transporter.sendMail({
      from: 'Autoparking Online',
      to,
      subject: 'Восстановление доступа к аккаунту на Auto Parking Online',
      text: '',
      html:
        `<div>
          <h1>Для восстановления доступа к аккаунту скопируйте или введите код в поле ввода на странице</h1>
          <div><span style='font-size: 26px'>${code}</span></div>
        </div>`
    })
  }

  async sendCheckPayEmail(to, numberOrder) {
    await this.transporter.sendMail({
      from: 'shun_2013@mail.ru',
      to,
      subject: `Оплата заказа № ${numberOrder}`,
      text: '',
      html:
        `<div>
          <div>Уважаемый пользователь ${to}, вы забронировали в парковочном центре!</div>
          
        </div>`
    })
  }
}

module.exports = new mailService();
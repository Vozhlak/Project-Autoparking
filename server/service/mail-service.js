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
      from: 'shun_2013@mail.ru',
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

  async sendCheckPayEmail(to, dataPay) {
    await this.transporter.sendMail({
      from: 'shun_2013@mail.ru',
      to,
      subject: `Оплата заказа № ${dataPay.NumberOrder}`,
      text: '',
      html:
        `<div>
          <h1>Бронирование парковочного места в системе "Автопаркинг"\n Номер брони ${dataPay.NumberOrder}</h1>
          <p>Вы забронировали в системе "Автопаркинг" парковочное место ${dataPay.infoParking}</p>
          <p>Дата прибытия: ${dataPay.formatedDateArrival} время: ${dataPay.timeArr}</p>
          <p>Дата отъезда: ${dataPay.formatedDateDeparture} время: ${dataPay.timeDep}</p>
          <p>Номер автомобиля: ${dataPay.NumberAuto}</p>
          <p>Стоимость услуг составила: ${dataPay.TheCostOfParking}</p>
        </div>
        `
    })
  }
}

module.exports = new mailService();
const nodemailer = require('nodemailer');
const path = require('path');
const pug = require('pug');
const { convert } = require('html-to-text');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.from = `App admin <${process.env.META_USERNAME}>`;
  }

  _initTransport() {
    if (process.env.NODE_ENV === 'development') {
      // use MailTrap for testing purposes
      return nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        }
      })
    }

    // use mete for real emails
    return nodemailer.createTransport({
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: process.env.META_USERNAME,
        pass: process.env.META_PASSWORD,
      }
    })
  }

  async _send(template, subject) {
    const html = pug.renderFile(
      path.join(__dirname, '..', 'views', 'emails', `${template}.pug`),
      { name: this.to, url: this.url, subject }
    );

    const emailConfig = {
      from: `V&S admin <${process.env.META_USERNAME}>`,
      to: this.to,
      subject,
      html,
      text: convert(html),
    }

    await this._initTransport().sendMail(emailConfig);
  }

  async sendVerify() {
    await this._send('verify', 'Please Verify email...');
  }
}

module.exports = Email;
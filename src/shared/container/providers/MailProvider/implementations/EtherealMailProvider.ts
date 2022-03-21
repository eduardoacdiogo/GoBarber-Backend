import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../MailTemlateProvider/models/IMailTemplateProvider';
import ISendMailDto from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

injectable();
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDto): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com',
      }, // sender address
      to: {
        name: to.name,
        address: to.email,
      }, // list of receivers ex: 'bar@example.com, baz@example.com'
      subject, // Subject line
      html: await this.mailTemplateProvider.parse(templateData), // plain text body ex: 'Hello world?'
      // html: '<b>Hello world?</b>', // html body})
    });

    console.log('Message sent: %s', message.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}

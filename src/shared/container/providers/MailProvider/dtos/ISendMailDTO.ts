import IParseMailTemplateDTO from '@shared/container/providers/MailTemlateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDto {
  to: IMailContact;
  from?: IMailContact;
  subject?: string;
  templateData: IParseMailTemplateDTO;
}

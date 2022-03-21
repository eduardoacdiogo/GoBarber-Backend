import IParseMailTemplateDTO from '@shared/container/providers/MailTemlateProvider/dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakeUsersRepository, fakeUserTokensRepository, fakeMailProvider);
  })

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      email: 'john.doe@test.com.br',
      name: 'John Doe',
      password: 'test123'
    });

    await sendForgotPasswordEmailService.execute({email: 'john.doe@test.com.br'});

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({email: 'john.doe@test.com.br'})
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      email: 'john.doe@test.com.br',
      name: 'John Doe',
      password: 'test123'
    });

    await sendForgotPasswordEmailService.execute({email: 'john.doe@test.com.br'});

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});


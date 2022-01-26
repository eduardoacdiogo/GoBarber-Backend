import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const user = await createUser.execute({
      email: 'john.doe@test.com.br',
      name: 'John Doe',
      password: 'test123'
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    await createUser.execute({
      email: 'john.doe@test.com.br',
      name: 'John Doe',
      password: 'test123'
    });
    expect(
      createUser.execute({
        email: 'john.doe@test.com.br',
        name: 'John Doe',
        password: 'test123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

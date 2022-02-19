import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const user = await createUser.execute({
      email: 'john.doe@test.com.br',
      name: 'John Doe',
      password: 'test123'
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    await createUser.execute({
      email: 'john.doe@test.com.br',
      name: 'John Doe',
      password: 'test123'
    });

    await expect(
      createUser.execute({
        email: 'john.doe@test.com.br',
        name: 'John Doe',
        password: 'test123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

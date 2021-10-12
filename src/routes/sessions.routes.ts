import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

// Rota: receber a requisição, chamar outro arquivo e devolver a resposta

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticate = new AuthenticateUserService();

  const { user, token } = await authenticate.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;

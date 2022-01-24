import { Router } from 'express';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRouter = Router().use(ensureAuthenticate);
const appointmentsController = new AppointmentsController();

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;

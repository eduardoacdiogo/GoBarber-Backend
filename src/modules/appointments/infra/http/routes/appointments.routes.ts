import { Router } from 'express';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProvidersAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentRouter = Router().use(ensureAuthenticate);
const appointmentsController = new AppointmentsController();
const providersAppointmentsController = new ProvidersAppointmentsController();

appointmentRouter.post('/', appointmentsController.create);
appointmentRouter.get('/me', providersAppointmentsController.index);

export default appointmentRouter;

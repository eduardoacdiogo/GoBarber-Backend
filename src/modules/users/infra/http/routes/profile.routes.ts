import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';
import UserAvatarController from '../controllers/UserAvatarController';

const profileRouter = Router();
const profileController = new ProfileController();
const userAvatarController = new UserAvatarController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', userAvatarController.update);

export default profileRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var upload_1 = __importDefault(require("@config/upload"));
var UsersController_1 = __importDefault(require("../controllers/UsersController"));
var UserAvatarController_1 = __importDefault(require("../controllers/UserAvatarController"));
var usersRouter = express_1.Router();
var usersControllers = new UsersController_1.default();
var userAvatarController = new UserAvatarController_1.default();
var upload = multer_1.default(upload_1.default);
usersRouter.post('/', usersControllers.create);
usersRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), userAvatarController.update);
exports.default = usersRouter;

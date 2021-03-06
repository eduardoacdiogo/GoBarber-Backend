"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var AppointmentsController_1 = __importDefault(require("../controllers/AppointmentsController"));
var appointmentRouter = express_1.Router().use(ensureAuthenticated_1.default);
var appointmentsController = new AppointmentsController_1.default();
appointmentRouter.post('/', appointmentsController.create);
exports.default = appointmentRouter;

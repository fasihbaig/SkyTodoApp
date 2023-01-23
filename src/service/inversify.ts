import { Container } from "inversify";
import { Logger, WinstonLoggerService } from "../utils";
import { AuthenticationService } from "./authentication/authentication-service";
import { TYPES } from "./inversify.types";
import { UserService } from "./user";

const ServiceContainer = new Container();

ServiceContainer.bind<UserService>(TYPES.UserService).to(UserService);
ServiceContainer.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationService);
ServiceContainer.bind(TYPES.Logger).to(WinstonLoggerService).whenTargetNamed("winston");
// ServiceContainer.bind<WinstonLoggerService>(TYPES.AuthenticationService).toConstantValue((context) => {
//     context.container.get()
// })



export { ServiceContainer }
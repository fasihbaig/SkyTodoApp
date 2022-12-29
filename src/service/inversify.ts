import { Container } from "inversify";
import { AuthenticationService } from "./authentication/authentication-service";
import { TYPES } from "./inversify.types";
import { UserService } from "./user";

const ServiceContainer = new Container();

ServiceContainer.bind<UserService>(TYPES.UserService).to(UserService);
ServiceContainer.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationService);

export { ServiceContainer }
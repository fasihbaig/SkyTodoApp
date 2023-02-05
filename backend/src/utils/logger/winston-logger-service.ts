import { injectable } from "inversify";
import winston, {Logger as IWinstonLogger, createLogger} from  "winston";
import { Logger } from "./Logger";

export const logger = () => { } 

@injectable()
export class WinstonLoggerService extends Logger<IWinstonLogger> {
    
    private static instance: WinstonLoggerService;

    constructor() {
        super();
        this.initialize()
    }

    public initialize(): IWinstonLogger {
       const logger = createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
              new winston.transports.File({ filename: 'error.log', level: 'error' }),
              new winston.transports.File({ filename: 'combined.log' }),
            ],
          });
          
          if (process.env.NODE_ENV !== 'production') {
              logger.add(new winston.transports.Console({
                format: winston.format.simple(),
              }));
        }
        return logger;
    }

    public getLogger(): Logger<IWinstonLogger> {
        if(WinstonLoggerService.instance) {
            return WinstonLoggerService.instance;
        }

        WinstonLoggerService.instance = new WinstonLoggerService();

        return WinstonLoggerService.instance;
    }

        
    public info(message: string, data: { [index: string]: any; }): void {
        WinstonLoggerService.instance.info(message, data);
    }
    public error(message: string, data: { [index: string]: any; }): void {
        WinstonLoggerService.instance.error(message, data);
    }
    
}
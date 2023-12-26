import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class ApiExceptionHandler implements ExceptionFilter {

  private readonly logger = new Logger("exceptions");

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if(exception.name === "BadRequestException") {
      response.status(exception.response.statusCode).send(exception.response.message);
      this.logger.error(`${new Date()}: ${exception.response.message}`);
      return;
    }

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    this.logger.error(`${new Date()}: ${exception.message}`);

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

class Main {
  public async bootstrap() {
      const app: INestApplication = await NestFactory.create(AppModule, {
          logger: ['error', 'warn', 'log', 'debug'],         
          cors: true,
      });

      const configService = app.get(ConfigService);
      const showSwagger = configService.get('SHOW_SWAGGER');
      if (showSwagger === 'TRUE') await this.configureSwagger(app);
      app.useGlobalPipes(
          new ValidationPipe({
              disableErrorMessages: false,
              transform: true,
              whitelist: true,
              dismissDefaultMessages: false,
          }),
      );

      await app.listen(configService.get('PORT'));
  }

  private async configureSwagger(app: INestApplication) {
      const options = new DocumentBuilder()
          .setTitle('mastermind')
          .setDescription('mastermind-api')
          .addBearerAuth()
          .setVersion('1.0')
          .build();

      const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

      SwaggerModule.setup('api', app, document);
  }
}

new Main().bootstrap();
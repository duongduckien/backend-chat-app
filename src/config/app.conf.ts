import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

export class ApplicationConfig {
  public static init(application: express.Application): void {
    application.use(bodyParser.urlencoded({ extended: true }));
    application.use(bodyParser.json());
    application.use(helmet());
    application.use(compression());
    application.use(cors());
  }
}

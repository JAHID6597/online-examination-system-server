import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';

export class DataBaseService {
  constructor(private readonly configService: ConfigService) {}

  public checkDatabaseConnection(): boolean {
    const logger = new Logger();

    try {
      TypeOrmModule.forRoot(typeOrmConfig);

      const dbType = 'mysql';
      const host = this.configService.get<string>('DB_HOST');
      const port = this.configService.get<number>('DB_PORT');
      logger.log(
        `[DataBaseConfig] ${dbType} database connected successfully on host = ${host} and port = ${port}.`,
      );
      return true;
    } catch (error) {
      logger.error(
        '[DataBaseConfig] Failed to connect to the database: ',
        error,
      );
      return false;
    }
  }
}

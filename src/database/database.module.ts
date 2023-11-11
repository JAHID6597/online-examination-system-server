import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { DataBaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const dbConfig = new DataBaseService(configService);
        const connected = dbConfig.checkDatabaseConnection();

        return connected ? typeOrmConfig : null;
      },
    }),
  ],
})
export class DataBaseModule {}

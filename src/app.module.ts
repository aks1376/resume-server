import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { MessagesModule } from './modules/messages/messages.module';
import { AboutMeModule } from './modules/about-me/about-me.module';
import { HomeModule } from './modules/home/home.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, authConfig, databaseConfig],
      isGlobal: true
    }),
    AuthModule,
    UsersModule,
    SkillsModule,
    ProjectsModule,
    MessagesModule,
    AboutMeModule,
    HomeModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI')
      }),
      inject: [ConfigService]
    }),
    MulterModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    })
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }

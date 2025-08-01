import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MapController } from './@Controller/map.controller';
import { MapService } from './@Service/map.service';
import { FirebaseController } from './@Controller/firebase.controller';
import { FirebaseService } from './@Service/firebase.service';
import * as admin from 'firebase-admin';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../.env'),
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_CONNECTION'),
      }),
    }),
  ],
  controllers: [MapController, FirebaseController],
  providers: [
    MapService,
    FirebaseService,
    {
      provide: 'FIREBASE_BUCKET',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const credentials = JSON.parse(
          config.get<string>('FIREBASE_CREDENTIALS'),
        );

        const app = admin.initializeApp({
          credential: admin.credential.cert(credentials),
          storageBucket: 'gorsium-app.firebasestorage.app',
        });

        return admin.storage().bucket();
      },
    },
  ],
  exports: ['FIREBASE_BUCKET'],
})
export class AppModule {}

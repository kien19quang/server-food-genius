import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainModule } from './main/main.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

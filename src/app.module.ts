import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    UsersModule,
    CompaniesModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/mongotest'),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

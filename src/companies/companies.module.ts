import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Company.name,
        schema: CompanySchema,
      }
    ]),
    UsersModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [
    MongooseModule
  ]
})
export class CompaniesModule {}

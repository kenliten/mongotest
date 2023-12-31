import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './entities/company.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CompaniesService {

  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
    @InjectModel(User.name) private userModel: Model<User>,
    ) {
  }

  async create(createCompanyDto: any) {
    const company = new this.companyModel(createCompanyDto);
    await company.save();

    // Aqui me aseguro de que, si la empresa se crea con un propietario, se le asigne a ese usuario, si este existe
    if (createCompanyDto.owner) {
      const user = await this.userModel.findOne({ _id: createCompanyDto.owner });
      if (user) {
        user.companies.push(company);
        await user.save();
      }
    }

    return company;
  }

  findAll() {
    return this.companyModel.find();
  }

  findOne(id: string) {
    return this.companyModel.findOne({ _id: id }).populate('owner').exec();
  }

  async update(id: string, updateCompanyDto: any) {
    const company = await this.companyModel.findOne({ _id: id });
    const prevOwner = company.owner;

    const result = await this.companyModel.updateOne({ _id: id }, updateCompanyDto);

    // Si se cambio el propietario, se le borra al anterior la empresa y se le asigna al nuevo
    if (updateCompanyDto.owner && prevOwner != updateCompanyDto.owner) {
      // quito la empresa del usuario anterior
      const prevUser = await this.userModel.findOne({ _id: prevOwner });
      prevUser.companies = prevUser.companies.filter(comp => (comp as unknown as string) != id);
      await prevUser.save();
      // la agrego al nuevo
      const user = await this.userModel.findOne({ _id: updateCompanyDto.owner });
      if (user) {
        user.companies.push(company);
        await user.save();
      }
    }

    return result;
  }

  remove(id: string) {
    return this.companyModel.deleteOne({ _id: id });
  }
}

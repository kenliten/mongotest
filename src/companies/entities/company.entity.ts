import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
	@Prop()
	name: string;

	@Prop()
	address: string;

	@Prop()
	description: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	owner: User;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

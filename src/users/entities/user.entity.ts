import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Task } from '../../tasks/entities/task.entity';
import { Company } from '../../companies/entities/company.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }] })
  companies: Company[];
}

export const UserSchema = SchemaFactory.createForClass(User);

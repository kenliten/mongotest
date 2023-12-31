import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
	@Prop()
	name: string;

	@Prop()
	description: string;

	@Prop()
	completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

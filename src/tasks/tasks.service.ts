import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    ) {
  }

  create(createTaskDto: CreateTaskDto) {
    const task = new this.taskModel(createTaskDto);
    return task.save();
  }

  findAll() {
    return this.taskModel.find();
  }

  findOne(id: string) {
    return this.taskModel.findOne({ _id: id });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.updateOne({ _id: id }, updateTaskDto);
  }

  remove(id: string) {
    return this.taskModel.deleteOne({ _id: id });
  }
}

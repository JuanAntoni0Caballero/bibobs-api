import { Injectable } from '@nestjs/common';
import { TaskDTO } from './task.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TaskService {
  private tasks: TaskDTO[] = [];
  dbFilePath = path.join(__dirname, '..', '..', 'src', 'task', 'task.json');
  private currentId: number = 1;

  constructor() {
    this.loadTasksFromJson();
  }

  private loadTasksFromJson(): void {
    try {
      const data = fs.readFileSync(this.dbFilePath, 'utf-8');
      this.tasks = JSON.parse(data);
    } catch (error) {
      console.error('Error loading tasks from JSON:', error.message);
      this.tasks = [];
    }
  }

  private saveTasksToJson(): void {
    try {
      fs.writeFileSync(this.dbFilePath, JSON.stringify(this.tasks, null, 2));
    } catch (error) {
      console.error('Error saving tasks to JSON:', error.message);
    }
  }

  findAll(): TaskDTO[] {
    return this.tasks;
  }

  create(taskDTO: TaskDTO): TaskDTO {
    taskDTO.id = this.currentId++;
    this.tasks.push(taskDTO);
    this.saveTasksToJson();
    return taskDTO;
  }

  markAsCompleted(id: number): TaskDTO {
    const taskToUpdate = this.tasks.find((task) => (task.id = id));
    if (taskToUpdate) {
      taskToUpdate.completed = !taskToUpdate.completed;
      this.saveTasksToJson();
      return taskToUpdate;
    }
    return null;
  }
}

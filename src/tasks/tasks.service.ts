import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const { title, description, dueDate } = createTaskDto;

    return this.prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll(userId: string, status?: TaskStatus) {
    const where: any = { userId };

    if (status) {
      where.status = status;
    }

    return this.prisma.task.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return task;
  }

  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id, userId);

    const { title, description, dueDate, status } = updateTaskDto;

    const data: any = {};

    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (dueDate !== undefined)
      data.dueDate = dueDate ? new Date(dueDate) : null;
    if (status !== undefined) data.status = status;

    return this.prisma.task.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: 'Task deleted successfully' };
  }

  async getStatistics(userId: string) {
    const [total, completed, pending] = await Promise.all([
      this.prisma.task.count({ where: { userId } }),
      this.prisma.task.count({
        where: { userId, status: TaskStatus.COMPLETED },
      }),
      this.prisma.task.count({
        where: { userId, status: TaskStatus.PENDING },
      }),
    ]);

    return {
      total,
      completed,
      pending,
    };
  }
}

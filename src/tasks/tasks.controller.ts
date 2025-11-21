import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { CurrentUser } from '../auth/decorators/current-user.decorator';
  import { TaskStatus } from '@prisma/client';
  
  @Controller('tasks')
  @UseGuards(JwtAuthGuard)
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    create(@CurrentUser() user: any, @Body() createTaskDto: CreateTaskDto) {
      return this.tasksService.create(user.id, createTaskDto);
    }
  
    @Get()
    findAll(@CurrentUser() user: any, @Query('status') status?: TaskStatus) {
      return this.tasksService.findAll(user.id, status);
    }
  
    @Get('statistics')
    getStatistics(@CurrentUser() user: any) {
      return this.tasksService.getStatistics(user.id);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string, @CurrentUser() user: any) {
      return this.tasksService.findOne(id, user.id);
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @CurrentUser() user: any,
      @Body() updateTaskDto: UpdateTaskDto,
    ) {
      return this.tasksService.update(id, user.id, updateTaskDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string, @CurrentUser() user: any) {
      return this.tasksService.remove(id, user.id);
    }
  }
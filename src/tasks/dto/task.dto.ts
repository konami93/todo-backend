import {
    IsString,
    IsOptional,
    IsEnum,
    IsDateString,
    MinLength,
  } from 'class-validator';
  import { TaskStatus } from '@prisma/client';
  
  export class CreateTaskDto {
    @IsString()
    @MinLength(1)
    title: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsDateString()
    @IsOptional()
    dueDate?: string;
  }
  
  export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    @MinLength(1)
    title?: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsDateString()
    @IsOptional()
    dueDate?: string;
  
    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
  }